import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import GameForm from "./GameForm";

const Users = React.lazy(() => import("./Users"));

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_key: props.room_key,
            allUsers: [],
            started: false,
            finished: false,
            letters: ["الف","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ش","س","ص",
            "ض","ط","ظ","ع","غ","ف","ق","ل","م","ن","و","ه","ی",
            ],

            letter: "",
            answers: [],
            send : false,
        };
    }

    componentDidMount() {
        window.Echo.join(`room.${this.state.room_key}`)
            .here((users) => {
                this.setState({ allUsers: users });
            })
            .joining((user) =>
                this.setState((prevState) => ({
                    allUsers: [...prevState.allUsers, user],
                }))
            )
            .leaving((user) => {
                this.setState({
                    allUsers: this.state.allUsers.filter(
                        (u) => u.id !== user.id
                    ),
                });
            })
            .listen("FinishEvent", (e) => {
                if (e.event.event == "start") {
                    this.clearFormData();

                    axios
                        .post("/api/change_started", {
                            room_key: e.event.room_key,
                        })
                        .then((res) => {
                            this.setState({ started: true, finished: false });
                            axios
                                .post("/api/get_letter", {
                                    room_key: this.state.room_key,
                                })
                                .then((res) => {
                                    this.setState({ letter: res.data });
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else if (e.event.event == "all letters finished") {
                    Swal.fire({
                        title: "شما با تمام حروف بازی کرده اید !",
                        confirmButtonText: "باشه",
                    });
                } else if (e.event.event == "finish") {
                    //for when click on finish get all users form data and send thoes
                    this.setState({ finished: true, started: false , send : true});
                } else {
                    this.setState({
                        finished: true,
                        started: false,
                    });
                    this.setState((prevState) => ({
                        answers: [...prevState.answers, e.event.event],
                    }));
                }
            });

        let room_key = this.state.room_key;

        this.checkStarted(room_key);
        this.checkFinished(room_key);
        this.getLetter(room_key);
        this.removeLetters(room_key);
        this.getAnswers(room_key);
    }

    startGame = () => {
        if (this.state.letters.length < 1) {
            axios.post("/api/letters_finished", {
                room_key: this.state.room_key,
            });
        } else {
            this.clearFormData();
            axios
                .post("/api/start", {
                    room_key: this.state.room_key,
                    letters: this.state.letters,
                })
                .then((res) => {
                    let letter = res.data;

                    for (let i = 0; i < this.state.letters.length; i++) {
                        this.filterLetters(letter);
                    }
                    this.setState({ letter: letter });

                    axios.post("/api/change_letter", {
                        room_key: this.state.room_key,
                        letter: this.state.letter,
                    });
                });
        }
    };

    clearFormData = () => {
        let ALL_FORM_DATA = [
            "esm",
            "famil",
            "ghaza",
            "miveh",
            "mashin",
            "ashia",
        ];

        for (let i = 0; i < ALL_FORM_DATA.length; i++) {
            this.setState({ [ALL_FORM_DATA[i]]: "خالی" });
        }
    };

    playAgain = () => {
        this.startGame();
    };

    checkStarted = (room_key) => {
        //So that no problem when user refresh the page
        axios
            .post("/api/check_started", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ started: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    checkFinished = (room_key) => {
        //So that no problem when user refresh the page
        axios
            .post("/api/check_finished", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ finished: true, started: false });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getLetter = (room_key) => {
        // So that if the user refreshes the page, the word(letter) for the game will not be lost
        axios
            .post("/api/get_letter", {
                room_key: room_key,
            })
            .then((res) => {
                this.setState({ letter: res.data });
            });
    };

    filterLetters = (letter) => {
        this.setState({
            letters: this.state.letters.filter((item) => item !== letter),
        });
    };

    removeLetters = (room_key) => {
        //To prevent the random letter from repeating itself when updating the page in room
        axios.post("/api/check_letters", { room_key: room_key }).then((res) => {
            let games = res.data;
            for (let i = 0; i < games.length; i++) {
                this.filterLetters(games[i].letter);
            }
        });
    };

    getAnswers = (room_key) => {
        //for when page is refreshed get all answers
        axios
            .post("/api/get_answers", {
                room_key: room_key,
            })
            .then((res) => {
                let events = res.data;
                for (let i = 0; i < events.length; i++) {
                    if (events[i].event !== "start" && events[i].event !== "finish") {
                        this.setState((prevState) => ({
                            answers: [...prevState.answers, events[i].event],
                        }));
                    }
                }
            });
    };

    render() {
        let { started, room_key, finished, answers, allUsers, letter } = this.state;
        let { owner_id, user_id } = this.props;

        return (
            <main className="container p-5">
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary">
                                    کلید
                                </strong>
                                <h3 className="mb-0"></h3>
                                <p className="card-text mb-auto">
                                    کلید اتاق شما در زیر نوشته شده است
                                </p>
                                <br></br>
                                <button className="btn btn-info">
                                    کلید اتاق : {room_key}
                                </button>
                                <br></br>

                                {started ? (
                                    <></>
                                ) : finished ? (
                                    user_id == owner_id ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={this.playAgain}
                                        >
                                            دوباره بازی کن
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-dark"
                                        >
                                            صبر کنید تا سازنده اتاق دوباره بازی
                                            را شروع کند
                                        </button>
                                    )
                                ) : user_id == owner_id ? (
                                    <button
                                        className="btn btn-warning"
                                        onClick={this.startGame}
                                    >
                                        شروع بازی
                                    </button>
                                ) : (
                                    <></>
                                )}

                                <br></br>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Users allUsers={allUsers} room_key={room_key} />
                    </div>
                </div>
                <GameForm
                    letter={letter}
                    room_key={room_key}
                    finished={finished}
                    started={started}
                    answers={answers}
                    user_id={user_id}
                    send={this.state.send}
                />
            </main>
        );
    }
}

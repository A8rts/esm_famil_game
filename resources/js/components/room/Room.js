import React, { Component } from "react";
import axios from "axios";
import Result from "./Result";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Users = React.lazy(() => import("./Users"));

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_key: props.room_key,
            allUsers: [],
            started: false,
            finished: false,
            letters: [
                "الف",
                "ب",
                "پ",
                "ت",
                "ث",
                "ج",
                "چ",
                "ح",
                "خ",
                "د",
                "ذ",
                "ر",
                "ز",
                "ش",
                "س",
                "ص",
                "ض",
                "ط",
                "ظ",
                "ع",
                "غ",
                "ف",
                "ق",
                "ل",
                "م",
                "ن",
                "و",
                "ه",
                "ی",
            ],
            letter: "",
            esm: "خالی",
            famil: "خالی",
            ghaza: "خالی",
            miveh: "خالی",
            mashin: "خالی",
            ashia: "خالی",
            answers: [],
            sended: false,
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
                } else {
                    this.setState({
                        finished: true,
                        started: false,
                        sended: true,
                    });
                    this.setState((prevState) => ({
                        answers: [...prevState.answers, e.event.event],
                    }));

                    let state = this.state;
                    let answer = e.event.event;

                    this.createUserGame(state.room_key, state.letter, answer);
                }
            });

        axios
            .post("/api/check_started", {
                room_key: this.state.room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ started: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post("/api/check_finished", {
                room_key: this.state.room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ finished: true, started: false });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post("/api/check_letters", { room_key: this.state.room_key })
            .then((res) => {
                let games = res.data;
                for (let i = 0; i < games.length; i++) {
                    this.setState({
                        letters: this.state.letters.filter(
                            (item) => item !== games[i].letter
                        ),
                    });
                }
            });

        axios
            .post("/api/get_answers", {
                room_key: this.state.room_key,
            })
            .then((res) => {
                let events = res.data;
                for (let i = 0; i < events.length; i++) {
                    if (events[i].event !== "start") {
                        this.setState((prevState) => ({
                            answers: [...prevState.answers, events[i].event],
                        }));
                    }
                }
            });

        axios
            .post("/api/get_letter", {
                room_key: this.state.room_key,
            })
            .then((res) => {
                this.setState({ letter: res.data });
            });
        // So that if the user refreshes the page, the word(letter) for the game will not be lost
    }

    startGame = () => {
        if (this.state.letters.length < 1) {
            axios.post("/api/letters_finished", {
                room_key: this.state.room_key,
            });
        } else {
            axios
                .post("/api/start", {
                    room_key: this.state.room_key,
                    letters: this.state.letters,
                })
                .then((res) => {
                    let letter = res.data;

                    for (let i = 0; i < this.state.letters.length; i++) {
                        this.setState({
                            letters: this.state.letters.filter(
                                (item) => item !== letter
                            ),
                        });
                    }

                    this.setState({ letter: letter });

                    axios.post("/api/change_letter", {
                        room_key: this.state.room_key,
                        letter: this.state.letter,
                    });
                });
        }
    };

    onChangeInput = (e) => {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value });
    };

    submitForm = (e) => {
        e.preventDefault();

        this.createRoomGame(this.state.room_key, this.state.letter);

        this.setState({ finished: true, started: false, sended: true });

        axios.post("/api/finished", {
            room_key: this.state.room_key,
            letter: this.state.letter,
        });
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

    createRoomGame = (room_key, letter) => {
        axios
            .post("/api/create_room_game", {
                room_key: room_key,
                letter: letter,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    createUserGame = (room_key, letter, answer) => {
        axios.post("/api/create_user_game", {
            room_key: room_key,
            letter: letter,
            answer: answer,
        });
    };

    render() {
        let {
            started,
            room_key,
            finished,
            answers,
            sended,
            allUsers,
            esm,
            famil,
            ghaza,
            miveh,
            mashin,
            ashia,
            letter,
        } = this.state;
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
                                            onClick={this.playAgain}
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
                        <Users allUsers={allUsers} />
                    </div>
                </div>
                {started ? (
                    finished ? (
                        <></>
                    ) : (
                        <main>
                            <form onSubmit={this.submitForm}>
                                <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                                    <p className="fs-5">
                                        بازی شروع شده است! وقتی فرم را تکمیل
                                        کردید روی دکمه تمام کلیک کنید
                                        <strong>
                                            {" "}
                                            توجه بازی با حرف - {letter} - است
                                        </strong>
                                    </p>
                                    <button className="btn btn-success btn-lg">
                                        تمام
                                    </button>
                                </div>
                                <br></br>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id=""
                                        >
                                            اسم و فامیل
                                        </span>
                                    </div>
                                    <input
                                        name="esm"
                                        required
                                        type="text"
                                        className="form-control"
                                        onChange={this.onChangeInput}
                                        placeholder="اسم"
                                    ></input>
                                    <input
                                        name="famil"
                                        required
                                        type="text"
                                        className="form-control"
                                        onChange={this.onChangeInput}
                                        placeholder="فامیل"
                                    ></input>
                                </div>
                                <br></br>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id=""
                                        >
                                            غذا و میوه
                                        </span>
                                    </div>
                                    <input
                                        onChange={this.onChangeInput}
                                        name="ghaza"
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="غذا"
                                    ></input>
                                    <input
                                        onChange={this.onChangeInput}
                                        name="miveh"
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="میوه"
                                    ></input>
                                </div>
                                <br></br>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text"
                                            id=""
                                        >
                                            ماشین و اشیا
                                        </span>
                                    </div>
                                    <input
                                        onChange={this.onChangeInput}
                                        name="mashin"
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="ماشین"
                                    ></input>
                                    <input
                                        onChange={this.onChangeInput}
                                        name="ashia"
                                        required
                                        type="text"
                                        className="form-control"
                                        placeholder="اشیا"
                                    ></input>
                                </div>
                            </form>
                        </main>
                    )
                ) : (
                    <></>
                )}
                {finished ? (
                    sended ? (
                        <div>
                            <Result
                                sended={sended}
                                user_id={user_id}
                                room_key={room_key}
                                answers={answers}
                                esm={esm}
                                famil={famil}
                                ghaza={ghaza}
                                miveh={miveh}
                                mashin={mashin}
                                ashia={ashia}
                            />
                        </div>
                    ) : (
                        <Result sended={sended} answers={answers} />
                    )
                ) : (
                    <></>
                )}
            </main>
        );
    }
}

import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import FinalResult from "./FinalResult";
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
            letters: ["الف","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ش","س","ص","ض","ط","ظ",
            "ع","غ","ف","ق","ل","م","ن","و","ه","ی",],
            letter: "",
            answers: [],
            user_id: 0,
            answers_count: 0,
            send: false,
            player_save_scores: 0,
            names: [],
            scores: [],
            score: 0,
            scores_sended: false,
            final_results: [],
            show_final_result: false,
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
                    this.setState({ answers_count: 0 });
                    this.setState({ answers: [] });

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
                    this.setState({
                        finished: true,
                        started: false,
                        send: true,
                    });
                } else if (e.event.event == "one_player_finished_scores") {
                    this.getCountPlayersScores(
                        this.state.room_key,
                        this.state.letter
                    );
                } else if (e.event.event == "show_final_results") {
                    this.showFinalResult();
                } else {
                    this.setState({
                        finished: true,
                        started: false,
                    });

                    if (this.state.answers_count < 1) {
                        this.getAnswers(this.state.room_key);
                        this.setState({
                            answers_count: this.state.answers_count + 1,
                        });
                    }
                }
            });

        let room_key = this.state.room_key;

        axios
            .get("/user/profile")
            .then((res) => {
                this.setState({ user_id: res.data.id });
            })
            .catch((err) => {
                console.log(err);
            });

        this.checkShowFinalResults(room_key);

        if (this.state.show_final_result !== true) {
            this.checkStarteFinished(room_key);
            this.removeLetters(room_key);
            this.getAnswers(room_key);
            this.checkScoresSended(room_key);
        }

        setTimeout(() => {
            this.getCountPlayersScores(room_key, this.state.letter);
        }, 2000);
    }

    startGame = () => {
        this.setState({ answers_count: 0, player_save_scores: 0 });

        if (this.state.letters.length < 1) {
            axios.post("/api/letters_finished", {
                room_key: this.state.room_key,
            });
        } else {
            this.clearFormData();
            this.setState({ answers: [] });
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

    playAgain = () => {
        this.startGame();

        this.setState({ scores_sended: false });
        axios.post("/api/change_scores_not_sended", {
            room_key: this.state.room_key,
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

    compareAndSaveScores = () => {
        axios
            .post("/api/compare_scores", {
                room_key: this.state.room_key,
                letter: this.state.letter,
            })
            .then((res) => {
                for (let i = 0; i < this.state.answers.length; i++) {
                    this.setState((prevState) => ({
                        names: [...prevState.names, this.state.answers[i].name],
                    }));
                }

                let scores = res.data;
                for (let s = 0; s < scores.length; s++) {
                    this.setState((prevState) => ({
                        scores: [...prevState.scores, scores[s]],
                    }));
                }

                for (let n = 0; n < this.state.names.length; n++) {
                    let esm_scores = [];
                    let famil_scores = [];
                    let ghaza_scores = [];
                    let miveh_scores = [];
                    let mashin_scores = [];
                    let ashia_scores = [];
                    this.setState({ score: 0 });

                    let user_score = this.state.scores.filter(
                        (item) => item.name == this.state.names[n]
                    );

                    for (let j = 0; j < user_score.length; j++) {
                        esm_scores.push(user_score[j].esm_score);
                        famil_scores.push(user_score[j].famil_score);
                        ghaza_scores.push(user_score[j].ghaza_score);
                        miveh_scores.push(user_score[j].miveh_score);
                        mashin_scores.push(user_score[j].mashin_score);
                        ashia_scores.push(user_score[j].ashia_score);
                    }

                    this.compareScores(esm_scores);
                    this.compareScores(famil_scores);
                    this.compareScores(ghaza_scores);
                    this.compareScores(miveh_scores);
                    this.compareScores(mashin_scores);
                    this.compareScores(ashia_scores);

                    axios
                        .post("/api/final_score", {
                            room_key: this.state.room_key,
                            name: this.state.names[n],
                            score: this.state.score,
                        })
                        .then((res) => {
                            console.log(res.data);
                        });
                }
            });

        this.setState({ scores_sended: true });
        axios.post("/api/change_scores_sended", {
            room_key: this.state.room_key,
        });
    };

    compareScores = (array) => {
        let count_ten = 0;
        let count_five = 0;
        let count_zero = 0;

        for (let a = 0; a < array.length; a++) {
            if (array[a] == 10) {
                count_ten += 1;
            } else if (array[a] == 5) {
                count_five += 1;
            } else if (array[a] == 0) {
                count_zero += 1;
            }
        }

        let score = 0;

        if (count_ten > count_five && count_ten > count_zero) {
            score = 10;
        } else if (count_five > count_ten && count_five > count_zero) {
            score = 5;
        } else if (count_zero > count_ten && count_zero > count_five) {
            score = 0;
        } else if (count_ten == count_zero && count_ten == count_five) {
            score = 5;
        } else if (count_ten > count_five && count_ten == count_zero) {
            score = 10;
        } else if (count_ten > count_zero && count_ten == count_five) {
            score = 10;
        } else if (count_five > count_zero && count_five == count_ten) {
            score = 10;
        } else if (count_five > count_ten && count_five == count_zero) {
            score = 5;
        } else if (count_zero > count_five && count_zero == count_ten) {
            score = 10;
        } else if (count_zero > count_ten && count_zero == count_five) {
            score = 5;
        }

        this.setState({ score: this.state.score + score });
    };

    checkStarteFinished = (room_key) => {
        //So that no problem when user refresh the page
        axios
            .post("/api/check_started", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ started: true });
                } else if (res.data == false) {
                    this.setState({ finished: true });
                }
            })
            .catch((err) => {
                console.log(err);
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
            let room = res.data[0];
            this.setState({ letter: room[0].letter });

            let games = res.data[1];

            for (let i = 0; i < games.length; i++) {
                this.filterLetters(games[i].letter);
            }
        });
    };

    checkScoresSended = (room_key) => {
        axios
            .post("/api/check_scores_sended", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.setState({ scores_sended: true });
                }
            });
    };

    getAnswers = (room_key) => {
        //for get all answers
        axios
            .post("/api/get_answers", {
                room_key: room_key,
            })
            .then((res) => {
                let results = res.data;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].letter == this.state.letter) {
                        this.setState((prevState) => ({
                            answers: [...prevState.answers, results[i]],
                        }));
                    }
                }
            });
    };

    getCountPlayersScores = (room_key, letter) => {
        axios
            .post("/api/count_palyers_scores", {
                room_key: room_key,
                letter: letter,
            })
            .then((res) => {
                if (res.data !== false) {
                    this.setState({
                        player_save_scores: res.data.count_players_save_score,
                    });
                }
            });
    };

    makeFinalResultEvent = () => {
        axios.post("/api/make_final_result_event", {
            room_key: this.state.room_key,
        });
    };

    showFinalResult = () => {
        this.setState({ show_final_result: true });
        axios
            .post("/api/get_final_result", {
                room_key: this.state.room_key,
            })
            .then((res) => {
                let results = res.data;

                for (let r = 0; r < results.length; r++) {
                    this.setState((prevState) => ({
                        final_results: [...prevState.final_results, results[r]],
                    }));
                }
            });
    };

    checkShowFinalResults = (room_key) => {
        axios
            .post("/api/check_show_final_results", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == true) {
                    this.showFinalResult();
                }
            });
    };

    render() {
        let {
            started,
            room_key,
            finished,
            answers,
            allUsers,
            letter,
            user_id,
            player_save_scores,
            scores_sended,
            show_final_result,
        } = this.state;
        let { owner_id } = this.props;

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
                                        player_save_scores ==
                                        answers.length ? (
                                            scores_sended ? (
                                                show_final_result ? (
                                                    <></>
                                                ) : (
                                                    <div className="col d-flex flex-column position-static">
                                                        <button
                                                            onClick={
                                                                this.playAgain
                                                            }
                                                            className="btn btn-success"
                                                        >
                                                            بازی دوباره
                                                        </button>
                                                        <br></br>
                                                        <button
                                                            onClick={
                                                                this
                                                                    .makeFinalResultEvent
                                                            }
                                                            className="btn btn-danger"
                                                        >
                                                            اتمام بازی و دیدن
                                                            نتایج نهایی
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                <button
                                                    onClick={
                                                        this
                                                            .compareAndSaveScores
                                                    }
                                                    className="btn btn-warning"
                                                >
                                                    امتیاز دهی کاربران تمام شد!
                                                    ارسال امتیازات
                                                </button>
                                            )
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <button className="btn btn-dark">
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
                        <Users allUsers={allUsers} room_key={room_key} user_id={user_id} owner_id={owner_id}/>
                    </div>
                </div>
                {show_final_result ? (
                    <FinalResult final_results={this.state.final_results} />
                ) : (
                    <GameForm
                        letter={letter}
                        room_key={room_key}
                        finished={finished}
                        started={started}
                        answers={answers}
                        user_id={user_id}
                        send={this.state.send}
                    />
                )}
            </main>
        );
    }
}

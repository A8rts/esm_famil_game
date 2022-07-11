import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import FinalResult from "./result/FinalResult";
import GameForm from "./game_form/GameForm";
import "./Room.css";
import "animate.css";
import StartGuidance from "./guidances/StartGuidance";
import FinalResultGuidance from "./guidances/FinalResultGuidance";
import FormGuidance from "./guidances/FormGuidance";
import ScoreGuidance from "./guidances/ScoreGuidance";

const Users = React.lazy(() => import("./list_users/Users"));

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_key: props.room_key,
            allUsers: [],
            started: false,
            finished: false,
            letters: ["آ","ب","پ","ت","ث","ج","چ","ح","خ","د","ذ","ر","ز","ش","س","ص","ض","ط","ظ","ع","غ","ف","ق","ل","م","ن","و","ه","ی",
            ],
            letter: "",
            answers: [],
            user_id: 0,
            answers_count: 0,
            send: false,
            names: [],
            scores: [],
            score: 0,
            scores_sended: false,
            final_results: [],
            show_final_result: false,
            showButtons: true,
            showUsersAndStart: true,
            guidance: false,
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
                    this.setState({
                        answers_count: 0,
                        answers: [],
                        showUsersAndStart: false,
                        guidance: false,
                    });

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
                        guidance: false,
                        send: true,
                        scores_sended: false,
                        showButtons: false,
                    });
                } else if (e.event.event == "one_player_finished_scores") {
                    this.getCountSaveScoresFromProps(
                        this.state.room_key,
                        this.state.letter
                    );
                } else if (e.event.event == "show_final_results") {
                    this.showFinalResult();
                } else {
                    this.setState({
                        finished: true,
                        guidance: false,
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
            this.getCountSaveScoresFromProps(room_key, this.state.letter);
        }, 2000);
    }

    startGame = () => {
        this.setState({
            answers_count: 0,
            guidance: false,
            showUsersAndStart: false,
            showButtons: false,
        });
        this.props.resetPlayerSaveScores();

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
        this.setState({ showButtons: false });
        this.startGame();

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
                    this.setState({ started: true, showUsersAndStart: false });
                } else if (res.data == false) {
                    this.setState({ finished: true, showUsersAndStart: false });
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

    getCountSaveScoresFromProps = (room_key, letter) => {
        this.props.getCountPlayersScores(room_key, letter);
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

    setShowButtons = () => {
        this.setState({ showButtons: true });
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
            scores_sended,
            show_final_result,
        } = this.state;
        let { owner_id, player_save_scores } = this.props;

        return (
            <main className="king py-5">
                <div className="room">
                    <div className="room-text">
                        {this.state.showUsersAndStart ? (
                            <div>
                                <strong className="animate__animated  animate__zoomIn welcome">
                                    خوش آمیدد . سازنده اتاق میتواند بازی را شروع
                                    کند
                                </strong>
                                <p className="click-question-text mt-3 animate__animated  animate__zoomIn">
                                    هر موقع سوالی برایتان پیش آمد و یا
                                    نمیدانستید چه کنید روی دکمه ای که علامت سوال
                                    دارد بزنید
                                </p>
                            </div>
                        ) : (
                            <div>
                                <strong className="animate__animated  animate__jackInTheBox playing">
                                    بازی شروع شده است :)
                                </strong>
                                <p className="click-question-text mt-3 animate__animated  animate__zoomIn">
                                    هر موقع سوالی برایتان پیش آمد و یا
                                    نمیدانستید چه کنید روی دکمه ای که علامت سوال
                                    دارد بزنید
                                </p>
                                <div className="playing-emoji animate__animated animate__swing">
                                    <p>&#127918;</p>
                                    <p>&#129669;</p>
                                </div>
                            </div>
                        )}
                        <div className="guidance mt-4 animate__animated animate__zoomIn">
                            <svg
                                onClick={() => {
                                    if (this.state.guidance == true) {
                                        this.setState({ guidance: false });
                                    } else {
                                        this.setState({ guidance: true });
                                    }
                                }}
                                className="guidance-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                                />
                            </svg>
                        </div>
                        {show_final_result ? (
                            this.state.guidance ? (
                                <FinalResultGuidance />
                            ) : (
                                <></>
                            )
                        ) : started ? (
                            this.state.guidance ? (
                                <FormGuidance letter={letter} />
                            ) : (
                                <></>
                            )
                        ) : finished ? (
                            this.state.guidance ? (
                                <ScoreGuidance />
                            ) : (
                                <></>
                            )
                        ) : this.state.guidance ? (
                            <StartGuidance />
                        ) : (
                            <></>
                        )}
                    </div>
                    {started ? (
                        <></>
                    ) : (
                        <div>
                            <div className="start-section mt-5">
                                <div className="start-box py-2">
                                    <div className="start-content">
                                        <strong>خوش آمدید</strong>
                                        <p className="mt-4">
                                            کلید اتاق : {room_key}
                                        </p>
                                        {this.state.showButtons ? (
                                            started ? (
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
                                                                            this
                                                                                .playAgain
                                                                        }
                                                                        className="play-again-button"
                                                                    >
                                                                        بازی
                                                                        دوباره
                                                                    </button>
                                                                    <br></br>
                                                                    <button
                                                                        onClick={
                                                                            this
                                                                                .makeFinalResultEvent
                                                                        }
                                                                        className="final-result-button"
                                                                    >
                                                                        اتمام
                                                                        بازی و
                                                                        دیدن
                                                                        نتایج
                                                                        نهایی
                                                                    </button>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <button
                                                                onClick={
                                                                    this
                                                                        .compareAndSaveScores
                                                                }
                                                                className="finished-scores"
                                                            >
                                                                امتیاز دهی
                                                                کاربران تمام شد!
                                                                ارسال امتیازات
                                                            </button>
                                                        )
                                                    ) : (
                                                        <></>
                                                    )
                                                ) : (
                                                    <button className="whait-for-owner mt-4">
                                                        صبر کنید تا سازنده اتاق
                                                        دوباره بازی را شروع کند
                                                    </button>
                                                )
                                            ) : user_id == owner_id ? (
                                                <button
                                                    className="start-button"
                                                    onClick={this.startGame}
                                                >
                                                    شروع بازی
                                                </button>
                                            ) : (
                                                <></>
                                            )
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="users-section mt-5">
                                <Users
                                    allUsers={allUsers}
                                    owner_id={owner_id}
                                    started={started}
                                    finished={finished}
                                    scores_sended={scores_sended}
                                />
                            </div>
                            <hr
                                style={{ color: "white", fontSize: "3px" }}
                            ></hr>
                        </div>
                    )}
                </div>

                {show_final_result ? (
                    <FinalResult final_results={this.state.final_results} />
                ) : (
                    <div>
                        <GameForm
                            guidance={this.state.guidance}
                            letter={letter}
                            allUsers={allUsers}
                            room_key={room_key}
                            owner_id={owner_id}
                            player_save_scores={player_save_scores}
                            finished={finished}
                            started={started}
                            answers={answers}
                            user_id={user_id}
                            send={this.state.send}
                            setShowButtons={this.setShowButtons.bind(this)}
                        />
                    </div>
                )}
            </main>
        );
    }
}

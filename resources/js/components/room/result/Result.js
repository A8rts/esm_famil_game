import axios from "axios";
import React, { Component } from "react";
import Score from "./Score";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Spinner from "react-spinkit";
import "./css/Result.css";

export default class Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_finish_score_button: "loading",
        };
    }

    componentDidMount() {
        console.log(this.props);
        setTimeout(() => {
            axios
                .post("/api/get_users_scores", {
                    room_key: this.props.room_key,
                    letter: this.props.letter,
                    user_id: this.props.user_id,
                })
                .then((res) => {
                    if (res.data == false) {
                        this.setState({ show_finish_score_button: false });
                    } else if (res.data == true) {
                        this.setState({ show_finish_score_button: true });
                    }
                });
        }, 500);

        if (this.props.send == true) {
            let props = this.props;
            axios.post("/api/finish", {
                user_id: props.user_id,
                room_key: props.room_key,
                esm: props.esm,
                famil: props.famil,
                ghaza: props.ghaza,
                miveh: props.miveh,
                mashin: props.mashin,
                ashia: props.ashia,
                letter: props.letter,
            });
        }
    }

    scoresSended = () => {
        this.props.setShowRoomButtons();

        axios
            .post("/api/check_scores", {
                room_key: this.props.room_key,
                from_id: this.props.user_id,
                letter: this.props.letter,
            })
            .then((res) => {
                if (res.data.length == this.props.answers.length) {
                    this.setState({ show_finish_score_button: false });
                    axios
                        .post("/api/done_score", {
                            user_id: this.props.user_id,
                            room_key: this.props.room_key,
                            letter: this.props.letter,
                        })
                        .then((res) => console.log(res.data));
                } else {
                    Swal.fire({
                        title: "شما همه امتیاز هایتان را به حریفان خود ندادید!",
                        confirmButtonText: "الان میدم",
                    });
                }
            });
    };

    showUserAnswes = (name) => {
        let answers = this.props.answers;
        let user_answer = [];

        for (let i = 0; i < answers.length; i++) {
            if (answers[i].name == name) {
                user_answer.push(answers[i]);
            }
        }

        Swal.fire({
            title: user_answer[0].name,
            text:
                "اسم : " +
                user_answer[0].esm +
                " || " +
                "فامیل : " +
                user_answer[0].famil +
                " || " +
                "غذا : " +
                user_answer[0].ghaza +
                " || " +
                "میوه : " +
                user_answer[0].miveh +
                " || " +
                "ماشین : " +
                user_answer[0].mashin +
                " || " +
                "اشیا : " +
                user_answer[0].ashia,
            background: "linear-gradient(to right, #283c86, #45a247)",
            color: "white",
            confirmButtonText: "برم امتیاز بدم",
            confirmButtonColor: "#EE5A24",
        });
    };

    render() {
        let {
            answers,
            room_key,
            user_id,
            letter,
            player_save_scores,
            owner_id,
            allUsers,
        } = this.props;
        let { show_finish_score_button } = this.state;
        return (
            <main className="main-result">
                {this.props.scores_sended == true ? (
                    <></>
                ) : (
                    <div className="result-game mt-4">
                        <img
                            className="result-score-icon"
                            src="https://cdn-icons-png.flaticon.com/128/2055/2055759.png"
                        ></img>
                        <strong className="result-score-txt mt-3">
                            به حریفان خود امتیاز بدهید
                        </strong>

                        {show_finish_score_button !== "loading" ? (
                            show_finish_score_button ? (
                                <button
                                    className="finished-scoring mt-2"
                                    onClick={this.scoresSended}
                                >
                                    <strong>امتیاز به همه دادم!</strong>
                                </button>
                            ) : (
                                <p className="des-result-txt mt-2">
                                    هر موقع همه امتیاز هایشان را دادند برای
                                    سازنده اتاق درخواستی میرود و اگر قبول کند
                                    میتواند بازی را شروع یا نتیجه نهایی را ارسال
                                    کند
                                </p>
                            )
                        ) : (
                            <></>
                        )}

                        <div className="results-scores-box mt-4">
                            <div className="results-scores-box-txt mt-3">
                                <strong>
                                    روی دکمه دیدن پاسخ ها بزن تا پاسخارو ببینی
                                </strong>
                            </div>
                            {answers.map((item) => (
                                <div key={item.id}>
                                    <div className="score-box mt-4 mb-4">
                                        <div className="result-name-user-section">
                                            <strong>{item.name}</strong>
                                        </div>
                                        <button
                                            className="see-answer-user"
                                            onClick={() =>
                                                this.showUserAnswes(item.name)
                                            }
                                        >
                                            دیدن پاسخ ها
                                        </button>
                                        <Score
                                            id={item.id}
                                            name={item.name}
                                            room_key={room_key}
                                            user_id={user_id}
                                            letter={letter}
                                            show_finish_score_button={
                                                show_finish_score_button
                                            }
                                        />
                                    </div>
                                    <hr
                                        style={{
                                            color: "#white",
                                            backgroundColor: "white",
                                            height: "0.2rem",
                                            width: "30vh",
                                            margin: "auto",
                                            borderColor: "white",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                )}
            </main>
        );
    }
}

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
            <main>
                {show_finish_score_button !== "loading" ? (
                    show_finish_score_button ? (
                        <div className="finish-score-button mt-5">
                            <button
                                className="scores-finished"
                                onClick={this.scoresSended}
                            >
                                امتیاز دهی من تمام شد
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                ) : (
                    <></>
                )}
                {show_finish_score_button == "loading" ? (
                    <div className="result-loading">
                        <Spinner
                            name="chasing-dots"
                            style={{ width: 70, height: 70, color: "white" }}
                        />
                    </div>
                ) : (
                    <div>
                        {answers.map((item) => (
                            <div className="boxes mt-5" key={item.id}>
                                <div className="result-box">
                                    <div className="result-content">
                                        <strong>{item.name}</strong>
                                        <p className="mt-3">
                                            اسم : {item.esm} | فامیل :{" "}
                                            {item.famil} | غذا : {item.ghaza} |
                                            میوه : {item.miveh} | مشاین :
                                            {item.mashin} | اشیا : {item.ashia}
                                        </p>
                                    </div>
                                    <div className="result-emoji">
                                        <p className="animate__animated animate__zoomIn">
                                            &#128377;&#65039;
                                        </p>
                                        <p className="animate__animated animate__zoomIn">
                                            &#127922;
                                        </p>
                                    </div>
                                </div>
                                <div className="score-box">
                                    <div className="word-score">
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        );
    }
}

import React, { Component } from "react";
import "./css/FinalResult.css";
import axios from "axios";

export default class FinalResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            best_score: "",
        };
    }

    static getDerivedStateFromProps(props) {
        let scores = [];
        let best_score = "";

        if (Array.isArray(props.final_results) && props.final_results.length) {
            if (props.final_results.length > 1) {
                for (let i = 0; i < props.final_results.length; i++) {
                    scores = [...scores, props.final_results[i].score];

                    axios
                        .post("/api/create_user_history", {
                            user_name: props.final_results[i].name,
                            user_score: props.final_results[i].score,
                            letter: props.letter,
                            room_key: props.room_key,
                        })
                        .then((res) => console.log(res.data));
                }
            }

            if (Array.isArray(scores) && scores.length) {
                best_score = Math.max.apply(Math, scores);
            }
        }

        return {
            best_score: best_score,
        };
    }

    render() {
        let { final_results } = this.props;
        return (
            <div className="final-result">
                <img
                    src="https://cdn-icons.flaticon.com/png/128/2065/premium/2065169.png?token=exp=1660640206~hmac=7c4f6bd5f56c49da4ab5b351799063bf"
                    className="final-result-icon mt-2"
                ></img>
                <strong className="final-result-txt mt-3">
                    نتیجه ی نهایی را ببینید
                </strong>
                <button className="return-home-button mt-3">
                    <a href="/game" className="return-home-txt">
                        بازگشت به خانه
                    </a>
                </button>
                <div className="final-result-box mt-4">
                    <div className="des-final-result-box mt-3 mb-4">
                        <strong>نتایج نهایی را مشاهده کنید!</strong>
                    </div>

                    {final_results.map((item) => (
                        <div className="user-result-box mb-3" key={item.id}>
                            {this.state.best_score == item.score ? (
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1198/1198990.png"
                                    className="crown-icon-result-box"
                                ></img>
                            ) : (
                                <></>
                            )}
                            <strong className="user-name-result-box">
                                {item.name}
                            </strong>
                            <strong className="score-result-box mt-2">
                                امتیاز : {item.score}
                            </strong>
                        </div>
                    ))}
                </div>
                <br></br>
            </div>
        );
    }
}

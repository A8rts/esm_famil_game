import React, { Component } from "react";
import './css/FinalResult.css';

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
            for (let i = 0; i < props.final_results.length; i++) {
                scores = [...scores, props.final_results[i].score];
            }
        }

        if (Array.isArray(scores) && scores.length) {
            best_score = Math.max.apply(Math, scores);
        }
        return {
            best_score: best_score,
        };
    }

    render() {
        let { final_results } = this.props;
        return (
            <div
                className="modal modal-alert position-static d-block py-5"
                role="dialog"
                id="modalChoice"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-15 shadow final-result">
                        <button
                            type="button"
                            className="px-4 gap-3 go-out"
                        >
                            <a
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                                href="/game"
                            >
                                بازگشت به صفحه اصلی
                            </a>
                        </button>
                        {final_results.map((item) => (
                            <div
                                key={item.id}
                                className="modal-body p-4 text-center"
                            >
                                {item.score == this.state.best_score ? (
                                    <div>
                                        <img width='60' height='60' src="https://cdn-icons-png.flaticon.com/512/2385/2385856.png"></img>
                                        <h2>{item.name}</h2>
                                    </div>
                                ) : (
                                    <h2 className="mb-0">{item.name}</h2>
                                )}
                                <br></br>
                                {item.score == this.state.best_score ? (
                                    <strong className="mb-0">
                                        امتیاز : {item.score}
                                    </strong>
                                ) : (
                                    <p className="mb-0">
                                        امتیاز : {item.score}
                                    </p>
                                )}
                                <br></br>
                                <div
                                    style={{
                                        borderTop: "1px solid",
                                        marginTop: 20,
                                        marginLeft: 20,
                                        marginRight: 20,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

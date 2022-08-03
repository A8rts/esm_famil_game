import React, { Component } from "react";
import "./RoomHeader.css";
import Spinner from "react-spinkit";
import { set } from "lodash";
import Guidances from "./guidances";
import SaveScores from "./SaveScores";

export default class RoomHeader extends Component {
    constructor() {
        super();

        this.state = {
            loadingData: true,
            showStartButton: true,
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.owner_id !== undefined) {
            return {
                loadingData: false,
            };
        } else {
            return null;
        }
    }

    changeStartGame = () => {
        this.setState({ showStartButton: false });
        this.props.startGame();
    };

    callCompareAndSaveScores = () => {
        this.props.compareAndSaveScores();
    };

    render() {
        let {
            room_key,
            started,
            finished,
            scores_sended,
            show_final_result,
            answers,
            owner_id,
            user_id,
            player_save_scores,
            showButtons,
            letter,
        } = this.props;

        return (
            <div className="room-header mb-4">
                <div className="room-header-key">
                    <strong>کلید اتاق : {room_key}</strong>
                </div>
                <Guidances
                    show_final_result={show_final_result}
                    started={started}
                    finished={finished}
                    scores_sended={scores_sended}
                    letter={letter}
                />
                <div className="room-header-buttons">
                    <button
                        className="invite-button"
                        onClick={() => navigator.clipboard.writeText(room_key)}
                    >
                        <strong>کپی کلید اتاق </strong>
                    </button>

                    {this.state.loadingData == false ? (
                        showButtons ? (
                            scores_sended == false ? (
                                finished ? (
                                    <button className="scoring-button">
                                        <strong>امتیاز بده!</strong>
                                    </button>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )
                        ) : (
                            <></>
                        )
                    ) : (
                        <></>
                    )}

                    {this.state.loadingData ? (
                        <button className="loading-button invite-button">
                            <strong>.....</strong>
                        </button>
                    ) : showButtons ? (
                        started ? (
                            <button className="playing-game">
                                <strong>فرمو پر کن!</strong>
                            </button>
                        ) : finished ? (
                            user_id == owner_id ? (
                                player_save_scores !== "" ? (
                                    player_save_scores == answers.length ? (
                                        scores_sended ? (
                                            show_final_result ? (
                                                <button className="final-result-header-button">
                                                <strong>نتیجه نهایی</strong>
                                            </button>
                                            ) : (
                                                <button className="finish-game-button">
                                                    <strong>تموم شد!</strong>
                                                </button>
                                            )
                                        ) : (
                                            <SaveScores
                                                callCompareAndSaveScores={this.callCompareAndSaveScores.bind(
                                                    this
                                                )}
                                                scores_sended={scores_sended}
                                                player_save_scores={
                                                    player_save_scores
                                                }
                                                answers={answers}
                                            />
                                        )
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <></>
                                )
                            ) : player_save_scores !== "" ? (
                                player_save_scores == answers.length ? (
                                    scores_sended ? (
                                        show_final_result ? (
                                            <></>
                                        ) : (
                                            <button className="finish-game-button">
                                                <strong>تموم شد!</strong>
                                            </button>
                                        )
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )
                        ) : user_id == owner_id ? (
                            this.state.showStartButton ? (
                                <button
                                    className="start-game-button"
                                    onClick={() => this.changeStartGame()}
                                >
                                    <strong>شروع بازی</strong>
                                </button>
                            ) : (
                                <></>
                            )
                        ) : (
                            <button className="start-game-button" disabled>
                                <strong>شروع بازی</strong>
                            </button>
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
}

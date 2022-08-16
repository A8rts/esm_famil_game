import axios from "axios";
import React, { Component } from "react";
import Result from "../result/Result";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./GameForm.css";

export default class GameForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            esm: "خالی",
            famil: "خالی",
            ghaza: "خالی",
            miveh: "خالی",
            mashin: "خالی",
            ashia: "خالی",
        };
    }

    onChangeInput = (e) => {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value });
    };

    validationForm = () => {
        let state = this.state;
        let letter = this.props.letter;
        if (
            state.esm.charAt(0) !== letter ||
            state.famil.charAt(0) !== letter ||
            state.ghaza.charAt(0) !== letter ||
            state.miveh.charAt(0) !== letter ||
            state.mashin.charAt(0) !== letter ||
            state.ashia.charAt(0) !== letter
        ) {
            return false;
        } else {
            return true;
        }
    };

    submitForm = (e) => {
        e.preventDefault();
        if (this.validationForm()) {
            this.createRoomGame(this.props.room_key, this.props.letter);

            axios.post("/api/game_finished", {
                room_key: this.props.room_key,
            });

            axios.post("/api/finished", {
                room_key: this.props.room_key,
                letter: this.props.letter,
            });
        } else {
            Swal.fire({
                title: "لطفا کلمات خود را بررسی کنید",
                text: `اول یکی یا چند تا از کلمات شما با حرف (${this.props.letter}) یکسان نیست`,
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "باشه",
            });
        }
    };

    createRoomGame = (room_key, letter) => {
        axios.post("/api/create_room_game", {
            room_key: room_key,
            letter: letter,
        });
    };

    setShowRoomButtons = () => {
        this.props.setShowButtons();
    };

    render() {
        let { letter, user_id, answers, finished, room_key, started, scores_sended } =
            this.props;
        let { esm, famil, ghaza, miveh, mashin, ashia } = this.state;
        return (
            <main className="main-game-form">
                {started ? (
                    <div>
                        <img
                            className="game-form-icon mb-2"
                            src="https://cdn-icons.flaticon.com/png/128/1698/premium/1698579.png?token=exp=1660640081~hmac=0e923883ff1ba9d2fa69860eae46c58d"
                        ></img>
                        <strong className="game-form-txt">
                            بازی شروع شده فرمو پر کن!
                        </strong>
                        <form onSubmit={this.submitForm}>
                            <button
                                type="submit"
                                className="finished-button mt-3 mb-2"
                            >
                                <strong>تمام</strong>
                            </button>
                            <div className="game-form mt-4 mb-4">
                                <div className="letter-game-form mt-3">
                                    <strong>بازی با حرف ({letter}) است</strong>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            اسم
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="esm"
                                            className="game-form-input"
                                            placeholder="اسم"
                                        ></input>
                                    </div>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            فامیل
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="famil"
                                            className="game-form-input"
                                            placeholder="فامیل"
                                        ></input>
                                    </div>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            غذا
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="ghaza"
                                            className="game-form-input"
                                            placeholder="غذا"
                                        ></input>
                                    </div>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            میوه
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="miveh"
                                            className="game-form-input"
                                            placeholder="میوه"
                                        ></input>
                                    </div>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            ماشین
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="mashin"
                                            className="game-form-input"
                                            placeholder="ماشین"
                                        ></input>
                                    </div>
                                </div>
                                <div className="one-word-game-form mt-3 mb-4">
                                    <div className="word-content">
                                        <strong className="game-form-word">
                                            اشیا
                                        </strong>
                                        <input
                                            required
                                            onChange={this.onChangeInput}
                                            name="ashia"
                                            className="game-form-input"
                                            placeholder="اشیا"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <br></br>
                    </div>
                ) : finished ? (
                    <Result
                        send={this.props.send}
                        player_save_scores={this.props.player_save_scores}
                        esm={esm}
                        scores_sended={scores_sended}
                        letter={letter}
                        allUsers={this.props.allUsers}
                        famil={famil}
                        ghaza={ghaza}
                        miveh={miveh}
                        mashin={mashin}
                        ashia={ashia}
                        user_id={user_id}
                        owner_id={this.props.owner_id}
                        room_key={room_key}
                        answers={answers}
                        setShowRoomButtons={this.setShowRoomButtons.bind(this)}
                    />
                ) : (
                    <></>
                )}
            </main>
        );
    }
}

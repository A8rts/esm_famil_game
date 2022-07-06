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
        let { letter, user_id, answers, finished, room_key, started } =
            this.props;
        let { esm, famil, ghaza, miveh, mashin, ashia } = this.state;
        return (
            <main className="main-game-form">
                {started ? (
                    <div className="game-form">
                        <div>
                            <strong className="with-word">
                                بازی با حرف ({letter}) است
                            </strong>

                            <form className="words" onSubmit={this.submitForm}>
                                <div className="word">
                                    <label>اسم</label>
                                    <input
                                        placeholder="اسم"
                                        name="esm"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>
                                <div className="word">
                                    <label>فامیل</label>
                                    <input
                                        placeholder="فامیل"
                                        name="famil"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>
                                <div className="word">
                                    <label>غذا</label>
                                    <input
                                        placeholder="غذا"
                                        name="ghaza"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>
                                <div className="word">
                                    <label>میوه</label>
                                    <input
                                        placeholder="میوه"
                                        name="miveh"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>
                                <div className="word">
                                    <label>ماشین</label>
                                    <input
                                        placeholder="ماشین"
                                        name="mashin"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>
                                <div className="word">
                                    <label>اشیا</label>
                                    <input
                                        placeholder="اشیا"
                                        name="ashia"
                                        required
                                        type="text"
                                        onChange={this.onChangeInput}
                                    ></input>
                                </div>

                                <button className="finish-button">تمام</button>
                            </form>
                        </div>
                    </div>
                ) : finished ? (
                    <Result
                        send={this.props.send}
                        esm={esm}
                        letter={letter}
                        famil={famil}
                        ghaza={ghaza}
                        miveh={miveh}
                        mashin={mashin}
                        ashia={ashia}
                        user_id={user_id}
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

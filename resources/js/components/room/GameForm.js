import axios from "axios";
import React, { Component } from "react";
import Result from "./Result";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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
            <main>
                {started ? (
                    <form onSubmit={this.submitForm}>
                        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                            <p className="fs-5">
                                بازی شروع شده است! وقتی فرم را تکمیل کردید روی
                                دکمه تمام کلیک کنید
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
                                <span className="input-group-text" id="">
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
                                <span className="input-group-text" id="">
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
                                <span className="input-group-text" id="">
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
                        arta={4}
                        setShowRoomButtons={this.setShowRoomButtons.bind(this)}
                    />
                ) : (
                    <></>
                )}
            </main>
        );
    }
}

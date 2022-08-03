import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class JoinRoom extends Component {
    constructor() {
        super();

        this.state = {
            join_room_key: "",
        };
    }

    onChangeJoinRoomKey = (e) => {
        e.preventDefault();

        this.setState({ join_room_key: e.target.value });
    };

    JoinRoomSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/check_key", {
                room_key: this.state.join_room_key,
            })
            .then((res) => {
                if (res.data == "empty") {
                    Swal.fire({
                        icon: "error",
                        title: "خطا",
                        text: "چنین اتاقی وجود ندارد",
                    });
                } else if (res.data == "started") {
                    Swal.fire({
                        icon: "error",
                        title: "خطا",
                        text: "این اتاق بازی اش شروع شده است",
                    });
                } else if (res.data == "finished") {
                    Swal.fire({
                        icon: "error",
                        title: "خطا",
                        text: "بازی این اتاق تمام شده است",
                    });
                } else {
                    window.location.href = `/game/room/${this.state.join_room_key}`;
                }
            });
    };

    render() {
        return (
            <div
                className="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative form"
                style={{
                    background: "linear-gradient(to right, #c94b4b, #4b134f)",
                }}
            >
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0 top-text">به اتاق بپیوندید</h3>
                    <p className="card-text mb-auto des-text">
                        کلید اتاقه مد نظرتان را وارد کنید
                    </p>
                    <br></br>
                    <form
                        onSubmit={this.JoinRoomSubmit}
                        className="room-content"
                    >
                        <div className="mb-3">
                            <input
                                placeholder="اسم اتاق"
                                type="text"
                                name="room_name"
                                className="form-control rounded-4"
                                id="floatingInput"
                                value={this.state.join_room_key}
                                onChange={this.onChangeJoinRoomKey}
                                required
                            ></input>
                        </div>

                        <button
                            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary submit-button"
                            type="submit"
                        >
                            بپیوند
                        </button>
                    </form>
                </div>
                <div className="col-auto d-none d-lg-block"></div>
            </div>
        );
    }
}

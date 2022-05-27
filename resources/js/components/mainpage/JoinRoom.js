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
            <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <h3 className="mb-0">به اتاق بپیوندید</h3>
                        <p className="mb-auto">
                            کلید اتاقی که میخواهید به آن بپیوندید را وارد کنید
                        </p>
                        <br></br>
                        <form onSubmit={this.JoinRoomSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="room_name"
                                    className="form-control rounded-4"
                                    id="floatingInput2"
                                    onChange={this.onChangeJoinRoomKey}
                                    value={this.state.join_room_key}
                                    required
                                ></input>
                            </div>

                            <button
                                className="w-100 mb-2 btn btn-lg rounded-4 btn-success"
                                type="submit"
                            >
                                بپیوند
                            </button>
                        </form>
                    </div>
                    <div className="col-auto d-none d-lg-block"></div>
                </div>
            </div>
        );
    }
}

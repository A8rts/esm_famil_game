import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class CreateRoom extends Component {
    constructor() {
        super();

        this.state = {
            user_id: 0,
            room_name: "",
        };
    }

    componentDidMount() {
        axios
            .get("/user/profile")
            .then((res) => {
                this.setState({ user_id: res.data.id });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onChangeRoomName = (e) => {
        e.preventDefault();

        this.setState({
            room_name: e.target.value,
        });
    };

    onSubmitButton = (e) => {
        e.preventDefault();

        axios
            .post("/api/create_room", {
                user_id: this.state.user_id,
                room_name: this.state.room_name,
            })
            .then((res) => {
                if (res.data == "no") {
                    Swal.fire({
                        icon: "error",
                        title: "خطا",
                        text: "لطفا دوباره تلاش کنید",
                    });
                } else {
                    let room_key = res.data.key;
                    Swal.fire({
                        title: "اتاق شما ساخته شد",
                        text: "بروید به اتاق خود",
                        icon: "success",
                        confirmButtonText: "برو",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `/game/room/${room_key}`;
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0">ایجاد اتاق</h3>
                    <p className="card-text mb-auto">
                        اسم دلخواه برای اتاقتان را وارد کنید
                    </p>
                    <br></br>
                    <form onSubmit={this.onSubmitButton}>
                        <div className="mb-3">
                            <input
                                placeholder="اسم اتاق"
                                type="text"
                                name="room_name"
                                className="form-control rounded-4"
                                id="floatingInput"
                                value={this.state.room_name}
                                onChange={this.onChangeRoomName}
                                required
                            ></input>
                        </div>

                        <button
                            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
                            type="submit"
                        >
                            بساز
                        </button>
                    </form>
                </div>
                <div className="col-auto d-none d-lg-block"></div>
            </div>
        );
    }
}

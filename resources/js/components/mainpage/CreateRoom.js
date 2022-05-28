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
            // letter: "الف",
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

    // handleChange = (e) => {
    //     this.setState({ letter: e.target.value });
    // };

    onSubmitButton = (e) => {
        e.preventDefault();

        axios
            .post("/api/create_room", {
                user_id: this.state.user_id,
                room_name: this.state.room_name,
                // letter: this.state.letter,
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
                        حرف مورد نظر برای شروع کلمات در بازی و اسم اتاق را وارد
                        کنید
                    </p>
                    <br></br>
                    <form onSubmit={this.onSubmitButton}>
                        {/* <select
                            className="form-select"
                            value={this.state.letter}
                            onChange={this.handleChange}
                        >
                            <option value="الف">الف</option>
                            <option value="ب">ب</option>
                            <option value="پ">پ</option>
                            <option value="ت">ت</option>
                            <option value="ث">ث</option>
                            <option value="ج">ج</option>
                            <option value="چ">چ</option>
                            <option value="ح">ح</option>
                            <option value="خ">خ</option>
                            <option value="د">د</option>
                            <option value="ذ">ذ</option>
                            <option value="ر">ر</option>
                            <option value="ز">ز</option>
                            <option value="ژ">ژ</option>
                            <option value="س">س</option>
                            <option value="ش">ش</option>
                            <option value="ص">ص</option>
                            <option value="ض">ض</option>
                            <option value="ط">ط</option>
                            <option value="ظ">ظ</option>
                            <option value="ع">ع</option>
                            <option value="غ">غ</option>
                            <option value="ف">ف</option>
                            <option value="ق">ق</option>
                            <option value="ل">ل</option>
                            <option value="م">م</option>
                            <option value="ن">ن</option>
                            <option value="و">و</option>
                            <option value="ه">ه</option>
                            <option value="ی">ی</option>
                        </select> */}
                        <br></br>
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

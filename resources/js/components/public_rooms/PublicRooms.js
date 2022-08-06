import axios from "axios";
import React, { Component } from "react";
import Header from "../layouts/Header";
import "./PublicRooms.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Spinner from "react-spinkit";

export default class PublicRooms extends Component {
    constructor() {
        super();

        this.state = {
            public_rooms: [],
            loadingPublicRooms: false,
        };
    }

    componentDidMount() {
        this.setState({ loadingPublicRooms: true });

        axios.post("/api/get_rooms").then((res) => {
            this.setState({ loadingPublicRooms: true });

            let publics = [];
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].type == "public") {
                    if (
                        res.data[i].started == true ||
                        res.data[i].finished == true
                    ) {
                        null;
                    } else {
                        publics.push(res.data[i]);
                    }
                }
            }

            this.setState({ public_rooms: publics });
            this.setState({ loadingPublicRooms: false });
        });
    }

    joinPublicRoom = (room_key) => {
        axios
            .post("/api/check_key", {
                room_key: room_key,
            })
            .then((res) => {
                if (res.data == "started") {
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
                    window.location.href = `/game/room/${room_key}`;
                }
            });
    };

    render() {
        return (
            <main className="main-public-rooms">
                <Header direction="bottom" />
                <hr style={{ height: "2px", backgroundColor: "white" }}></hr>
                <div className="des-public-rooms">
                    <img
                        className="public-rooms-icon"
                        src="https://cdn-icons-png.flaticon.com/128/5455/5455723.png"
                    ></img>
                    <strong className="public-rooms-txt mt-2">
                        به اتاق های عمومی بپیوندید!
                    </strong>
                    <button
                        className="return-home-button mt-2"
                        onClick={() => (window.location.href = "/game")}
                    >
                        <strong>بازگشت به خانه</strong>
                    </button>
                </div>
                <div className="public-rooms-box mt-4">
                    <br></br>
                    <div className="des-public-rooms-txt">
                        <strong>به اتاق های عمومی بپیوندید</strong>
                    </div>
                    <br></br>

                    {this.state.loadingPublicRooms ? (
                        <div className="loading-best-players">
                            <Spinner
                                name="chasing-dots"
                                style={{
                                    width: 60,
                                    height: 60,
                                    color: "white",
                                }}
                            />
                        </div>
                    ) : this.state.public_rooms.length > 0 ? (
                        this.state.public_rooms.map((item) => (
                            <div className="public-room-box mb-3" key={item.id}>
                                <div className="public-rooms-content">
                                    <img
                                        className="public-room-icon"
                                        src="https://cdn-icons.flaticon.com/png/128/2936/premium/2936774.png?token=exp=1659861876~hmac=af7a07c32ac87c579e8a521e17672dae"
                                    ></img>
                                    <strong className="room-public-name">
                                        {item.name}
                                    </strong>
                                    <button
                                        className="join-public-room-button"
                                        onClick={() =>
                                            this.joinPublicRoom(item.key)
                                        }
                                    >
                                        <strong>پیوستن</strong>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <strong className="eny-public-rooms">
                            هیچ اتاق عمومی ای وجود ندارد
                        </strong>
                    )}

                    <br></br>
                </div>
                <br></br>
            </main>
        );
    }
}

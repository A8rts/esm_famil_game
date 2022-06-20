import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class PlayersColumn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showKcikButton: true,
        };
    }

    kickOut = () => {
        if (this.props.finished == false) {
            axios
                .post("/api/kick_request", {
                    toId: this.props.player_id,
                })
                .then((res) => {
                    console.log(res.data);
                });
        } else {
            Swal.fire({
                title: "شما در حال امتیاز دهی هستید!",
                text: "زمانی که کاربران در حال امتیاز دهی هستند نمیتواندی کسی را بیرون بندازید",
                icon: "warning",
                confirmButtonText: "باشه",
            });
        }
    };

    render() {
        let { player_name, player_email } = this.props;
        let { isOwner } = this.props;

        return (
            <form>
                <a
                    href="#"
                    className="list-group-item list-group-item-action d-flex gap-3 py-3"
                    aria-current="true"
                >
                    <img
                        src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                        width="42"
                        height="42"
                    ></img>
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <div>
                            <h6 className="mb-0">{player_name}</h6>
                            <p className="mb-0 opacity-75">{player_email}</p>
                        </div>
                        <small className="opacity-50 text-nowrap">بازیکن</small>
                    </div>
                    {isOwner ? (
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={this.kickOut}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-box-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"></path>
                                <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"></path>
                            </svg>
                        </button>
                    ) : (
                        <></>
                    )}
                </a>
            </form>
        );
    }
}

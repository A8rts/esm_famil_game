import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Users.css";

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOwner: false,
        };
    }

    componentDidMount() {
        if (this.props.owner_id == this.props.user_id) {
            this.setState({ isOwner: true });
        }

        window.Echo.private(`kick_user.${this.props.user_id}`).listen(
            "KickRequestEvent",
            (e) => {
                Swal.fire({
                    title: e.kick_request.message,
                    confirmButtonText: "باشه : (",
                });
                setTimeout(() => {
                    window.location.href = "/game";
                }, 500);
            }
        );
    }

    render() {
        let { allUsers, owner_id, user_id } = this.props;

        return (
            <main className="all-users">
                {this.props.scores_sended ? (
                    user_id == owner_id ? (
                        <div className="again-finish-buttons">
                            <button
                                className="play-again-button mt-4"
                                onClick={() => this.props.playAgain()}
                            >
                                <strong>شروع دوباره بازی</strong>
                            </button>
                            <button
                                className="final-result-buttons mt-4 mb-3"
                                onClick={() =>
                                    this.props.makeFinalResultEvent()
                                }
                            >
                                <strong>
                                    دیدن نتایج نهایی و تموم کردن این بازی
                                </strong>
                            </button>
                        </div>
                    ) : (
                        <strong className="wait-txt mb-2">
                            صبر کنید تا سازنده اتاق بازی را دوباره شروع یا نتیجه
                            ی نهایی رو ارسال کند
                        </strong>
                    )
                ) : (
                    <></>
                )}
                <img
                    className="users-section-icon"
                    src="https://cdn-icons.flaticon.com/png/128/1165/premium/1165725.png?token=exp=1659160501~hmac=fcf9a2b5e9a3e3957b0c93e1554f23c7"
                ></img>
                <strong className="mt-2 users-txt">بازیکن ها</strong>
                <div className="all-users-box mt-4">
                    <br></br>
                    <div className="count-users-box">
                        <strong>{allUsers.length} بازیکن</strong>
                    </div>
                    {allUsers.map((item) => (
                        <div key={item.id}>
                            <br></br>
                            <div className="user-data">
                                <div className="user-content">
                                    <img
                                        className="user-section-icon"
                                        src="https://cdn-icons.flaticon.com/png/128/2102/premium/2102633.png?token=exp=1659097789~hmac=0b84d2c5f541fe24920386db603e3fe6"
                                    ></img>
                                    <strong className="user-section-name">
                                        {item.name}
                                    </strong>
                                    {item.id == owner_id ? (
                                        <img
                                            className="crown-icon"
                                            src="https://cdn-icons.flaticon.com/png/128/1168/premium/1168868.png?token=exp=1659099060~hmac=da7dd393661814483321b5e7b2ed1f53"
                                        ></img>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <br></br>
                </div>
            </main>
        );
    }
}

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
        let { allUsers} =
            this.props;

        return (
            <main className="all-users py-2">
                <div className="users">
                    <strong className="list-text-users mb-4">لیست کاربران</strong>
                    {allUsers.map((item) => (
                        <div className="user-content" key={item.id}>
                            <div className="user-icon">
                                <img
                                    src="https://cdn-icons.flaticon.com/png/128/1144/premium/1144709.png?token=exp=1657720164~hmac=775ba3efed1ac5d34d79db20c7b4f594"
                                    width="37"
                                    height="37"
                                ></img>
                            </div>
                            <p className="user-name">{item.name}</p>
                        </div>
                    ))}
                </div>
            </main>
        );
    }
}

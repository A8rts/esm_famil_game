import React, { Component } from "react";
import OwnerColumn from "./OwnerColumn";
import PlayersColumn from "./PlayersColumn";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

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
        let { allUsers, owner_id, started, finished, scores_sended } =
            this.props;
        let { isOwner } = this.state;

        return (
            <div className="list-group">
                {allUsers.map((item) =>
                    owner_id == item.id ? (
                        <div className="users" key={owner_id}>
                            <OwnerColumn
                                owner_name={item.name}
                                owner_email={item.email}
                            />
                        </div>
                    ) : (
                        <div className="users" key={item.id}>
                            <PlayersColumn
                                player_name={item.name}
                                player_email={item.email}
                                player_id={item.id}
                                isOwner={isOwner}
                                started={started}
                                finished={finished}
                                scores_sended={scores_sended}
                            />
                        </div>
                    )
                )}
            </div>
        );
    }
}

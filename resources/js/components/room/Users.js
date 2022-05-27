import React, { Component } from "react";

export default class Users extends Component {
    render() {
        let { allUsers } = this.props;

        return (
            <div className="list-group">
                {allUsers.map((item) => (
                    <div className="users" key={item.id}>
                        <a
                            href="#"
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                        >
                            <img
                                src="https://cdn4.iconfinder.com/data/icons/symbols-vol-1-1/40/user-person-single-id-account-player-male-female-512.png"
                                width="32"
                                height="32"
                            ></img>
                            <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 className="mb-0">{item.name}</h6>
                                    <p className="mb-0 opacity-75">
                                        {item.email}
                                    </p>
                                </div>
                                <small className="opacity-50 text-nowrap">
                                    بازیکن
                                </small>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        );
    }
}

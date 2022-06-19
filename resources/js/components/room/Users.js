import React, { Component } from "react";

export default class Users extends Component {
    render() {
        let { allUsers, user_id, owner_id } = this.props;

        return (
            <div className="list-group">
                {allUsers.map((item) =>
                    owner_id == item.id ? (
                        <div className="users" key={item.id}>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                aria-current="true"
                            >
                                <img
                                    src="https://static.thenounproject.com/png/729479-200.png"
                                    width="42"
                                    height="42"
                                ></img>
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0">{item.name}</h6>
                                        <p className="mb-0 opacity-75">
                                            {item.email}
                                        </p>
                                    </div>
                                    <small className="opacity-60">
                                        سازنده اتاق
                                    </small>
                                </div>
                            </a>
                        </div>
                    ) : (
                        <div className="users" key={item.id}>
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
                    )
                )}
            </div>
        );
    }
}

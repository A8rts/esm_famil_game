import React, { Component } from "react";

export default class OwnerColumn extends Component {
    render() {
        let { owner_email, owner_name } = this.props;
        return (
            <form>
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
                            <h6 className="mb-0">{owner_name}</h6>
                            <p className="mb-0 opacity-75">{owner_email}</p>
                        </div>
                        <small className="opacity-60">سازنده اتاق</small>
                    </div>
                </a>
            </form>
        );
    }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FinalResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { final_results } = this.props;
        return (
            <div
                className="modal modal-alert position-static d-block py-5"
                role="dialog"
                id="modalChoice"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-3 shadow">
                        <button
                            type="button"
                            className="btn btn-danger px-4 gap-3 btn-lg"
                        >
                            <a
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                                href="/game"
                            >
                                بازگشت به صفحه اصلی
                            </a>
                        </button>
                        {final_results.map((item) => (
                            <div
                                key={item.id}
                                className="modal-body p-4 text-center"
                            >
                                <h2 className="mb-0">{item.name}</h2>
                                <br></br>
                                <strong className="mb-0">
                                    امتیاز : {item.score}
                                </strong>
                                <br></br>
                                <div
                                    style={{
                                        borderTop: "1px solid",
                                        marginTop: 20,
                                        marginLeft: 20,
                                        marginRight: 20,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

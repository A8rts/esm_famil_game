import axios from "axios";
import React, { Component } from "react";

export default class Result extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.sended == true) {
            axios.post("/api/finish", {
                user_id: this.props.user_id,
                room_key: this.props.room_key,
                esm: this.props.esm,
                famil: this.props.famil,
                ghaza: this.props.ghaza,
                miveh: this.props.miveh,
                mashin: this.props.mashin,
                ashia: this.props.ashia,
            });
        }
    }

    render() {
        let { answers, sended } = this.props;

        return (
            <main>
                {sended ? (
                    <div>
                        <div className="px-4 py-1 my-5 text-center">
                            <h1 className="display-5 fw-bold">وقت تمام</h1>
                            <div className="col-lg-6 mx-auto">
                                <h3 className="lead mb-4">نتایج بازی</h3>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4 gap-3"
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
                                </div>
                            </div>
                        </div>
                        <div>
                            {answers.map((item) => (
                                <div className="list-group w-auto" key={item}>
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                        aria-current="true"
                                    >
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h6 className="mb-0">{item}</h6>
                                                <p className="mb-0 opacity-75">
                                                    نتایج
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
                    </div>
                ) : (
                    <div>
                        <div className="px-4 py-1 my-5 text-center">
                            <h1 className="display-5 fw-bold">وقت تمام</h1>
                            <div className="col-lg-6 mx-auto">
                                <h3 className="lead mb-4">نتایج بازی</h3>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4 gap-3"
                                    >
                                        <a
                                            style={{
                                                color: "white",
                                                textDecoration: "none",
                                            }}
                                            href="/game"
                                        >
                                            ترک کردن اتاق
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {answers.map((item) => (
                                <div className="list-group w-auto" key={item}>
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                        aria-current="true"
                                    >
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h6 className="mb-0">{item}</h6>
                                                <p className="mb-0 opacity-75">
                                                    نتایج
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
                    </div>
                )}
            </main>
        );
    }
}

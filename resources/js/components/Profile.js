import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./layouts/Header";

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            email: "",
            name: "",
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios
            .get("/user/profile")
            .then((res) => {
                let id = res.data.id;
                let email = res.data.email;
                let name = res.data.name;

                this.setState({
                    id: id,
                    email: email,
                    name: name,
                    isLoading: false,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        let { id, email, name, isLoading } = this.state;
        return (
            <div>
                <Header />
                <div
                    className="modal modal-tour position-static d-block py-5"
                    role="dialog"
                    id="modalTour"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-body p-5">
                                <h2 className="fw-bold mb-0">اطلاعات شما</h2>

                                <ul className="d-grid gap-4 my-5 list-unstyled">
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-0">نام</h5>
                                            {isLoading ? (
                                                <p>در حال بارگذاری ...</p>
                                            ) : (
                                                name
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-0">ایمیل</h5>
                                            {isLoading ? (
                                                <p>در حال بارگذاری ...</p>
                                            ) : (
                                                email
                                            )}
                                        </div>
                                    </li>
                                    <li className="d-flex gap-4">
                                        <div>
                                            <h5 className="mb-0">آیدی</h5>
                                            {isLoading ? (
                                                <p>در حال بارگذاری ...</p>
                                            ) : (
                                                id
                                            )}
                                        </div>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary mt-5 w-100"
                                    data-bs-dismiss="modal"
                                >
                                    <Link
                                        to="/game"
                                        style={{ color: "white" }}
                                        className="nav nav-link"
                                    >
                                        رفتن به صفحه اصلی
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;

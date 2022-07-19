import axios from "axios";
import React, { Component } from "react";
import "./Profile.css";

export default class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
        };
    }

    chnageData = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateProfile = (e) => {
        e.preventDefault();

        axios
            .post("/api/update_user_profile", {
                name: this.state.name,
                email: this.state.email,
                id: this.props.id,
            })
            .then((res) => {
                console.log(res.data);
            });

        this.props.changeEdit();
    };

    render() {
        let { name, email } = this.props;
        return (
            <div className="card profile">
                <div className="edit-data">
                    <form onSubmit={this.updateProfile}>
                        <div className="edit-section">
                            <label>نام</label>
                            <input
                                className="edit-input"
                                placeholder={name}
                                name="name"
                                onChange={this.chnageData}
                                required
                            ></input>
                        </div>
                        <div className="edit-section mt-4">
                            <label>ایمیل</label>
                            <input
                                className="edit-input"
                                placeholder={email}
                                name="email"
                                onChange={this.chnageData}
                                required
                                type="email"
                            ></input>
                        </div>
                        <button
                            className=" mt-5 mb-3 submit-new-profile"
                            type="submit"
                        >
                            ثبت
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

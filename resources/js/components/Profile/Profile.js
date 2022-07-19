import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import EditProfile from "./EditProfile";
import "./Profile.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            id: 0,
            email: "",
            name: "",
            edit: false,
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

    changeEdit = () => {
        this.setState({ edit: false });

        Swal.fire({
            title: "ثبت شد!",
            text: "یه بار صفحه رو رفرش کن تا اعمال بشن",
            icon: "success",
            confirmButtonText: "رفرش شو",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/game/profile";
            }
        });
    };

    render() {
        let { id, email, name, isLoading, edit } = this.state;
        return (
            <main className="main">
                <Header direction="right" />
                <hr style={{ height: "2px", backgroundColor: "black" }}></hr>
                <br></br> <br></br>
                <br></br>
                {edit ? (
                    <EditProfile
                        name={name}
                        email={email}
                        id={id}
                        changeEdit={this.changeEdit.bind(this)}
                    />
                ) : (
                    <div className="card profile">
                        <div className="user-img mt-4">
                            <img
                                width="70"
                                height="70"
                                src="https://cdn-icons-png.flaticon.com/128/3237/3237472.png"
                            ></img>
                        </div>
                        <h1 className="welcome mt-4">
                            {isLoading ? <>در حال بارگذاری...</> : <>{name}</>}
                        </h1>
                        <br></br>

                        <strong className="data">
                            {isLoading ? (
                                <>در حال بارگذاری...</>
                            ) : (
                                <>آیدی : {id}</>
                            )}
                        </strong>
                        <br></br>
                        <strong className="data">
                            {isLoading ? (
                                <>در حال بارگذاری...</>
                            ) : (
                                <>ایمیل : {email}</>
                            )}
                        </strong>

                        <button
                            className="mt-5 mb-3 edit-profile"
                            onClick={() => this.setState({ edit: true })}
                        >
                            ویرایش پروفایل
                        </button>
                    </div>
                )}
                <br></br>
            </main>
        );
    }
}

export default Profile;

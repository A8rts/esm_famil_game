import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import "./Profile.css";

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
            <main className="main">
                <Header />
                <hr style={{ height: "2px", backgroundColor: "black" }}></hr>
                <br></br> <br></br>
                <br></br>
                <div className="card">
                    <h1 className="welcome mt-4">سلام {name} :)</h1>
                    <p className="title">
                        شما در این قسمت میتوانید پروفایل خود را ببینید
                    </p>

                    <div className="content mt-5">
                        <strong className="data">{isLoading ? (<>در حال بارگذاری...</>) : (<>نام : {name}</>)}</strong>
                        <br></br>
                        <br></br>
                        <strong className="data">{isLoading ? (<>در حال بارگذاری...</>) : (<>آیدی : {id}</>)}</strong>
                        <br></br>
                        <br></br>
                        <strong className="data">{isLoading ? (<>در حال بارگذاری...</>) : (<>ایمیل : {email}</>)}</strong>
                    </div>
                </div>
            </main>
        );
    }
}

export default Profile;

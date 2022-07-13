import React, { Component } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Header from "../layouts/Header";
import "./css/Home.css";
import Description from "./Description";

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            join_room_key: "",
            showCreateRoom: false,
            showJoinRoom: false,
        };
    }

    render() {
        let { showCreateRoom, showJoinRoom } = this.state;
        return (
            <main className="main-page">
                <div className="home">
                    <div className="bd-masthead mb-5">
                        <Header direction="right"/>
                        <hr
                            style={{ height: "2px", backgroundColor: "black" }}
                        ></hr>
                    </div>
                    <div className="game-emoji">
                        <div className="Introduction">
                            <strong>بازی اسم و فامیل</strong>
                            <h4 className="mt-4">
                                شما میتوانید با استفاده از دکمه های زیر , اتاقی
                                ایجاد یا به اتاقی بپیوندید
                            </h4>
                            <h4>موفق باشید :)</h4>
                        </div>
                        <div className="all-icon">
                            <div className="icon">
                                <p>&#127918;</p>
                                <p>&#129669;</p>
                            </div>
                            <div className="icon">
                                <p>&#128377;&#65039;</p>
                                <p>&#127922;</p>
                            </div>
                        </div>
                    </div>
                    <div className="operation mt-5">
                        <div className="buttons">
                            {showCreateRoom == true && showJoinRoom == false ? (
                                <CreateRoom />
                            ) : showCreateRoom == false &&
                              showJoinRoom == true ? (
                                <JoinRoom />
                            ) : (
                                <></>
                            )}
                            <button
                                className="create-button"
                                onClick={() =>
                                    this.setState({
                                        showCreateRoom: true,
                                        showJoinRoom: false,
                                    })
                                }
                            >
                                ساخت اتاق
                            </button>
                            <button
                                className="join-button"
                                onClick={() =>
                                    this.setState({
                                        showJoinRoom: true,
                                        showCreateRoom: false,
                                    })
                                }
                            >
                                پیوستن به اتاق
                            </button>
                        </div>
                    </div>
                    <strong className="text-mianpage">
                        توضیحات را مطالعه کنید :)
                    </strong>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>

                <Description />
            </main>
        );
    }
}

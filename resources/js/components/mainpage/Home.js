import React, { Component } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Header from "../layouts/Header";
export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            join_room_key: "",
        };
    }

    render() {
        return (
            <main>
                <div className="bd-masthead mb-5">
                    <Header />
                </div>
                <div className="bd-masthead">
                    <div>
                        <main className="container">
                            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                                <div className="col-md-6 px-0">
                                    <h1 className="display-4 ">
                                        بازی اسم و فامیل
                                    </h1>
                                    <p className="lead my-3">
                                        شما میتوانید در زیر اتاق خودتان را برای
                                        بازی ایجاد کنید و میتوانید به اتاق
                                        دوستتان بپیوندید
                                    </p>
                                    <p className="lead mb-0">
                                        <a>موفق باشید</a>
                                    </p>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-md-6">
                                    <CreateRoom />
                                </div>
                                <JoinRoom />
                            </div>
                        </main>
                    </div>
                </div>
            </main>
        );
    }
}

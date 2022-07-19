import React, { Component } from "react";
import "./Notdoun.css";

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <div className="notfound-data">
                    <img
                        className="notfound-icon"
                        src="https://cdn-icons-png.flaticon.com/512/4923/4923794.png"
                    ></img>
                    <strong>
                        فکر کنم راحتان را گم کردید؟ همچین صفحه ای وجود ندارد
                        {"  "}
                        <a href="/game">خانه</a>
                    </strong>
                </div>
            </div>
        );
    }
}

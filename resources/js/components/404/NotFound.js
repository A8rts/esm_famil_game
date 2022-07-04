import React, { Component } from "react";
import "./Notdoun.css";

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <div className="nofound-content">
                    <span className="notfound-icon">&#10060;</span>
                    <strong className="notfound-num">404</strong>
                    <span className="notfound-icon">&#10060;</span>
                </div>
                <div className="notfound-text">
                    <h3>صفحه مورد نظر پیدا نشد !</h3>
                </div>
            </div>
        );
    }
}

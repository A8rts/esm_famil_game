import React, { Component } from "react";
import "./Loading.css";
import Spinner from "react-spinkit";

export default class Loading extends Component {
    render() {
        return (
            <div className="Loading" style={{ textAlign: "center" }}>
                <header className="Loading-header">
                    <h1>کمی صبر کنید</h1>
                    <Spinner
                        name="chasing-dots"
                        style={{ width: 100, height: 100 }}
                    />
                </header>
            </div>
        );
    }
}

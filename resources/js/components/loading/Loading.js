import React, { Component } from "react";
import "./Loading.css";
import Spinner from "react-spinkit";

export default class Loading extends Component {
    render() {
        return (
            <div
                className="Loading"
                style={{
                    textAlign: "center",
                    background: "linear-gradient(to right, #aa076b, #61045f)",
                    minHeight: "100vh",
                }}
            >
                <header className="Loading-header">
                    <Spinner
                        name="chasing-dots"
                        style={{ width: 100, height: 100, color: "white" }}
                    />
                </header>
            </div>
        );
    }
}

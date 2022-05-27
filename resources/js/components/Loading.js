import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        let LoadingStyle = {
            minHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
        };

        return (
            <div className="Loading" style={{ textAlign: "center" }}>
                <header className="Loading-header" style={LoadingStyle}>
                    <h1>لطفا کمی صبر کنید...</h1>
                </header>
            </div>
        );
    }
}

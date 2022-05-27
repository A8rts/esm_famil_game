import React, { Component } from "react";

export default class NotFound extends Component {
    render() {
        let LoadingStyle = {
            minHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        };
        return (
            <div>
                <div className="Loading" style={{ textAlign: "center" }}>
                    <header className="Loading-header" style={LoadingStyle}>
                        <h1 style={{color : 'red'}}>404</h1>
                        <h3 style={{color : 'red'}}>همچین صفحه ای وجود ندارد</h3>
                    </header>
                </div>
            </div>
        );
    }
}

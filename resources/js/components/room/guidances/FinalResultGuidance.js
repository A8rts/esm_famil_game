import React, { Component } from "react";
import "./Guidance.css";

class FinalResultGuidance extends Component {
    render() {
        return (
            <div className="start-guidance mt-4 mb-4 animate__animated animate__bounce">
                <div className="start-guidance-content">
                    <strong>راهنما</strong>
                    <br></br>
                    <p className="mt-3">
                        بازی دیگر الان تمام است و شما میتوانید نتیجه را ببینید.
                        کسی که بالای اسمش تاج دارد برنده این مسابقه هست!
                    </p>
                </div>
            </div>
        );
    }
}

export default FinalResultGuidance;

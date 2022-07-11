import React, { Component } from "react";
import "./Guidance.css";

class StartGuidance extends Component {
    render() {
        return (
            <div className="start-guidance mt-4 mb-4 animate__animated animate__bounce">
                <div className="start-guidance-content">
                    <strong>راهنما</strong>
                    <br></br>
                    <p className="mt-3">
                        خب ما در این صفحه لیست کاربران را داریم هر کاربری که عضو
                        این اتاق باشد اسمش در لیست کاربران هست . در یک بخش دیگر
                        کلید اتاق امده است که با اشتراک گذاشتن ان به دوستان خود
                        میتوانید ان ها را هم عضو این اتاق کنید. اگر سازنده اتاق
                        باشید دکمه ی شروع را در بخش کلید اتاق دارید و میتوانید
                        بازی را شروع کنید در غیر این صورت باید منتظر بمانید تا
                        سازنده اتاق بازی را شروع کند. هر وقت در هر صفحه ای از
                        بازی سوالی داشتید یا نمیدانستید چه کنید روی علامت سوال
                        مانند بالا کلیک کنید.
                    </p>
                </div>
            </div>
        );
    }
}

export default StartGuidance;

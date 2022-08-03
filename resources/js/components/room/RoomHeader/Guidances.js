import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class Guidances extends Component {
    showGuidance = () => {
        let props = this.props;

        if (props.show_final_result == true) {
            Swal.fire({
                title: "راهنما",
                text: "بازی الان تمام شده است! شما میتوانید در زیر نتایج این بازی را ببینید! موفق باشد.",
                background: "linear-gradient(to right, #ec008c, #fc6767)",
                color: "white",
                confirmButtonText: "باشه",
                confirmButtonColor: "#16a085",
            });
        } else if (props.started == true) {
            Swal.fire({
                title: "راهنما",
                text:
                    "خب بازی شروع شده! شما باید با حرف " +
                    "( " +
                    props.letter +
                    " )" +
                    " چند کلمه در فرم بنویسید و زمانی که تمام کردید روی دکمه تمام بزنید!",
                background: "linear-gradient(to right, #ec008c, #fc6767)",
                color: "white",
                confirmButtonText: "باشه",
                confirmButtonColor: "#16a085",
            });
        } else if (props.finished == true) {
            Swal.fire({
                title: "راهنما",
                text:
                    " خب نحوه ماتیاز دادن طوری است که وقتی میخواهین به یک کلمه حریفتان برا مثال (اسم) امتیاز بدهید سه دکمه برای امتیاز دهی وجود دارد. یکی از آن ها برابر است با اسم : 0 یعنی به اسم آن بازیکن امتیاز صفر را میدهید و همینجور برای بقیه کلمات میتوانید امتیاز های 0 و 5 و 10 را بدهید" +
                    " (اگر سازنده اتاق باشید زمانی که امتیاز دهی همه تمام شد میتوانید بازی را دوباره شروع یا نتیجه نهایی رو ارسال کنید و اگر بازیکن باشید باید صبر کنید تا همه امتیاز هایشان را بدهند و سازنده اتاق عملیاتی رو انجام بدهد) ",
                background: "linear-gradient(to right, #ec008c, #fc6767)",
                color: "white",
                confirmButtonText: "باشه",
                width: "600",
                confirmButtonColor: "#16a085",
            });
        } else {
            Swal.fire({
                title: "راهنما",
                text: "در این صفحه شما میتوانید همه بازیکن ها در این اتاق را مشاهده کنید! اگر سازنده اتاق هستید میتوانید با استفاده از دکمه شروع بازی در بالا بازی را شروع کنید.",
                background: "linear-gradient(to right, #ec008c, #fc6767)",
                color: "white",
                confirmButtonText: "باشه",
                confirmButtonColor: "#16a085",
            });
        }
    };

    render() {
        return (
            <div className="guidance">
                <svg
                    onClick={this.showGuidance}
                    className="guidance-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                    />
                </svg>
            </div>
        );
    }
}

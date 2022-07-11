import React, { Component } from "react";
import "./Guidance.css";

class FormGuidance extends Component {
    render() {
        let { letter } = this.props;
        return (
            <div className="start-guidance mt-4 mb-4 animate__animated animate__bounce">
                <div className="start-guidance-content">
                    <strong>راهنما</strong>
                    <br></br>
                    <p className="mt-3">
                        خب این قسمت اصلی ترین قسمت بازی است , شما فرمی را دارید
                        که باید بر اساس حرف ({letter}) کلمات را بنویسید یعنی
                        اولین حرف آن کلمه با حرف ({letter}) یکی باشد. زمانی که
                        فرم را تکمیل کردید روی دکمه تمام بزنید تا بازی برای همه
                        بازیکن ها متوقف شود و وارد بخش امتیاز دهی شوید.
                    </p>
                </div>
            </div>
        );
    }
}

export default FormGuidance;

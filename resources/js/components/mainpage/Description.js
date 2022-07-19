import React, { Component } from "react";
import "./css/Description.css";

export default class Description extends Component {
    render() {
        return (
            <div className="container px-4 py-5 text-center" id="featured-3">
                <h2 className="pb-2 border-bottom">توضیحات</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div className="mb-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1256/1256650.png"
                                width="50"
                                height="50"
                            ></img>
                        </div>
                        <h2>آنلاین و چند نفره</h2>
                        <p>
                            شما میتوانید آنلاین با دوستان خود بازی کنید, هیچ
                            محدودیتی برا حداکثر افراد وجود ندارد و میتوانید با
                            تعداد زیادی از کاربران بازی کنید
                        </p>
                    </div>
                    <div className="feature col">
                        <div className="mb-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1599/1599828.png"
                                width="50"
                                height="50"
                            ></img>
                        </div>
                        <h2> رقابت و حساب امتیاز</h2>
                        <p>
                            شما میتوامدی بعد از هر دستی که بازی میکنید به حریفان
                            خود امتیاز بدید و نتیجه ی نهایی را هر وقت که سازنده
                            اتاق بازی را تمام کرد ببینید
                        </p>
                    </div>
                    <div className="feature col">
                        <div className="mb-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/3240/3240831.png"
                                width="50"
                                height="50"
                            ></img>
                        </div>
                        <h2>نحوه بازی کردن</h2>
                        <p>
                            اگر در اتاق نمیدانستید چگونه باید بازی کنید روی دکمه
                            ای که علامت سوال دارد کلیک کنید
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { Component } from "react";
import "./css/Description.css";

export default class Description extends Component {
    render() {
        return (
            <div className="container px-4 py-5 text-center" id="featured-3">
                <h2 className="pb-2 border-bottom">توضیحات</h2>
                <div className="row g-4 py-3 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div className="mb-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/3240/3240831.png"
                                width="50"
                                height="50"
                            ></img>
                        </div>
                        <h2>الان باید چیکار کنم؟</h2>
                        <p>
                            شما در این صفحه میتوانید یک اتاق ایجاد کنید یا به یک
                            اتاقی بپیوندید. اگر اتاقی ایجاد کنید خب کلید آن اتاق
                            را به دوستان خود میدهید و آن ها میتوانند به اتاق شما
                            بپیوندند ولی اگر میخواهید به اتاقی بپیوندید با
                            استفاده از دکمه پیوستن به اتاق کلید اتاق را وارد
                            میکنید و به آن اتاق جوین میشوید. اگر در اتاق هم
                            سوالی داشتید یا نمیدانستید چیکار کنید روی دکمه ای که
                            علامت سوال دارد بزنید
                        </p>
                    </div>
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
                </div>
            </div>
        );
    }
}

import React, { Component } from "react";
import "./css/Description.css";

export default class Description extends Component {
    render() {
        return (
            <div className="container px-4 py-5 text-center" id="featured-3">
                <h2 className="pb-2 border-bottom">توضیحات</h2>
                <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                    <div className="feature col">
                        <div className="rounded feature-icon d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white fs-2 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="currentColor"
                                className="bi bi-people-fill description-icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                                />
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                            </svg>
                        </div>
                        <h2>آنلاین و چند نفره</h2>
                        <p>
                            شما میتوانید آنلاین با دوستان خود بازی کنید, هیچ
                            محدودیتی برا حداکثر افراد وجود ندارد و میتوانید با
                            تعداد زیادی از کاربران بازی کنید
                        </p>
                    </div>
                    <div className="feature col">
                        <div className="rounded feature-icon d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white fs-2 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="currentColor"
                                className="bi bi-trophy-fill description-icon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                            </svg>
                        </div>
                        <h2> رقابت و حساب امتیاز</h2>
                        <p>
                            شما میتوامدی بعد از هر دستی که بازی میکنید به حریفان
                            خود امتیاز بدید و نتیجه ی نهایی را هر وقت که سازنده
                            اتاق بازی را تمام کرد ببینید
                        </p>
                    </div>
                    <div className="feature col">
                        <div className=" rounded feature-icon d-inline-flex align-items-center justify-content-center bg-primary bg-gradient text-white fs-2 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="currentColor"
                                className="bi bi-body-text description-icon"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"
                                />
                            </svg>
                        </div>
                        <h2>توضیح راجب اتاق</h2>
                        <p>
                            فرم بازی دارای کلمات (اسم و فامیل و غذا و میوه و
                            ماشین و اشیا) میباشد. نحوه حساب امتیازات طوری هست که
                            هر امتیاز های بین 0 و 5 و 10 برای یک کلمه کاربر
                            تعدادشان بیشتر بود آن را حساب میکنیم
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

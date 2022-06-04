import React, { Component } from "react";

export default class Score extends Component {
    render() {
        let { id } = this.props;
        return (
            <form>
                امتیاز برای اسم
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="esm"
                        id={"esm1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"esm1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="esm"
                        id={"esm2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"esm2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="esm"
                        id={"esm3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"esm3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                امتیاز برای فامیل
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="famil"
                        id={"famil1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"famil1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="famil"
                        id={"famil2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"famil2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="famil"
                        id={"famil3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"famil3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                امتیاز برای غذا
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="ghaza"
                        id={"ghaza1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"ghaza1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="ghaza"
                        id={"ghaza2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"ghaza2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="ghaza"
                        id={"ghaza3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"ghaza3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                امتیاز برای میوه
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="miveh"
                        id={"miveh1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"miveh1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="miveh"
                        id={"miveh2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"miveh2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="miveh"
                        id={"miveh3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"miveh3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                امتیاز برای ماشین
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name="mashin"
                        id={"mashin1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"mashin1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="mashin"
                        id={"mashin2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"mashin2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="mashin"
                        id={"mashin3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"mashin3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                امتیاز برای اشیا
                <div
                    style={{
                        padding: "15px",
                    }}
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                >
                    <input
                        type="radio"
                        className="btn-check"
                        name={"ashia"}
                        id={"ashia1" + id}
                        autoComplete="off"
                        value="0"
                    ></input>
                    <label
                        className="btn btn-outline-danger"
                        htmlFor={"ashia1" + id}
                    >
                        0
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name={"ashia"}
                        id={"ashia2" + id}
                        autoComplete="off"
                        value="5"
                    ></input>
                    <label
                        className="btn btn-outline-warning"
                        htmlFor={"ashia2" + id}
                    >
                        5
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name={"ashia"}
                        id={"ashia3" + id}
                        autoComplete="off"
                        value="10"
                    ></input>
                    <label
                        className="btn btn-outline-success"
                        htmlFor={"ashia3" + id}
                    >
                        10
                    </label>
                </div>
                <br></br>
                <button className="btn btn-success btn-lg">ثبت</button>
            </form>
        );
    }
}

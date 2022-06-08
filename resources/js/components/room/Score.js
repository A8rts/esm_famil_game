import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: "loading",
        };
    }

    componentDidMount() {
        axios
            .post("/api/check_saved_score", {
                room_key: this.props.room_key,
                user_id: this.props.user_id,
                id: this.props.id,
                name: this.props.name,
                letter: this.props.letter,
            })
            .then((res) => {
                let scores = res.data;

                for (let i = 0; i < scores.length; i++) {
                    if (this.props.name == scores[i].name) {
                        this.setState({ show: false });
                    }
                }

                if (this.state.show !== false) {
                    this.setState({ show: true });
                }
            });
    }

    componentWillUnmount() {
        this.setState({show : false});
    }

    sendScore = (e) => {
        e.preventDefault();

        let props = this.props;

        if (
            this.scoreValidation(
                e.target.esm.value,
                e.target.famil.value,
                e.target.ghaza.value,
                e.target.miveh.value,
                e.target.mashin.value,
                e.target.ashia.value
            )
        ) {
            this.setState({ show: false });
            axios
                .post("/api/save_score", {
                    room_key: props.room_key,
                    from_id: props.user_id,
                    letter: props.letter,
                    name: props.name,
                    esm_score: e.target.esm.value,
                    famil_score: e.target.famil.value,
                    ghaza_score: e.target.ghaza.value,
                    miveh_score: e.target.miveh.value,
                    mashin_score: e.target.mashin.value,
                    ashia_score: e.target.ashia.value,
                })
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        }
    };

    scoreValidation = (
        esm_score,
        famil_score,
        ghaza_score,
        miveh_score,
        mashin_score,
        ashia_score
    ) => {
        if (
            esm_score !== "" &&
            famil_score !== "" &&
            ghaza_score !== "" &&
            famil_score !== "" &&
            miveh_score !== "" &&
            famil_score !== "" &&
            mashin_score !== "" &&
            ashia_score !== ""
        ) {
            return true;
        } else {
            Swal.fire({
                title: "لطفا به همه ی کلمات امتیاز بدهید",
                confirmButtonText: "باشه",
            });
            return false;
        }
    };

    render() {
        let { id } = this.props;
        let { show } = this.state;

        return (
            <main>
                {show == "loading" ? (
                    <strong>لطفا کمی صبر کنید...</strong>
                ) : show ? (
                    <form onSubmit={this.sendScore}>
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
                        <button className="btn btn-primary btn-lg">ثبت</button>
                    </form>
                ) : (
                    <div>
                        <br></br>
                        <strong>به این حریف امتیاز داده شده است</strong>
                    </div>
                )}
            </main>
        );
    }
}

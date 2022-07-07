import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Spinner from "react-spinkit";
import "./css/Score.css";

export default class Score extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: "loading",
            editOrCreate: "create",
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
        this.setState({ show: false });
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
            if (this.state.editOrCreate == "create") {
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
            } else if (this.state.editOrCreate == "edit") {
                axios
                    .post("/api/edit_scores", {
                        name: props.name,
                        letter: props.letter,
                        from_id: props.user_id,
                        esm_score: e.target.esm.value,
                        famil_score: e.target.famil.value,
                        ghaza_score: e.target.ghaza.value,
                        miveh_score: e.target.miveh.value,
                        mashin_score: e.target.mashin.value,
                        ashia_score: e.target.ashia.value,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });

                this.setState({ show: false });
            }
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

    editScores = () => {
        this.setState({ editOrCreate: "edit", show: true });
    };

    render() {
        let { id, name } = this.props;
        let { show } = this.state;

        return (
            <main className="main-score">
                {show == "loading" ? (
                    <div className="score-loading">
                        <Spinner
                            name="chasing-dots"
                            style={{ width: 70, height: 70, color: "white" }}
                        />
                    </div>
                ) : show ? (
                    <div>
                        <strong>به {name} امتیاز بدید</strong>
                        <form className="mt-3" onSubmit={this.sendScore}>
                            <div className="score">
                                <div className="score-buttons">
                                    <div
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
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"esm1" + id}
                                        >
                                            اسم : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="esm"
                                            id={"esm2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"esm2" + id}
                                        >
                                            اسم : 5
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
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"esm3" + id}
                                        >
                                            اسم: 10
                                        </label>
                                    </div>

                                    <div
                                        role="group"
                                        aria-label="Basic radio toggle button group"
                                    >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="famil"
                                            id={"famil1" + id}
                                            value="0"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"famil1" + id}
                                        >
                                            فامیل : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="famil"
                                            id={"famil2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"famil2" + id}
                                        >
                                            فامیل : 5
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="famil"
                                            id={"famil3" + id}
                                            value="10"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"famil3" + id}
                                        >
                                            فامیل : 10
                                        </label>
                                    </div>

                                    <div
                                        role="group"
                                        aria-label="Basic radio toggle button group"
                                    >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="ghaza"
                                            id={"ghaza1" + id}
                                            value="0"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"ghaza1" + id}
                                        >
                                            غذا : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="ghaza"
                                            id={"ghaza2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"ghaza2" + id}
                                        >
                                            غذا : 5
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
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"ghaza3" + id}
                                        >
                                            غذا: 10
                                        </label>
                                    </div>

                                    <div
                                        role="group"
                                        aria-label="Basic radio toggle button group"
                                    >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="miveh"
                                            id={"miveh1" + id}
                                            value="0"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"miveh1" + id}
                                        >
                                            میوه : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="miveh"
                                            id={"miveh2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"miveh2" + id}
                                        >
                                            میوه : 5
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="miveh"
                                            id={"miveh3" + id}
                                            value="10"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"miveh3" + id}
                                        >
                                            میوه : 10
                                        </label>
                                    </div>

                                    <div
                                        role="group"
                                        aria-label="Basic radio toggle button group"
                                    >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="mashin"
                                            id={"mashin1" + id}
                                            value="0"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"mashin1" + id}
                                        >
                                            ماشین : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="mashin"
                                            id={"mashin2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"mashin2" + id}
                                        >
                                            ماشین : 5
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="mashin"
                                            id={"mashin3" + id}
                                            value="10"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"mashin3" + id}
                                        >
                                            ماشین : 10
                                        </label>
                                    </div>

                                    <div
                                        role="group"
                                        aria-label="Basic radio toggle button group"
                                    >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="ashia"
                                            id={"ashia1" + id}
                                            value="0"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-danger score-button"
                                            htmlFor={"ashia1" + id}
                                        >
                                            اشیا : 0
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="ashia"
                                            id={"ashia2" + id}
                                            value="5"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-warning score-button"
                                            htmlFor={"ashia2" + id}
                                        >
                                            اشیا : 5
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="ashia"
                                            id={"ashia3" + id}
                                            value="10"
                                            autoComplete="off"
                                        ></input>
                                        <label
                                            className="btn btn-outline-success score-button"
                                            htmlFor={"ashia3" + id}
                                        >
                                            اشیا: 10
                                        </label>
                                    </div>
                                </div>
                                <button className="send-button mb-3 animate__animated animate__zoomIn">
                                    ثبت
                                </button>
                            </div>
                        </form>
                    </div>
                ) : this.props.show_finish_score_button ? (
                    <div className="edit-scores">
                        <div
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            <input
                                type="radio"
                                className="btn-check"
                                name="ashia"
                                id={"ashia1" + id}
                                value="0"
                                autoComplete="off"
                            ></input>
                            <label
                                className="btn btn-outline-danger edit-score-button"
                                htmlFor={"ashia1" + id}
                                onClick={this.editScores}
                            >
                                ویرایش امتیازات {name}
                            </label>
                        </div>
                    </div>
                ) : (
                    <strong>شما امتیازتان را تکمیل کردید</strong>
                )}
            </main>
        );
    }
}

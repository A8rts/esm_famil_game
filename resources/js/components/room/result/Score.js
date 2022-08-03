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
                    <div className="score-loading mb-2">
                        <Spinner
                            name="chasing-dots"
                            style={{ width: 60, height: 60, color: "white" }}
                        />
                    </div>
                ) : show ? (
                    <form
                        className="form-scores mt-3"
                        onSubmit={this.sendScore}
                    >
                        <div className="scores-buttons">
                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"esm1" + id}
                                        value="0"
                                        name="esm"
                                    />
                                    <label className="o" htmlFor={"esm1" + id}>
                                        اسم : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"esm2" + id}
                                        value="5"
                                        name="esm"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"esm2" + id}
                                    >
                                        اسم : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"esm3" + id}
                                        value="10"
                                        name="esm"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"esm3" + id}
                                    >
                                        اسم : 10
                                    </label>
                                </li>
                            </ul>

                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"famil1" + id}
                                        value="0"
                                        name="famil"
                                    />
                                    <label
                                        className="o"
                                        htmlFor={"famil1" + id}
                                    >
                                        فامیل : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"famil2" + id}
                                        value="5"
                                        name="famil"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"famil2" + id}
                                    >
                                        فامیل : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"famil3" + id}
                                        value="10"
                                        name="famil"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"famil3" + id}
                                    >
                                        فامیل : 10
                                    </label>
                                </li>
                            </ul>

                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"ghaza1" + id}
                                        value="0"
                                        name="ghaza"
                                    />
                                    <label
                                        className="o"
                                        htmlFor={"ghaza1" + id}
                                    >
                                        غذا : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"ghaza2" + id}
                                        value="5"
                                        name="ghaza"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"ghaza2" + id}
                                    >
                                        غذا : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"ghaza3" + id}
                                        value="10"
                                        name="ghaza"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"ghaza3" + id}
                                    >
                                        غذا : 10
                                    </label>
                                </li>
                            </ul>

                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"miveh1" + id}
                                        value="0"
                                        name="miveh"
                                    />
                                    <label
                                        className="o"
                                        htmlFor={"miveh1" + id}
                                    >
                                        میوه : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"miveh2" + id}
                                        value="5"
                                        name="miveh"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"miveh2" + id}
                                    >
                                        میوه : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"miveh3" + id}
                                        value="10"
                                        name="miveh"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"miveh3" + id}
                                    >
                                        میوه : 10
                                    </label>
                                </li>
                            </ul>

                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"mashin1" + id}
                                        value="0"
                                        name="mashin"
                                    />
                                    <label
                                        className="o"
                                        htmlFor={"mashin1" + id}
                                    >
                                        ماشین : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"mashin2" + id}
                                        value="5"
                                        name="mashin"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"mashin2" + id}
                                    >
                                        ماشین : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"mashin3" + id}
                                        value="10"
                                        name="mashin"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"mashin3" + id}
                                    >
                                        ماشین : 10
                                    </label>
                                </li>
                            </ul>

                            <ul className="scoring-buttons">
                                <li>
                                    <input
                                        type="radio"
                                        id={"ashia1" + id}
                                        value="0"
                                        name="ashia"
                                    />
                                    <label
                                        className="o"
                                        htmlFor={"ashia1" + id}
                                    >
                                        اشیا : 0
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"ashia2" + id}
                                        value="5"
                                        name="ashia"
                                    />
                                    <label
                                        className="five"
                                        htmlFor={"ashia2" + id}
                                    >
                                        اشیا : 5
                                    </label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id={"ashia3" + id}
                                        value="10"
                                        name="ashia"
                                    />
                                    <label
                                        className="ten"
                                        htmlFor={"ashia3" + id}
                                    >
                                        اشیا : 10
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <button
                            type="submit"
                            className="entry-button mt-2 mb-2"
                        >
                            ثبت
                        </button>
                    </form>
                ) : this.props.show_finish_score_button ? (
                    <div className="mt-4 mb-2">
                        <button
                            className="edit-scores"
                            onClick={this.editScores}
                        >
                            ویرایش امتیازات {name}
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 mb-2">
                        <button className="finished-scorings-button">
                            شما امتیاز دهی تان را تمام کردید!
                        </button>
                    </div>
                )}
            </main>
        );
    }
}

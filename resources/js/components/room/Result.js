import axios from "axios";
import React, { Component } from "react";
import Score from "./Score";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Spinner from "react-spinkit";

export default class Result extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show_finish_score_button: "loading",
        };
    }

    componentDidMount() {
        setTimeout(() => {
            axios
                .post("/api/get_users_scores", {
                    room_key: this.props.room_key,
                    letter: this.props.letter,
                    user_id: this.props.user_id,
                })
                .then((res) => {
                    if (res.data == false) {
                        this.setState({ show_finish_score_button: false });
                    } else if (res.data == true) {
                        this.setState({ show_finish_score_button: true });
                    }
                });
        }, 500);

        if (this.props.send == true) {
            let props = this.props;
            axios.post("/api/finish", {
                user_id: props.user_id,
                room_key: props.room_key,
                esm: props.esm,
                famil: props.famil,
                ghaza: props.ghaza,
                miveh: props.miveh,
                mashin: props.mashin,
                ashia: props.ashia,
                letter: props.letter,
            });
        }
    }

    scoresSended = () => {
        this.props.setShowRoomButtons();

        axios
            .post("/api/check_scores", {
                room_key: this.props.room_key,
                from_id: this.props.user_id,
                letter: this.props.letter,
            })
            .then((res) => {
                if (res.data.length == this.props.answers.length) {
                    this.setState({ show_finish_score_button: false });
                    axios
                        .post("/api/done_score", {
                            user_id: this.props.user_id,
                            room_key: this.props.room_key,
                            letter: this.props.letter,
                        })
                        .then((res) => console.log(res.data));
                } else {
                    Swal.fire({
                        title: "شما همه امتیاز هایتان را به حریفان خود ندادید!",
                        confirmButtonText: "الان میدم",
                    });
                }
            });
    };

    render() {
        let { answers, room_key, user_id, letter } = this.props;
        let { show_finish_score_button } = this.state;
        return (
            <main>
                {show_finish_score_button == "loading" ? (
                    <div className="modal-footer flex-column border-top-0">
                        <Spinner
                            name="chasing-dots"
                            style={{ width: 70, height: 70 }}
                        />
                    </div>
                ) : (
                    <div>
                        <div className="px-4 py-1 my-5 text-center">
                            <h1 className="display-5 fw-bold">وقت تمام</h1>
                            <div className="col-lg-6 mx-auto">
                                <h3 className="lead mb-4">
                                    نتایج بازی زمانی که به همه امتیاز دادین روی
                                    دکمه (من امتیاز هایم را دادم ) بزنید
                                </h3>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4 gap-3"
                                    >
                                        <a
                                            style={{
                                                color: "white",
                                                textDecoration: "none",
                                            }}
                                            href="/game"
                                        >
                                            بازگشت به صفحه اصلی
                                        </a>
                                    </button>
                                    <br></br>
                                    {show_finish_score_button ? (
                                        <button
                                            className="btn btn-success"
                                            onClick={this.scoresSended}
                                        >
                                            من امتیاز هایم را دادم
                                        </button>
                                    ) : (
                                        <button className="btn btn-dark">
                                            صبر برای بازی دوباره
                                        </button>
                                    )}
                                </div>
                                {answers.map((item) => (
                                    <div
                                        key={item.id}
                                        className="modal modal-sheet position-static d-block"
                                        role="dialog"
                                        id="modalSheet"
                                    >
                                        <div
                                            className="modal-dialog"
                                            role="document"
                                        >
                                            <div className="modal-content rounded-4 shadow">
                                                <div className="modal-header border-bottom-0">
                                                    <h5 className="modal-title">
                                                        {item.name}
                                                    </h5>
                                                </div>
                                                <div className="modal-body py-0">
                                                    <p>
                                                        اسم : {item.esm} , فامیل
                                                        :{item.famil} , غذا :
                                                        {item.ghaza} , میوه :
                                                        {item.miveh} , ماشین :
                                                        {item.mashin} , اشیا :
                                                        {item.ashia}
                                                    </p>
                                                </div>
                                                <div className="modal-footer flex-column border-top-0">
                                                    امتیاز بدهید
                                                    <br></br>
                                                    <Score
                                                        id={item.id}
                                                        name={item.name}
                                                        room_key={room_key}
                                                        user_id={user_id}
                                                        letter={letter}
                                                        show_finish_score_button={
                                                            show_finish_score_button
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

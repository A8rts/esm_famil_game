import axios from "axios";
import React, { Component } from "react";
import Score from "./Score";

export default class Result extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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

    render() {
        let { answers } = this.props;

        return (
            <main>
                <div>
                    <div className="px-4 py-1 my-5 text-center">
                        <h1 className="display-5 fw-bold">وقت تمام</h1>
                        <div className="col-lg-6 mx-auto">
                            <h3 className="lead mb-4">نتایج بازی</h3>
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
                                                    اسم : {item.esm} , فامیل :
                                                    {item.famil} , غذا :
                                                    {item.ghaza} , میوه :
                                                    {item.miveh} , ماشین :
                                                    {item.mashin} , اشیا :
                                                    {item.ashia}
                                                </p>
                                            </div>
                                            <div className="modal-footer flex-column border-top-0">
                                                به حریفان خود امتیاز بدهید
                                                <br></br>
                                                <Score id={item.id}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

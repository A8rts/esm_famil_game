import React, { Component } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default class SaveScores extends Component {
    componentDidMount() {
        Swal.fire({
            title: "امتیاز دهی بازیکنا تموم شد!",
            confirmButtonText: "ثبت همه ی امتیاز های بازیکنا",
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.callCompareAndSaveScores();
            } else {
                this.props.callCompareAndSaveScores();
            }
        });
    }

    render() {
        return <></>;
    }
}

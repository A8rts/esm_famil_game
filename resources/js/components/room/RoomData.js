import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Room from "./Room";

export default function RoomKey() {
    let { key } = useParams();
    const [owner, setOwner] = useState();
    const [userid, setUserid] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        axios
            .post("/api/room_data", {
                room_key: key,
            })
            .then((res) => {
                if (res.data == "error") {
                    Swal.fire({
                        icon: "error",
                        title: "خطا",
                        text: "چنین اتاقی وجود ندارد",
                        footer: "یا بازی آن شروع یا تمام شده است",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/game";
                        } else {
                            window.location.href = "/game";
                        }
                    });
                } else {
                    let owner = res.data;
                    setOwner(owner);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/user/profile")
            .then((res) => {
                setUserid(res.data.id);
                setUsername(res.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <Room
            room_key={key}
            owner_id={owner}
            user_id={userid}
            user_name={username}
        />
    );
}

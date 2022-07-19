import axios from "axios";
import React, { Component } from "react";
import "./BestPlayers.css";
import Header from "../layouts/Header";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "animate.css";
import Spinner from "react-spinkit";

export default class BestPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            best_players_data: [],
            last_player: "",
            name: "",
            uploadRate: 5,
            empty: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        this.mainWork();

        axios.get("/user/profile").then((res) => {
            let name = res.data.name;
            this.setState({ name: name });
        });
    }

    mainWork = () => {
        axios.post("/api/get_best_players").then((res) => {
            this.setState({ isLoading: true });

            this.findBestPlayers(res.data);

            this.setState({
                best_players_data: this.state.best_players_data.sort((a, b) =>
                    a.score > b.score ? -1 : 1
                ),
            });
            let num = 0;
            let good_best_player_data = [];

            for (let j = 0; j < this.state.best_players_data.length; j++) {
                num += 1;
                let data = { ...this.state.best_players_data[j], num };

                good_best_player_data.push(data);
            }

            this.setState({
                best_players_data: good_best_player_data,
                last_player: num,
            });

            this.setState({ isLoading: false });
        });
    };

    findBestPlayers = (best_players) => {
        for (let i = 0; i < best_players.length; i++) {
            if (best_players[i].type !== "game") {
                this.setState((prevState) => ({
                    best_players_data: [
                        ...prevState.best_players_data,
                        best_players[i],
                    ],
                }));
            }
        }

        if (this.state.best_players_data.length === 0) {
            this.setState({ empty: true });
        } else {
            this.setState({ empty: false });
        }
    };

    userHistory = () => {
        let my_data = [];

        for (let n = 0; n < this.state.best_players_data.length; n++) {
            if (this.state.name == this.state.best_players_data[n].name) {
                my_data.push(this.state.best_players_data[n]);
            }
        }

        if (!my_data.length) {
            Swal.fire({
                title: "شما تا به حال بازی ای نکردید!",
                showClass: {
                    popup: "animate__animated animate__bounceIn",
                },
                hideClass: {
                    popup: "animate__animated animate__bounceOut",
                },
                background:
                    "linear-gradient(to right, #8a2387, #e94057, #f27121)",
                color: "white",
                confirmButtonText: "باشه",
                confirmButtonColor: "#16a085",
            });
        } else {
            Swal.fire({
                title: my_data[0].name,
                text:
                    "امتیاز : " +
                    my_data[0].score +
                    " | " +
                    "نفره : " +
                    my_data[0].num,
                showClass: {
                    popup: "animate__animated animate__bounceIn",
                },
                hideClass: {
                    popup: "animate__animated animate__bounceOut",
                },
                background:
                    "linear-gradient(to right, #8a2387, #e94057, #f27121)",
                color: "white",
                confirmButtonText: "باشه",
                confirmButtonColor: "#16a085",
            });
        }
    };

    render() {
        let { best_players_data, isLoading } = this.state;
        return (
            <main className="king-main">
                <Header direction="bottom" />
                <hr style={{ height: "2px", backgroundColor: "white" }}></hr>

                {isLoading ? (
                    <div className="loading-best-players">
                        <Spinner
                            name="chasing-dots"
                            style={{ width: 80, height: 80, color: "white" }}
                        />
                    </div>
                ) : (
                    <div className="king-list-best mt-5">
                        <div className="best-player-icon">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/921/921347.png"
                                width="110"
                                height="110"
                            ></img>
                        </div>
                        <div className="best-player-text mb-4">
                            <strong>بهترین بازیکن ها</strong>
                        </div>
                        <div className="modal-content rounded-15 shadow list-best-player">
                            <button
                                type="button"
                                onClick={this.userHistory}
                                className="px-4 gap-3 how-many-score"
                            >
                                اوضاع من چطوره؟
                            </button>
                            {this.state.empty ? (
                                <div className="empty-data">
                                    <img
                                        width="100"
                                        height="100"
                                        src="https://pngimage.net/wp-content/uploads/2019/05/exclamation-mark-png-transparent-4.png"
                                    ></img>

                                    <strong>
                                        فعلا هیچ بازیکنی تا به حال بازی ای را به
                                        صورت کامل انجام نداده است
                                    </strong>
                                </div>
                            ) : (
                                best_players_data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="modal-body text-center best-player-content"
                                    >
                                        {item.num == 1 ? (
                                            <div>
                                                <img
                                                    className="medal-icon"
                                                    src="https://cdn-icons-png.flaticon.com/128/2583/2583381.png"
                                                ></img>
                                            </div>
                                        ) : item.num == 2 ? (
                                            <div>
                                                <img
                                                    className="medal-icon"
                                                    src="https://cdn-icons-png.flaticon.com/128/2583/2583350.png"
                                                ></img>
                                            </div>
                                        ) : item.num == 3 ? (
                                            <div>
                                                <img
                                                    className="medal-icon"
                                                    src="https://cdn-icons-png.flaticon.com/128/2583/2583448.png"
                                                ></img>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                        <strong className="best-player-name">
                                            {item.name}
                                        </strong>
                                        <div className="content-b">
                                            جمع کل امتیازات :
                                            <strong> {item.score}</strong>
                                            <p className="mt-3">
                                                نفر {item.num}
                                            </p>
                                        </div>
                                        {item.num !== this.state.last_player ? (
                                            <div
                                                style={{
                                                    borderTop: "1px solid",
                                                    marginTop: 20,
                                                    marginLeft: 20,
                                                    marginRight: 20,
                                                }}
                                            ></div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                ))
                            )}
                            <button
                                className="show-more"
                                onClick={() =>
                                    (window.location.href =
                                        "/game/best_players")
                                }
                            >
                                به انتها رسیدید :)
                            </button>
                        </div>
                        <br></br>
                    </div>
                )}
            </main>
        );
    }
}

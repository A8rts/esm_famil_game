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
                    <div className="best-players">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/5541/5541907.png"
                            className="best-players-icon mt-3"
                        ></img>
                        <strong className="best-players-txt mt-3">
                            بهترین بازیکن ها را ببینید
                        </strong>

                        <button
                            className="my-scores mt-2"
                            onClick={this.userHistory}
                        >
                            <strong>اوضاع من چطوره؟</strong>
                        </button>
                        <div className="best-players-box mt-4">
                            <div className="des-best-players-box mt-3 mb-3">
                                <strong>بهترین بازیکن ها را ببینید!</strong>
                            </div>
                            {best_players_data.length > 0 ? (
                                best_players_data.map((item) => (
                                    <div
                                        className="best-player-data mt-3 mb-3"
                                        key={item.id}
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

                                        <strong className="user-name-best-player mb-2">
                                            {item.name}
                                        </strong>
                                        <strong className="score-best-player">
                                            امتیاز : {item.score}
                                        </strong>
                                        <strong className="num-best-player ">
                                            نفره {item.num}
                                        </strong>
                                    </div>
                                ))
                            ) : (
                                <strong className="eny-public-rooms mb-2">
                                    فعلا هیچ کسی بازی ای نکرده است!
                                </strong>
                            )}
                        </div>
                        <br></br>
                    </div>
                )}
            </main>
        );
    }
}

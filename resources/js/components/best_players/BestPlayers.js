import axios from "axios";
import React, { Component } from "react";
import "./BestPlayers.css";
import Header from "../layouts/Header";

export default class BestPlayers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            best_players_data: [],
        };
    }

    componentDidMount() {
        axios.post("/api/get_best_players").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].type !== "game") {
                    this.setState((prevState) => ({
                        best_players_data: [
                            ...prevState.best_players_data,
                            res.data[i],
                        ],
                    }));
                }
            }

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

            this.setState({ best_players_data: good_best_player_data });
        });
    }

    render() {
        let { best_players_data } = this.state;
        return (
            <main className="king-main">
                <Header direction="bottom" />
                <hr style={{ height: "2px", backgroundColor: "white" }}></hr>

                <div className="king-list-best mt-5">
                    <div className="modal-content rounded-15 shadow list-best-player">
                        <button
                            type="button"
                            className="px-4 gap-3 how-many-score"
                        >
                            <a
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                                href="/game"
                            >
                                من چقدر امتیاز دارم؟
                            </a>
                        </button>
                        {best_players_data.map((item) => (
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
                                    <p className="mt-3">نفر {item.num}</p>
                                </div>
                                <div
                                    style={{
                                        borderTop: "1px solid",
                                        marginTop: 20,
                                        marginLeft: 20,
                                        marginRight: 20,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }
}

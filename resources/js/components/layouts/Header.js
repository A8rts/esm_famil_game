import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends Component {
    render() {
        let { direction } = this.props;
        return (
            <main>
                <div
                    className="header"
                    style={
                        direction == "right"
                            ? {
                                  background:
                                      "linear-gradient(to right, #03001e, #7303c0, #ec38bc);",
                              }
                            : {
                                  background:
                                      "linear-gradient(to bottom, #03001e, #7303c0, #ec38bc);",
                              }
                    }
                >
                    <p className="game-icon">🎮</p>
                    <div className="header-center">
                        <Link to="/game">خانه</Link>
                        <Link to="/game/profile">پروفایل شما</Link>
                        <Link to="/game/best_players">
                            لیست بهترین بازیکن ها
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

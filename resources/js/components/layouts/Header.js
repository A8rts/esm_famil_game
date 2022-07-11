import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
    <main>
        <div className="header">
            <p className="game-icon">🎮</p>
            <div className="header-center">
                <Link to="/game">خانه</Link>
                <Link to="/game/profile">پروفایل شما</Link>
                <Link to="/game/best_players">لیست بهترین بازیکن ها</Link>
            </div>
        </div>
    </main>
);

export default Header;

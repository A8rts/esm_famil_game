import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./mainpage/Home";
import Profile from "./Profile/Profile";
import Loading from "./loading/Loading";
import NotFound from "./404/NotFound";
import BestPlayers from "./best_players/BestPlayers";

const RoomData = React.lazy(() => import("./room/RoomData"));

class Game extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route exact path="/game" element={<Home />} />
                        <Route path="/game/profile" element={<Profile />} />
                        <Route path="/game/loading" element={<Loading />} />
                        <Route
                            path="/game/room/:key"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <RoomData />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/game/best_players"
                            element={<BestPlayers />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("game"));

import React, { Component, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./mainpage/Home";
import Profile from "./Profile";
import Loading from "./Loading";
import NotFound from "./NotFound";

const RoomData = lazy(() => import("./room/RoomData"));

class Game extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route exact path="/game" element={<Home />} />
                        <Route path="/game/profile" element={<Profile />} />
                        <Route
                            path="/game/room/:key"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <RoomData />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("game"));

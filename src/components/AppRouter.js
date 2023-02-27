import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

function AppRouter({isLoggedIn}) {
    return(
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home/>}/>
                    </>
                    ) : (
                    <Route path="/" element={<Auth/>}/>
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;
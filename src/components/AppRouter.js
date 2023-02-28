import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";

function AppRouter({ isLoggedIn }) {
	return (
		<Router>
			{isLoggedIn && <Navigation />}
			<Routes>
				{isLoggedIn ? (
					<>
						<Route path="/" element={<Home />} />
						<Route path="/profile" element={<Profile />} />
					</>
				) : (
					<Route path="/" element={<Auth />} />
				)}
			</Routes>
		</Router>
	);
}

export default AppRouter;

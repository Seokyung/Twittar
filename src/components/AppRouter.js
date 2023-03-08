import React from "react";
import {
	HashRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "routes/Profile";

function AppRouter({ isLoggedIn, userObj, refreshUser }) {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<div className="routeContainer">
				<Routes>
					{isLoggedIn ? (
						<>
							<Route exact path="/" element={<Home userObj={userObj} />} />
							<Route
								exact
								path="/profile"
								element={
									<Profile userObj={userObj} refreshUser={refreshUser} />
								}
							/>
							<Route path="*" element={<Navigate to="/" />} />
						</>
					) : (
						<>
							<Route exact path="/" element={<Auth />} />
							<Route path="*" element={<Navigate to="/" />} />
						</>
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default AppRouter;

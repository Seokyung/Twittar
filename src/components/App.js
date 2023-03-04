import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj(user);
				if (authService.currentUser.displayName === null) {
					authService.currentUser.displayName =
						authService.currentUser.email.split("@")[0];
				}
				if (authService.currentUser.photoURL === null) {
					authService.currentUser.photoURL =
						"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png";
				}
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
			) : (
				"Initializing..."
			)}
			<footer>&copy; {new Date().getFullYear()} twittar</footer>
		</>
	);
}

export default App;

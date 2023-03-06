import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { authService } from "fbase";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObj({
					uid: user.uid,
					displayName: user.displayName
						? user.displayName
						: user.email.split("@")[0],
					photoURL: user.photoURL
						? user.photoURL
						: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
					updateProfile: (args) => user.updateProfile(args),
				});
			} else {
				setUserObj(null);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			uid: user.uid,
			displayName: user.displayName
				? user.displayName
				: user.email.split("@")[0],
			photoURL: user.photoURL
				? user.photoURL
				: "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
			updateProfile: (args) => user.updateProfile(args),
		});
	};

	return (
		<>
			<div className="appContainer">
				{init ? (
					<AppRouter
						isLoggedIn={Boolean(userObj)}
						userObj={userObj}
						refreshUser={refreshUser}
					/>
				) : (
					"Initializing..."
				)}
			</div>
			<footer>&copy; {new Date().getFullYear()} twittar</footer>
		</>
	);
}

export default App;

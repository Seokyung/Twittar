import React, { useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	GithubAuthProvider,
	signInWithPopup,
} from "firebase/auth";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(false);

	const onEmailOrPasswordChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onLoginOrSignInClick = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			if (newAccount) {
				await createUserWithEmailAndPassword(auth, email, password);
			} else {
				await signInWithEmailAndPassword(auth, email, password);
			}
		} catch (error) {
			alert(error.message);
			console.log(error);
		}
	};

	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	const onSocialClick = async (e) => {
		const auth = getAuth();
		const {
			target: { name },
		} = e;
		let provider;
		if (name === "google") {
			provider = new GoogleAuthProvider();
		} else if (name === "github") {
			provider = new GithubAuthProvider();
		}
		await signInWithPopup(auth, provider);
	};

	return (
		<div>
			<form onSubmit={onLoginOrSignInClick}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onEmailOrPasswordChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onEmailOrPasswordChange}
				/>
				<input
					type="submit"
					value={newAccount ? "Create New Account" : "Log In"}
				/>
			</form>
			<button onClick={toggleAccount}>
				{newAccount ? "Log In" : "Create New Account"}
			</button>
			<div>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</div>
		</div>
	);
}

export default Auth;

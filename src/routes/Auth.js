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
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		let data;
		try {
			if (newAccount) {
				//create new account
				data = await createUserWithEmailAndPassword(auth, email, password);
			} else {
				//log in
				data = await signInWithEmailAndPassword(auth, email, password);
			}
			console.log("Email account: " + data);
		} catch (error) {
			setError(error.message);
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
		const data = await signInWithPopup(auth, provider);
		console.log("Social account: " + data);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onChange}
				/>
				<input
					type="submit"
					value={newAccount ? "Create New Account" : "Log In"}
				/>
				{error}
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

import React, { useState } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(false);
	const [error, setError] = useState("");

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
			setError(error.message);
		}
	};

	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
	};

	return (
		<>
			<form onSubmit={onLoginOrSignInClick} className="container">
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onEmailOrPasswordChange}
					className="authInput"
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onEmailOrPasswordChange}
					className="authInput"
				/>
				<input
					type="submit"
					value={newAccount ? "Create New Account" : "Log In"}
					className="authInput authSubmit"
				/>
				{error && <span className="authError">{error}</span>}
			</form>
			<span onClick={toggleAccount} className="authSwitch">
				{newAccount ? "Log In" : "Create New Account"}
			</span>
		</>
	);
}

export default AuthForm;

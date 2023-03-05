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
		</div>
	);
}

export default AuthForm;

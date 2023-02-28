import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
	const auth = getAuth();
	const navigate = useNavigate();

	const onLogoutClick = () => {
		signOut(auth);
		navigate("/", { replace: true });
	};

	return <button onClick={onLogoutClick}>Log Out</button>;
}

export default Profile;

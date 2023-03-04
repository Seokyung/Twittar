import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

function Profile({ userObj }) {
	const auth = getAuth();
	const navigate = useNavigate();

	const onLogoutClick = () => {
		signOut(auth)
			.then()
			.catch((error) => {
				alert(error.message);
			});
		navigate("/", { replace: true });
	};

	const getMyTwitts = async () => {
		const q = query(
			collection(dbService, "twitts"),
			where("creatorId", "==", `${userObj.uid}`),
			orderBy("createdAt", "desc")
		);
		const twitts = await getDocs(q);
		twitts.forEach((doc) => {
			console.log(doc.id, " => ", doc.data());
		});
	};

	useEffect(() => {
		getMyTwitts();
	}, []);

	return <button onClick={onLogoutClick}>Log Out</button>;
}

export default Profile;

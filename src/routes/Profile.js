import React, { useEffect, useCallback, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import {
	collection,
	query,
	onSnapshot,
	where,
	orderBy,
} from "firebase/firestore";
import Twitt from "components/Twitt";

function Profile({ userObj }) {
	const auth = getAuth();
	const navigate = useNavigate();
	const [myTwitts, setMyTwitts] = useState([]);
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

	const onLogoutClick = () => {
		signOut(auth)
			.then()
			.catch((error) => {
				alert(error.message);
			});
		navigate("/", { replace: true });
	};

	const getMyTwitts = useCallback(async () => {
		const q = query(
			collection(dbService, "twitts"),
			where("creatorId", "==", `${userObj.uid}`),
			orderBy("createdAt", "desc")
		);
		onSnapshot(q, (snapshot) => {
			const twittArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setMyTwitts(twittArray);
		});
	}, [userObj]);

	useEffect(() => {
		getMyTwitts();
	}, [getMyTwitts]);

	const onDisplayNameChange = (e) => {
		const {
			target: { value },
		} = e;
		setNewDisplayName(value);
	};

	const onUpdateProfileClick = async (e) => {
		e.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await updateProfile(auth.currentUser, {
				displayName: newDisplayName,
			});
		}
	};

	return (
		<div>
			<form onSubmit={onUpdateProfileClick}>
				<input
					type="text"
					value={newDisplayName}
					onChange={onDisplayNameChange}
					placeholder="User Name"
				/>
				<input type="submit" value="Update Profile" />
			</form>
			<div>
				{myTwitts.map((twitt) => (
					<Twitt
						key={twitt.id}
						twittObj={twitt}
						isOwner={twitt.creatorId === userObj.uid}
					/>
				))}
			</div>
			<div>
				<button onClick={onLogoutClick}>Log Out</button>
			</div>
		</div>
	);
}

export default Profile;

import React, { useEffect, useCallback, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fbase";
import {
	collection,
	query,
	onSnapshot,
	where,
	orderBy,
} from "firebase/firestore";
import Twitt from "components/Twitt";

function Profile({ userObj, refreshUser }) {
	const navigate = useNavigate();
	const [myTwitts, setMyTwitts] = useState([]);
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

	const onLogoutClick = () => {
		signOut(authService)
			.then()
			.catch((error) => {
				alert(error.message);
			});
		navigate(`${process.env.PUBLIC_URL}/`, { replace: true });
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
			await updateProfile(authService.currentUser, {
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};

	return (
		<div className="container">
			<form onSubmit={onUpdateProfileClick} className="profileForm">
				<div className="profileContainer">
					<img
						src={userObj.photoURL}
						alt="userProfile"
						width="30px"
						height="30px"
						className="profileImg"
					/>
					<input
						type="text"
						value={newDisplayName}
						onChange={onDisplayNameChange}
						placeholder="User Name"
						className="profileInput"
					/>
				</div>
				<input type="submit" value="Update Profile" className="formBtn" />
				<span onClick={onLogoutClick} className="formBtn cancelBtn">
					Log Out
				</span>
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
		</div>
	);
}

export default Profile;

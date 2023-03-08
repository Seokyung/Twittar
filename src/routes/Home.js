import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Twitt from "components/Twitt";
import InputTwitt from "components/InputTwitt";

function Home({ userObj }) {
	const [twitts, setTwitts] = useState([]);

	useEffect(() => {
		const q = query(
			collection(dbService, "twitts"),
			orderBy("createdAt", "desc")
		);
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const twittArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTwitts(twittArray);
		});
		onAuthStateChanged(authService, (user) => {
			if (user === null) {
				unsubscribe();
			}
		});
	}, []);

	return (
		<div className="container">
			<InputTwitt userObj={userObj} />
			<div className="twittsContainer">
				{twitts.map((twitt) => (
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

export default Home;

import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
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
		onSnapshot(q, (snapshot) => {
			const twittArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTwitts(twittArray);
		});
	}, []);

	return (
		<div>
			<InputTwitt userObj={userObj} />
			<div>
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

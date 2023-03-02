import React, { useEffect, useRef, useState } from "react";
import { dbService } from "fbase";
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
} from "firebase/firestore";
import Twitt from "components/Twitt";

function Home({ userObj }) {
	const [twitt, setTwitt] = useState("");
	const [twitts, setTwitts] = useState([]);
	const twittFocus = useRef(null);

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
		twittFocus.current.focus();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(dbService, "twitts"), {
				text: twitt,
				createdAt: Date.now(),
				creatorId: userObj.uid,
			});
		} catch (error) {
			alert(error.message);
			console.log(error);
		}
		setTwitt("");
		twittFocus.current.focus();
	};

	const onChange = (e) => {
		const {
			target: { value },
		} = e;
		setTwitt(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					ref={twittFocus}
					value={twitt}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={200}
				/>
				<input type="submit" value="twitt" />
			</form>
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

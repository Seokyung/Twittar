import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
	collection,
	addDoc,
	query,
	onSnapshot,
	orderBy,
} from "firebase/firestore";

function Home({ userObj }) {
	const [twitt, setTwitt] = useState("");
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

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(dbService, "twitts"), {
				text: twitt,
				createdAt: Date.now(),
				creatorId: userObj.uid,
			});
		} catch (error) {
			alert(error);
			console.log("Error adding document");
		}
		setTwitt("");
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
					<div key={twitt.id}>
						<h4>{twitt.text}</h4>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;

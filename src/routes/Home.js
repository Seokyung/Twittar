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
	const [attachment, setAttachment] = useState();

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

	const onTwittClick = async (e) => {
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

	const onTwittChange = (e) => {
		const {
			target: { value },
		} = e;
		setTwitt(value);
	};

	const onFileChange = (e) => {
		const {
			target: { files },
		} = e;
		const imgFile = files[0];
		const reader = new FileReader();
		if (imgFile) {
			reader.onloadend = (finishedEvent) => {
				const {
					currentTarget: { result },
				} = finishedEvent;
				setAttachment(result);
			};
			reader.readAsDataURL(imgFile);
		}
	};

	const onClearAttachment = () => {
		setAttachment(null);
	};

	return (
		<div>
			<form onSubmit={onTwittClick}>
				<input
					ref={twittFocus}
					value={twitt}
					onChange={onTwittChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={200}
				/>
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="twitt" />
				{attachment && (
					<div>
						<img src={attachment} alt="twittImg" width="100px" />
						<button onClick={onClearAttachment}>Clear Image</button>
					</div>
				)}
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

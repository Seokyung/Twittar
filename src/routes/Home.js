import React, { useState } from "react";
import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";

function Home() {
	const [twitt, setTwitt] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const docRef = await addDoc(collection(dbService, "twitts"), {
				twitt,
				createdAt: Date.now(),
			});
			console.log("Document written with ID: ", docRef.id);
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
		</div>
	);
}

export default Home;

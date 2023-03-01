import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Home() {
	const [twitt, setTwitt] = useState("");
	const [twitts, setTwitts] = useState([]);

	const getTwitts = async () => {
		const dbTwitts = await getDocs(collection(dbService, "twitts"));
		dbTwitts.forEach((doc) => {
			const twittObject = {
				...doc.data(),
				id: doc.id,
			};
			setTwitts((prev) => [twittObject, ...prev]);
		});
	};

	useEffect(() => {
		getTwitts();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(dbService, "twitts"), {
				twitt,
				createdAt: Date.now(),
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
				{twitts.reverse().map((twitt) => (
					<div key={twitt.id}>
						<h4>{twitt.twitt}</h4>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;

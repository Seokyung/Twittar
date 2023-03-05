import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

function InputTwitt({ userObj }) {
	const [twitt, setTwitt] = useState("");
	const [attachment, setAttachment] = useState("");
	const fileInput = useRef(null);

	const onTwittClick = async (e) => {
		e.preventDefault();
		let attachmentUrl = "";
		if (attachment !== "") {
			const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
			const response = await uploadString(
				attachmentRef,
				attachment,
				"data_url"
			);
			attachmentUrl = await getDownloadURL(response.ref);
		}
		const twittObj = {
			text: twitt,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		try {
			await addDoc(collection(dbService, "twitts"), twittObj);
		} catch (error) {
			alert(error.message);
			console.log(error);
		}
		setTwitt("");
		setAttachment("");
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
		fileInput.current.value = null;
		setAttachment("");
	};

	return (
		<form onSubmit={onTwittClick}>
			<input
				value={twitt}
				onChange={onTwittChange}
				type="text"
				placeholder="What's on your mind?"
				maxLength={200}
			/>
			<input
				type="file"
				accept="image/*"
				ref={fileInput}
				onChange={onFileChange}
			/>
			<input type="submit" value="twitt" />
			{attachment && (
				<div>
					<img src={attachment} alt="twittImg" width="100px" />
					<button onClick={onClearAttachment}>Clear Image</button>
				</div>
			)}
		</form>
	);
}

export default InputTwitt;

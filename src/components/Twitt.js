import React, { useEffect, useRef, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fbase";

function Twitt({ twittObj, isOwner }) {
	const [isEdit, setIsEdit] = useState(false);
	const [newTwitt, setNewTwitt] = useState(twittObj.text);
	const editFocus = useRef(null);

	useEffect(() => {
		if (isEdit) {
			editFocus.current.focus();
		}
	}, [isEdit]);

	const toggleEdit = () => {
		setIsEdit((prev) => !prev);
	};

	const onEditChange = (e) => {
		const {
			target: { value },
		} = e;
		setNewTwitt(value);
	};

	const onEditClick = async (e) => {
		e.preventDefault();
		const twittDocRef = doc(dbService, "twitts", `${twittObj.id}`);
		await updateDoc(twittDocRef, { text: newTwitt });
		setIsEdit(false);
	};

	const onDeleteClick = async () => {
		const isDelete = window.confirm("Are you sure to delete this twitt?");
		if (isDelete) {
			const twittDocRef = doc(dbService, "twitts", `${twittObj.id}`);
			await deleteDoc(twittDocRef);
		}
	};

	return (
		<div>
			{isEdit ? (
				<>
					<form onSubmit={onEditClick}>
						<input
							type="text"
							placeholder="Edit your twitt!"
							onChange={onEditChange}
							ref={editFocus}
							value={newTwitt}
							required
						/>
						<input type="submit" value="Update twitt" />
					</form>
					<button onClick={toggleEdit}>Cancel</button>
				</>
			) : (
				<>
					<h4>{twittObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={toggleEdit}>Edit twitt</button>
							<button onClick={onDeleteClick}>Delete twitt</button>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Twitt;

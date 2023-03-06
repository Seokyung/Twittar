import React, { useEffect, useRef, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
			if (twittObj.attachmentUrl !== "") {
				const urlRef = ref(storageService, twittObj.attachmentUrl);
				await deleteObject(urlRef);
			}
		}
	};

	return (
		<div className="twitt">
			{isEdit ? (
				<>
					{isOwner && (
						<>
							<form onSubmit={onEditClick} className="container twittEdit">
								<input
									type="text"
									placeholder="Edit your twitt!"
									onChange={onEditChange}
									ref={editFocus}
									value={newTwitt}
									required
									autoFocus
									className="formInput"
								/>
								<input type="submit" value="Update twitt" className="formBtn" />
							</form>
							<span onClick={toggleEdit} className="formBtn cancelBtn">
								Cancel
							</span>
						</>
					)}
				</>
			) : (
				<>
					<h4>{twittObj.text}</h4>
					{twittObj.attachmentUrl && (
						<a
							href={twittObj.attachmentUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img src={twittObj.attachmentUrl} alt="attachment" />
						</a>
					)}
					{isOwner && (
						<div className="twitt__actions">
							<span onClick={toggleEdit}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Twitt;

import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { dbService } from "fbase";

function Twitt({ twittObj, isOwner }) {
	const onDeleteClick = async () => {
		const isDelete = window.confirm("Are you sure to delete this twitt?");
		if (isDelete) {
			const twittDocRef = doc(dbService, "twitts", `${twittObj.id}`);
			await deleteDoc(twittDocRef);
		}
	};

	return (
		<div>
			<h4>{twittObj.text}</h4>
			{isOwner && (
				<>
					<button>Edit Twitt</button>
					<button onClick={onDeleteClick}>Delete Twitt</button>
				</>
			)}
		</div>
	);
}

export default Twitt;

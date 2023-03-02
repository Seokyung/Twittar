import React from "react";

function Twitt({ twittObj, isOwner }) {
	return (
		<div>
			<h4>{twittObj.text}</h4>
			{isOwner && (
				<>
					<button>Edit Twitt</button>
					<button>Delete Twitt</button>
				</>
			)}
		</div>
	);
}

export default Twitt;

import React, { useState } from "react";

function Home() {
	const [twitt, setTwitt] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
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

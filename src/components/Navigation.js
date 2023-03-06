import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function Navigation({ userObj }) {
	return (
		<nav>
			<ul className="twittNavUl">
				<li>
					<Link to="/" className="twittNavMenu">
						<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
						<span className="twittNavMenuName">Home</span>
					</Link>
				</li>
				<li>
					<Link to="/profile" className="twittNavMenu">
						<img
							src={userObj.photoURL}
							alt="userProfile"
							className="twittNavProfileImg"
						/>
						<span className="twittNavMenuName">
							{userObj.displayName}'s Profile
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;

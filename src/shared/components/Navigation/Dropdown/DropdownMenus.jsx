import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuMenuItems } from "../NavMenuItems";
import "./Dropdown.css";

export default function Dropdown() {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	return (
		<>
			<ul
				onClick={handleClick}
				className={click ? "dropdown-menu clicked" : "dropdown-menu"}
			>
				{MenuMenuItems.map((item, index) => {
					return (
						<li key={index}>
							<NavLink
								className={item.cName}
								to={item.path}
								onClick={() => setClick(false)}
							>
								{item.title}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</>
	);
}

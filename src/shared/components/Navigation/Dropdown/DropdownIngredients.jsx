import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IngredientMenuItems } from "../NavMenuItems";
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
				{IngredientMenuItems.map((item, index) => {
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

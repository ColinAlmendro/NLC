import React from "react";

import { Outlet } from "react-router-dom";
import Stepper from "./Steps/Stepper";

const NewRecipe = () => {
	
	return (
		<div>
			<header>
				<h1>New Recipe</h1>
				<nav>
					<Stepper onStepChange={onStepChange} />
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default NewRecipe;

import React from "react";

import Card from "../../shared/components/UIElements/Card";
import IngredientItem from "./IngredientItem";
import Button from "../../shared/components/FormElements/Button";
import "./IngredientList.css";

const IngredientList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='ingredient-list center'>
				<Card>
					<h2>No ingredients found. Maybe add one?</h2>
					<Button to='/ingredients/new'>Add ingredient</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className='ingredient-list'>
			{props.items.map((ingredient) => (
				<IngredientItem
					key={ingredient.id}
					id={ingredient.id}
					category={ingredient.category}
					name={ingredient.name}
					description={ingredient.description}
					unit={ingredient.unit}
					volume={ingredient.volume}
					price={ingredient.price}
					onDelete={props.onDeleteIngredient}
				/>
			))}
		</ul>
	);
};

export default IngredientList;

import React from "react";

import Card from "../../shared/components/UIElements/Card";
import RecipeItem from "./RecipeItem";
import Button from "../../shared/components/FormElements/Button";
import "./RecipeList.css";

const RecipeList = (props) => {
	console.log("responseProps:", props.items);
	if (props.items.length === 0) {
		return (
			<div className='recipe-list center'>
				<Card>
					<h2>No recipes found. Maybe add one?</h2>
					<Button to='/recipes/new'>Add recipe</Button>
				</Card>
			</div>
		);
	}

	return (
		<ul className='recipe-list'>
			{props.items.map((recipe,i) => (

				
				<RecipeItem
					key={recipe.id}
					id={recipe.id}
					category={recipe.category}
					name={recipe.name}
					description={recipe.description}
					ingredients={[recipe.ingredients]}
					instructions={recipe.instructions}
					feeds={recipe.feeds}
					url={recipe.url}
					image={recipe.image}
					cost={recipe.cost}
					price={recipe.price}
					onDelete={props.onDeleteRecipe}
				/>
			))}
		</ul>
	);
};

export default RecipeList;

import React, { useEffect, useState } from "react";

import RecipeList from "../components/RecipeList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Recipes = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedRecipes, setLoadedRecipes] = useState();

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "/recipes/list"
				);
				console.log("setLoadedRecipes", responseData.recipes);
				setLoadedRecipes(responseData.recipes);
			} catch (err) {}
		};
		fetchRecipes();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedRecipes && <RecipeList items={loadedRecipes} />}
		</React.Fragment>
	);
};

export default Recipes;

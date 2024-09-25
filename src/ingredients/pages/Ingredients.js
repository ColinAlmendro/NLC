import React, { useEffect, useState } from "react";

import IngredientList from "../components/IngredientList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Ingredients = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedIngredients, setLoadedIngredients] = useState();

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/list"
				);
				console.log("ingredients :", responseData.ingredients);
				setLoadedIngredients(responseData.ingredients);
			} catch (err) {}
		};
		fetchIngredients();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedIngredients && (
				<IngredientList items={loadedIngredients} />
			)}
		</React.Fragment>
	);
};

export default Ingredients;

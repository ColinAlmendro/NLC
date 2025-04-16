const reducerIngredients = (state, action) => {
	switch (action.type) {
		case "UPDATE_INGREDIENTS":
			return { ...state, ingredients: action.data.ingredients };
		// case "INSERT_INGREDIENT": {
		// 	console.log("insertingredient", action.data);
		// 	return [
		// 		...state.ingredients,action.data
				
		// 	];
		// }
		// case "UPDATE_INGREDIENT": {
		// 	console.log("updateingredient", action.data);
		// 	return stateingredients.map((t) => {
		// 		if (t._id === action.data._id) {
		// 			return {...action.data};
		// 		} else {
		// 			return t;
		// 		}
		// 	});
			
		// }
		case "DELETE_INGREDIENT": {
			//	console.log("deleteingredient", action._id)
			const indexIngredient = state.ingredients.findIndex(
				(item) => action._id === item._id
			);
			let newIngredient = [...state.ingredients];
			if (indexIngredient >= 0) {
				newIngredient.splice(indexIngredient, 1);
			}

			if (newIngredient.length === 0) {
				return {
					...state,
					ingredients: newIngredient,
				};
			} else {
				return {
					...state,
					ingredients: newIngredient,
				};
			}
		}

		case "SET_SELECTED_INGREDIENT": {
			//console.log("set selected ingredient", action.id);
			return {
				...state,
				selected_ingredient: state.ingredients.filter(
					(ingredient) => ingredient._id === action.id
				),
			};
		}
		case "RESET_SELECTED_INGREDIENT": {
			return {
				...state,
				selected_ingredient: {},
			};
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerIngredients;

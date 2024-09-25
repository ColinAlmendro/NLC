import {useEffect} from "react";
const reducerRecipe = (state, action) => {
	// console.log("actionType:", action.type);
	switch (action.type) {
		case "UPDATE_RECIPES":
			return { ...state, recipes: action.data.recipes };
		// case "INSERT_MENU": {
		// 	return [
		// 		...menus,
		// 		{
		// 			// id: action.id,
		// 			// text: action.text,
		// 			// done: false,
		// 		},
		// 	];
		// }
		// case "UPDATE_MENU": {
		// 	return state.menus.map((t) => {
		// 		if (t.id === action.menu.id) {
		// 			return action.menu;
		// 		} else {
		// 			return t;
		// 		}
		// 	});
		// }
		case "DELETE_RECIPE": {
			//	console.log("deleterecipe", action._id)
			const indexRecipe = state.recipes.findIndex(
				(item) => action._id === item._id
			);
			let newRecipe = [...state.recipes];
			if (indexRecipe >= 0) {
				newRecipe.splice(indexRecipe, 1);
			}

			if (newRecipe.length === 0) {
				return {
					...state,
					recipes: newRecipe,
				};
			} else {
				return {
					...state,
					recipes: newRecipe,
				};
			}
		}

		case "SET_SELECTED_RECIPE": {
			console.log("set selected", action.id);
			return {
				...state,
				selected_recipe: state.recipes.filter((recipe) => recipe._id === action.id),
			};
		}
		case "RESET_SELECTED_RECIPE": {
			return {
				...state,
				selected_recipe: {},
			};
		}

		
		default:
			return state;
		// throw new Error("No matched action!");
	}
};

export default reducerRecipe;



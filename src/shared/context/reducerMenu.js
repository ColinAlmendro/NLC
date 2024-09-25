import {useEffect} from "react";
const reducerMenu = (state, action) => {
	// console.log("actionType:", action.type);
	switch (action.type) {
		case "UPDATE_MENUS":
			return { ...state, menus: action.data.menus };
		case "INSERT_MENU": {
			return [
				...menus,
				{
					// id: action.id,
					// text: action.text,
					// done: false,
				},
			];
		}
		case "UPDATE_MENU": {
			return state.menus.map((t) => {
				if (t.id === action.menu.id) {
					return action.menu;
				} else {
					return t;
				}
			});
		}
		case "DELETE_MENU": {
			//	console.log("deletemenu", action._id)
			const indexMenu = state.menus.findIndex(
				(item) => action._id === item._id
			);
			let newMenu = [...state.menus];
			if (indexMenu >= 0) {
				newMenu.splice(indexMenu, 1);
			}

			if (newMenu.length === 0) {
				return {
					...state,
					menus: newMenu,
				};
			} else {
				return {
					...state,
					menus: newMenu,
				};
			}
		}

		case "SET_SELECTED_MENU": {
			console.log("set selected menu", action.id);
			return {
				...state,
				selected_menu: state.menus.filter((menu) => menu._id === action.id),
			};
		}
		case "RESET_SELECTED_MENU": {
			return {
				...state,
				selected_menu: {},
			};
		}

		case "UPDATE_MAIN_RECIPES": {
			let mainRecipes = action.data.recipes;
			mainRecipes = mainRecipes.filter((recipe) => recipe.category === "main");
			// console.log("Reducer_main", mainRecipes);
			return {
				...state,
				main_recipes: mainRecipes,
			};
		}
		case "UPDATE_SIDE_RECIPES": {
			let sideRecipes = action.data.recipes;
			sideRecipes = sideRecipes.filter((recipe) => recipe.category === "side");
			// console.log("Reducer_side", sideRecipes);
			return {
				...state,
				side_recipes: sideRecipes,
			};
		}
		case "UPDATE_VEGIE_RECIPES": {
			let vegieRecipes = action.data.recipes;
			vegieRecipes = vegieRecipes.filter((recipe) => recipe.category === "veg");
			//console.log("Reducer_vegie", vegieRecipes);
			return {
				...state,
				vegie_recipes: vegieRecipes,
			};
		}
		case "UPDATE_SALAD_RECIPES": {
			let saladRecipes = action.data.recipes;
			saladRecipes = saladRecipes.filter(
				(recipe) => recipe.category === "salad"
			);
			//	console.log("Reducer_salad", saladRecipes);
			return {
				...state,
				salad_recipes: saladRecipes,
			};
		}
		case "UPDATE_SOUP_RECIPES": {
			let soupRecipes = action.data.recipes;
			soupRecipes = soupRecipes.filter((recipe) => recipe.category === "soup");
			//	console.log("Reducer_soup", soupRecipes);
			return {
				...state,
				soup_recipes: soupRecipes,
			};
		}
		case "UPDATE_PROMOTIONS":
			return { ...state, promotions: action.data.promotions };
		case "UPDATE_PRICES":
			return { ...state, prices: action.data.pricelists };

		case "UPDATE_MONDAY":
			console.log("reducermon", action.payload);
			//	return { ...state, monday: [...state.monday, action.payload] };
			return { ...state.selected_menu, monday: action.payload };
		case "DELETE_MONDAY":
			//	console.log("reducer", action.main);
			const indexMonday = state.monday.findIndex(
				(item) => action.main === item.main
			);
			let newMonday = [...state.monday];
			if (indexMonday >= 0) {
				newMonday.splice(indexMonday, 1);
			}

			if (newMonday.length === 0) {
				return {
					...state,
					monday: newMonday,
				};
			} else {
				return {
					...state,
					monday: newMonday,
				};
			}

		case "UPDATE_TUESDAY":
			console.log("reducertue", action.payload);
			return { ...state.selected_menu, monday: action.payload };
		case "DELETE_TUESDAY":
			const indexTuesday = state.tuesday.findIndex(
				(item) => action.main === item.main
			);
			let newTuesday = [...state.tuesday];
			if (indexTuesday >= 0) {
				newTuesday.splice(indexTuesday, 1);
			}

			if (newTuesday.length === 0) {
				return {
					...state,
					tuesday: newTuesday,
				};
			} else {
				return {
					...state,
					tuesday: newTuesday,
				};
			}
		case "UPDATE_WEDNESDAY":
			console.log("reducerwed", action.payload);
			return { ...state.selected_menu, monday: action.payload };
		case "DELETE_WEDNESDAY":
			const indexWednesday = state.wednesday.findIndex(
				(item) => action.main === item.main
			);
			let newWednesday = [...state.wednesday];
			if (indexWednesday >= 0) {
				newWednesday.splice(indexWednesday, 1);
			}

			if (newWednesday.length === 0) {
				return {
					...state,
					wednesday: newWednesday,
				};
			} else {
				return {
					...state,
					wednesday: newWednesday,
				};
			}
		case "UPDATE_THURSDAY":
			console.log("reducerthu", action.payload);
			return { ...state.selected_menu, monday: action.payload };
		// return { ...state, thursday: [...state.thursday, action.payload] };
		case "DELETE_THURSDAY":
			const indexThursday = state.thursday.findIndex(
				(item) => action.main === item.main
			);
			let newThursday = [...state.thursday];
			if (indexThursday >= 0) {
				newThursday.splice(indexThursday, 1);
			}

			if (newThursday.length === 0) {
				return {
					...state,
					thursday: newThursday,
				};
			} else {
				return {
					...state,
					thursday: newThursday,
				};
			}
		case "UPDATE_FRIDAY":
			console.log("reducerfri", action.payload);
			return { ...state.selected_menu, monday: action.payload };
		case "DELETE_FRIDAY":
			const indexFriday = state.friday.findIndex(
				(item) => action.main === item.main
			);
			let newFriday = [...state.friday];
			if (indexFriday >= 0) {
				newFriday.splice(indexFriday, 1);
			}

			if (newFriday.length === 0) {
				return {
					...state,
					friday: newFriday,
				};
			} else {
				return {
					...state,
					friday: newFriday,
				};
			}
		// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& EXTRAS
		case "UPDATE_VEGIES":
			console.log("reducerveg", action.payload);
			return { ...state, vegies: [...state.vegies, action.payload] };
		case "DELETE_VEGIES":
			const indexVegies = state.vegies.findIndex(
				(item) => action.main === item.main
			);
			let newVegies = [...state.vegies];
			if (indexVegies >= 0) {
				newVegies.splice(indexVegies, 1);
			}

			if (newVegies.length === 0) {
				return {
					...state,
					vegies: newVegies,
				};
			} else {
				return {
					...state,
					vegies: newVegies,
				};
			}

		case "UPDATE_SALADS":
			console.log("reducersalad", action.payload);
			return { ...state, salads: [...state.salads, action.payload] };
		case "DELETE_SALADS":
			const indexSalads = state.salads.findIndex(
				(item) => action.main === item.main
			);
			let newSalads = [...state.salads];
			if (indexSalads >= 0) {
				newSalads.splice(indexSalads, 1);
			}

			if (newSalads.length === 0) {
				return {
					...state,
					salads: newSalads,
				};
			} else {
				return {
					...state,
					salads: newSalads,
				};
			}

		case "UPDATE_SOUPS":
			console.log("reducersoup", action.payload);
			return { ...state, soups: [...state.soups, action.payload] };
		case "DELETE_SOUPS":
			const indexSoups = state.soups.findIndex(
				(item) => action.main === item.main
			);
			let newSoups = [...state.soups];
			if (indexSoups >= 0) {
				newSoups.splice(indexSoups, 1);
			}

			if (newSoups.length === 0) {
				return {
					...state,
					soups: newSoups,
				};
			} else {
				return {
					...state,
					soups: newSoups,
				};
			}

		case "UPDATE_WEEK":
			console.log("reducerweek", action.week);
			return { ...state, week: action.week };

		case "UPDATE_INTRODUCTION":
			console.log("reducerintro", action.payload);
			return { ...state, introduction: action.payload };

		case "UPDATE_PERIOD":
			console.log("reducerperiod", action.period);
			return { ...state, period: action.period };

		// case "UPDATE_INSTRUCTION":
		// 	console.log("reducerinstr", action.payload);
		// 	return { ...state, instruction: action.payload };

		// case "TOGGLE_IS_EDITING":
		// 	console.log("isEditing", isEditing);
		// 	return { ...state, isEditing: {} };

		default:
			return state;
		// throw new Error("No matched action!");
	}
};

export default reducerMenu;

// const applyFilter = (menus, date) => {
// 	let filteredMenus = menus;

// 	if (date) {
// 		filteredMenus = filteredMenus.filter((menu) => menu.date <= date);
// 	}

// 	return filteredMenus;
// };

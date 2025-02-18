const reducerSettings = (state, action) => {
	switch (action.type) {
		case "UPDATE_APP_SETTINGS":
			// console.log("payload",action.data.settings[0])
			return { ...state, ...action.data.settings[0] };
		case "UPDATE_APP_TITLE":
			return { ...state, app_title: action.payload.app_title };
		case "UPDATE_APP_LOGO":
			// Home
			return { ...state, app_logo: action.payload.app_logo };
		case "UPDATE_HOME_BG_IMAGE":
			return { ...state, home_bg_image: action.payload.home_bg_image };
		case "UPDATE_HOME_LOGO":
			return { ...state, home_logo: action.payload.home_logo };
		// Menu
		case "UPDATE_MENU_LOGO":
			return { ...state, menu_logo: action.payload.menu_logo };
		case "UPDATE_MENU_IMAGE":
			return { ...state, menu_image: action.payload.menu_image };
		// About
		case "UPDATE_FOOTER_ABOUT":
			return { ...state, footer_about: action.payload.footer_about };
		case "UPDATE_ABOUT_IMAGE":
			return { ...state, about_image: action.payload.about_image };
		case "UPDATE_ABOUT_INTRO":
			return { ...state, about_intro: action.payload.about_intro };
		case "UPDATE_ABOUT_TEXT":
			return { ...state, about_text: action.payload.about_text };
		// Contact
		case "UPDATE_CONTACT_LOCATION":
			return { ...state, contact_location: action.payload.contact_location };
		case "UPDATE_CONTACT_NAME":
			return { ...state, contact_name: action.payload.contact_name };
		case "UPDATE_CONTACT_EMAIL":
			return { ...state, contact_email: action.payload.contact_email };
		case "UPDATE_CONTACT_CELLPHONE":
			return { ...state, contact_cellphone: action.payload.contact_cellphone };
		// Links
		case "UPDATE_FACEBOOK":
			return { ...state, facebook: action.payload.facebook };
		case "UPDATE_INSTAGRAM":
			return { ...state, instagram: action.payload.instagram };
		// AA Rate
		case "UPDATE_AA_RATE":
			return { ...state, aa_rate: action.payload.aa_rate };
		// Areas
		case "UPDATE_AREA_LIST":
			console.log("reducer update", action.payload.area_list);
			return { ...state, area_list: action.payload.area_list };
		case "DELETE_AREA": {
			//	console.log("deletearea", action._id)
			const indexArea = state.area_list.findIndex(
				(item) => action.id === item.id
			);
			let newArea = [...state.area_list];
			if (indexArea >= 0) {
				newArea.splice(indexArea, 1);
			}

			if (newArea.length === 0) {
				return {
					...state,
					area_list: newArea,
				};
			} else {
				return {
					...state,
					area_list: newArea,
				};
			}
		}
		// /////////////////////////////////////////////////////////////////////

		// case "SET_SELECTED_AREA": {
		// 	console.log("set selected area", action.id);
		// 	return {
		// 		...state,
		// 		selected_area: state.area_list.filter((area) => area._id === action.id),
		// 	};
		// }
		// case "RESET_SELECTED_AREA": {
		// 	return {
		// 		...state,
		// 		selected_area: {},
		// 	};
		// }

		// Recipe Types
		case "UPDATE_RECIPE_TYPE_LIST":
			console.log("reducer update", action.payload.recipe_type_list);
			return { ...state, recipe_type_list: action.payload.recipe_type_list };

		case "DELETE_RECIPE_TYPE": {
			//	console.log("deletearea", action._id)
			const indexRecipeType = state.recipe_type_list.findIndex(
				(item) => action.id === item.id
			);
			let newRecipeType = [...state.recipe_type_list];
			if (indexRecipeType >= 0) {
				newRecipeType.splice(indexRecipeType, 1);
			}

			if (newRecipeType.length === 0) {
				return {
					...state,
					recipe_type_list: newRecipeType,
				};
			} else {
				return {
					...state,
					recipe_type_list: newRecipeType,
				};
			}
		}
		// Ingredient Categories
		case "UPDATE_INGREDIENT_CATEGORY_LIST":
			console.log("reducer update", action.payload.ingredient_category_list);
			return {
				...state,
				ingredient_category_list: action.payload.ingredient_category_list,
			};

		case "DELETE_INGREDIENT_CATEGORY": {
			const indexIngredientCategory = state.ingredient_category_list.findIndex(
				(item) => action.id === item.id
			);
			let newIngredientCategory = [...state.ingredient_category_list];
			if (indexIngredientCategory >= 0) {
				newIngredientCategory.splice(indexIngredientCategory, 1);
			}

			if (newIngredientCategory.length === 0) {
				return {
					...state,
					ingredient_category_list: newIngredientCategory,
				};
			} else {
				return {
					...state,
					ingredient_category_list: newIngredientCategory,
				};
			}
		}

		// Prices
		case "UPDATE_PRICE_LIST":
			console.log("reducer update", action.payload.price_list);
			return { ...state, price_list: action.payload.price_list };
		case "DELETE_PRICE": {
			//	console.log("deleteprice", action._id)
			const indexPrice = state.price_list.findIndex(
				(item) => action.id === item.id
			);
			let newPrice = [...state.price_list];
			if (indexPrice >= 0) {
				newPrice.splice(indexPrice, 1);
			}

			if (newPrice.length === 0) {
				return {
					...state,
					price_list: newPrice,
				};
			} else {
				return {
					...state,
					price_list: newPrice,
				};
			}
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerSettings;

const reducerPromotions = (state, action) => {
	switch (action.type) {
		case "UPDATE_PROMOTIONS":
			return { ...state, promotions: action.data.promotions };
		// case "INSERT_PROMOTION": {
		// 	console.log("insertpromotion", action.data);
		// 	return [
		// 		...state.promotions,action.data
				
		// 	];
		// }
		// case "UPDATE_PROMOTION": {
		// 	console.log("updatepromotion", action.data);
		// 	return statepromotions.map((t) => {
		// 		if (t._id === action.data._id) {
		// 			return {...action.data};
		// 		} else {
		// 			return t;
		// 		}
		// 	});
			
		// }
		case "DELETE_PROMOTION": {
			//	console.log("deletepromotion", action._id)
			const indexPromotion = state.promotions.findIndex(
				(item) => action._id === item._id
			);
			let newPromotion = [...state.promotions];
			if (indexPromotion >= 0) {
				newPromotion.splice(indexPromotion, 1);
			}

			if (newPromotion.length === 0) {
				return {
					...state,
					promotions: newPromotion,
				};
			} else {
				return {
					...state,
					promotions: newPromotion,
				};
			}
		}

		case "SET_SELECTED_PROMOTION": {
			console.log("set selected", action.id);
			return {
				...state,
				selected_promotion: state.promotions.filter(
					(promotion) => promotion._id === action.id
				),
			};
		}
		case "RESET_SELECTED_PROMOTION": {
			return {
				...state,
				selected_promotion: {},
			};
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerPromotions;

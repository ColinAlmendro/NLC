const reducerOrders = (state, action) => {
	switch (action.type) {
		case "UPDATE_ORDERS":
			return { ...state, orders: action.data.orders };
		
		case "DELETE_ORDER": {
			//	console.log("deleteorder", action._id)
			const indexOrder = state.orders.findIndex(
				(item) => action._id === item._id
			);
			let newOrder = [...state.orders];
			if (indexOrder >= 0) {
				newOrder.splice(indexOrder, 1);
			}

			if (newOrder.length === 0) {
				return {
					...state,
					orders: newOrder,
				};
			} else {
				return {
					...state,
					orders: newOrder,
				};
			}
		}

		case "SET_SELECTED_ORDER": {
			console.log("set selected", action.id);
			return {
				...state,
				selected_order: state.orders.filter(
					(order) => order._id === action.id
				),
			};
		}
		case "RESET_SELECTED_ORDER": {
			return {
				...state,
				selected_order: {},
			};
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerOrders;

const reducerCustomers = (state, action) => {
	switch (action.type) {
		case "UPDATE_CUSTOMERS":
			return { ...state, customers: action.data.customers };
		// case "INSERT_CUSTOMER": {
		// 	console.log("insertcustomer", action.data);
		// 	return [
		// 		...state.customers,action.data
				
		// 	];
		// }
		// case "UPDATE_CUSTOMER": {
		// 	console.log("updatecustomer", action.data);
		// 	return statecustomers.map((t) => {
		// 		if (t._id === action.data._id) {
		// 			return {...action.data};
		// 		} else {
		// 			return t;
		// 		}
		// 	});
			
		// }
		case "DELETE_CUSTOMER": {
			//	console.log("deletecustomer", action._id)
			const indexCustomer = state.customers.findIndex(
				(item) => action._id === item._id
			);
			let newCustomer = [...state.customers];
			if (indexCustomer >= 0) {
				newCustomer.splice(indexCustomer, 1);
			}

			if (newCustomer.length === 0) {
				return {
					...state,
					customers: newCustomer,
				};
			} else {
				return {
					...state,
					customers: newCustomer,
				};
			}
		}

		case "SET_SELECTED_CUSTOMER": {
			console.log("set selected customer", action.id);
			return {
				...state,
				selected_customer: state.customers.filter(
					(customer) => customer._id === action.id
				),
			};
		}
		case "RESET_SELECTED_CUSTOMER": {
			return {
				...state,
				selected_customer: {},
			};
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerCustomers;

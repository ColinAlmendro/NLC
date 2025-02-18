const reducerUsers = (state, action) => {
	switch (action.type) {
		case "UPDATE_USERS":
			return { ...state, users: action.data.users };
		// case "INSERT_USER": {
		// 	console.log("insertuser", action.data);
		// 	return [
		// 		...state.users,action.data
				
		// 	];
		// }
		// case "UPDATE_USER": {
		// 	console.log("updateuser", action.data);
		// 	return stateusers.map((t) => {
		// 		if (t._id === action.data._id) {
		// 			return {...action.data};
		// 		} else {
		// 			return t;
		// 		}
		// 	});
			
		// }
		case "DELETE_USER": {
			//	console.log("deleteuser", action._id)
			const indexUser = state.users.findIndex(
				(item) => action._id === item._id
			);
			let newUser = [...state.users];
			if (indexUser >= 0) {
				newUser.splice(indexUser, 1);
			}

			if (newUser.length === 0) {
				return {
					...state,
					users: newUser,
				};
			} else {
				return {
					...state,
					users: newUser,
				};
			}
		}

		case "SET_SELECTED_USER": {
			console.log("set selected user", action.id);
			return {
				...state,
				selected_user: state.users.filter(
					(user) => user._id === action.id
				),
			};
		}
		case "RESET_SELECTED_USER": {
			return {
				...state,
				selected_user: {},
			};
		}

		default:
			throw new Error("No matched action!");
	}
};

export default reducerUsers;

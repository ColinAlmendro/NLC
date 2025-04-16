const reducerUsers = (state, action) => {
	switch (action.type) {
		case "UPDATE_USERS":
			return { ...state, users: action.data.users };

		case "DELETE_USER": {
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
			return {
				...state,
				selected_user: state.users.filter((user) => user._id === action.id),
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

import { createContext, useContext, useEffect, useReducer } from "react";
import reducerUsers from "./reducerUsers";

const initialState = {
	users: [
		{
			name: "",
			surname:"",
			dob:"",
			cell: "",
			email: "",
			address1: "",
			area: "",
			note: "",
		},
	],
	selected_user: {},
};

const Context = createContext(initialState);

export const useUsersValue = () => {
					return useContext(Context);
				};

const ContextProvider = ({ children }) => {
	const [usersState, dispatchUser] = useReducer(reducerUsers, initialState);

	return (
		<Context.Provider value={{ usersState, dispatchUser }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

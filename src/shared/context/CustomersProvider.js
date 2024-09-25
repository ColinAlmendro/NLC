import { createContext, useContext, useEffect, useReducer } from "react";
import reducerCustomers from "./reducerCustomers";

const initialState = {
	customers: [
		{
			name: "",
			surname:"",
			dob:"",
			cell: "",
			email: "",
			address1: "",
			address2: "",
			// location: "",
			note: "",
		},
	],
	selected_customer: {},
};

const Context = createContext(initialState);

export const useCustomersValue = () => {
					return useContext(Context);
				};

const ContextProvider = ({ children }) => {
	const [customersState, dispatchCustomer] = useReducer(reducerCustomers, initialState);

	return (
		<Context.Provider value={{ customersState, dispatchCustomer }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

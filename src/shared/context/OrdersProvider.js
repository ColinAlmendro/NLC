import { createContext, useContext, useEffect, useReducer } from "react";
import reducerOrders from "./reducerOrders";

const initialState = {
	orders: [
		{
			date: "",
			customer: {},
			menu: {},
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			item_count: "",
			total_price: "",
			note: "",
		},
	],
	selected_order: {},
};

const Context = createContext(initialState);

export const useOrdersValue = () => {
					return useContext(Context);
				};

const ContextProvider = ({ children }) => {
	const [ordersState, dispatchOrder] = useReducer(reducerOrders, initialState);

	return (
		<Context.Provider value={{ ordersState, dispatchOrder }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

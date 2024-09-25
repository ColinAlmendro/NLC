import { createContext, useContext, useEffect, useReducer } from "react";
import reducerPromotions from "./reducerPromotions";

const initialState = {
	promotions: [
		{
			promotion: "",
			items: [
				{
					image: "",
					name: "",
					description: "",
					volume: "",
					price: 0,
				},
			],
		},
	],
	selected_promotion: {},
};

const Context = createContext(initialState);

export const usePromotionsValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [promotionsState, dispatch] = useReducer(
		reducerPromotions,
		initialState
	);

	return (
		<Context.Provider value={{ promotionsState, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

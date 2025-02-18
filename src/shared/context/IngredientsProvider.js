import { createContext, useContext, useEffect, useReducer } from "react";
import reducerIngredients from "./reducerIngredients";

const initialState = {
	ingredients: [
		{
			category: "",
			name:"",
			description:"",
			price: "",
		},
	],
	selected_ingredient: {},
};

const Context = createContext(initialState);

export const useIngredientsValue = () => {
					return useContext(Context);
				};

const ContextProvider = ({ children }) => {
	const [ingredientsState, dispatchIngredient] = useReducer(reducerIngredients, initialState);

	return (
		<Context.Provider value={{ ingredientsState, dispatchIngredient }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

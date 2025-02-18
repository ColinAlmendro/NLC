import { createContext, useContext, useEffect, useReducer } from "react";
import reducerMenu from "./reducerMenu";
// import { AuthContext } from "./auth-context";

const initialState = {
	menus: [
		{
			date: "2020-01-01T00:00:00.000Z",

			introduction: "",
			instruction: "",
			prices: [],
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			frozen: [],
			vegies: [],
			salads: [],
			soups: [],
			note: "Bla bla bla",
			_id: "66bf9b79ebba9d60d8d3d785",
			__v: 0,
		},
	],
	selected_menu: {},
	filtered_menus: [],
	main_recipes: [],
	side_recipes: [],
	vegie_recipes: [],
	salad_recipes: [],
	soup_recipes: [],
	frozen_recipes: [],
	introduction: "",
	period: "",
	instruction: "",
	promotions: [],
	week: new Date(),
	prices: [],
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	frozen: [],
	vegies: [],
	salads: [],
	soups: [],
	isEditing: false,
};

const Context = createContext(initialState);

export const useMenuValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [menuState, dispatchMenu] = useReducer(reducerMenu, initialState);

	return (
		<Context.Provider value={{ menuState, dispatchMenu }}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;

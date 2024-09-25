import { createContext, useContext, useState } from "react";

const initialState = [{
	// date: null,
	// logo: "",
	// image: "",
	// contact: "",
	// introduction: "",
	// instruction: "",
	// days: [
	// 	{
	// 		day: "",
	// 		meals: [
	// 			{
	// 				image: "",
	// 				main: "",
	// 				mainDescription: "",
	// 				side: "",
	// 				sideDescription: "",
	// 			},
	// 		],
	// 	},
	// ],
	// vegies: [{ name: "", description: "" }],
	// salads: [{ name: "", description: "" }],
	// soups: [{ name: "", description: "" }],
	// note: "",
	date: null,
	logo: "",
	image: "",
	contact: "",
	introduction: "",
	instruction: "",
	days: [],
	vegies: [],
	salads: [],
	soups: [],
	note: "",
}];
export const MenuStateContext = createContext(initialState);

export function MenuProvider({ children }) {
	const [value,setValue] = useState({});
	return (
		<MenuStateContext.Provider value={value}>
			{children}
		</MenuStateContext.Provider>
	);
}

export function useMenuState() {
	const context = useContext(MenuStateContext);
	if (!context) {
		throw new Error("useMenuState must be used within the MenuProvider");
	}
	return context;
}

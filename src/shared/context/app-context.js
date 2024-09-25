import { createContext, useContext, useState } from "react";

const initialState = {
	appTitle: "Next Level Cuisine",
	appLogo: "",
	homeBackgroundImage: "../../assets/images/home/home.jpg",
    homeLogo: "../../assets/images/home/logo.jpg",
	menuLogo: "",
	menuImage: "",

};
export const AppStateContext = createContext(initialState);
export function AppProvider({ children }) {
	const value = useState({});
	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	);
}

export function useAppState() {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error("useAppState must be used within the AppProvider");
	}
	return context;
}

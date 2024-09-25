import { createContext, useContext, useEffect, useReducer } from "react";
import reducerApp from "./reducerApp";
import { AuthContext } from "./auth-context";


const initialState = {
    isLoading:false,
	// dialogAppSettingsOpen: false,

	
};


const Context = createContext(initialState);

export const useValue = () => {
	return useContext(Context);
};

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerApp, initialState);

	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};

export default AppProvider;

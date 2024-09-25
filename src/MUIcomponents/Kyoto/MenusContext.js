import { createContext, useContext, useReducer } from "react";

const MenusContext = createContext(null);

const MenusDispatchContext = createContext(null);

export function MenusProvider({ children }) {
	const [menus, dispatch] = useReducer(menusReducer, initialMenus);

	return (
		<MenusContext.Provider value={menus}>
			<MenusDispatchContext.Provider value={dispatch}>
				{children}
			</MenusDispatchContext.Provider>
		</MenusContext.Provider>
	);
}

export function useMenus() {
	return useContext(MenusContext);
}

export function useMenusDispatch() {
	return useContext(MenusDispatchContext);
}

function menusReducer(menus, action) {
	switch (action.type) {
		case "added": {
			return [
				...menus,
				{
					id: action.id,
					text: action.text,
					done: false,
				},
			];
		}
		case "changed": {
			return menus.map((t) => {
				if (t.id === action.menu.id) {
					return action.menu;
				} else {
					return t;
				}
			});
		}
		case "deleted": {
			return menus.filter((t) => t.id !== action.id);
		}
		default: {
			throw Error("Unknown action: " + action.type);
		}
	}
}

const initialMenus = [
	{ id: 0, text: "Philosopher’s Path", done: true },
	{ id: 1, text: "Visit the temple", done: false },
	{ id: 2, text: "Drink matcha", done: false },
];

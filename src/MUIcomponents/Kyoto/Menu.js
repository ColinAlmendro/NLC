import AddMenu from "./AddMenu.js";
import MenuList from "./MenuList.js";
// import { MenusProvider } from "./MenusContext.js";
// import { useMenus } from "../shared/context/SettingsProvider.js";

export default function menuApp() {
	return (
		// <MenusProvider>
		<>
			{/* <h4>Menus</h4> */}
			{/* <AddMenu /> */}
			<MenuList />
		</>
		// </MenusProvider>
	);
}

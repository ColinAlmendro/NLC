import { useState } from "react";
// import { useMenusDispatch } from "./MenusContext.js";
import { useMenuValue } from "../shared/context/MenuProvider.js";

export default function AddMenu() {
	const [menuDate, setMenuDate] = useState("");
	
	const {
		state: { menus },
		dispatch,
	} = useMenuValue();
	return (
		<>
			<input
				placeholder='Add menu'
				value={menus.date}
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				onClick={() => {
					setText("");
					dispatch({
						type: "ADDED",
						payload: { date: menuDate },
					});
				}}
			> 
				Add
			</button>
		</>
	);
}

// let nextId = 3;

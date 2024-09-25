import { useState, useContext, useEffect } from "react";
import { useMenuValue } from "../shared/context/MenuProvider.js";
import { AuthContext } from "../shared/context/auth-context";
import Controls from "../components/controls/Controls";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	MenuItem,
	FormLabel,
	FormControl,
	Grid,
	GridItem,
	Card,
	CardMedia,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemAvatar,
	Avatar,
	ListItemButton,
	Typography,
	Divider
} from "@mui/material";

export default function MenuList() {
	const auth = useContext(AuthContext);
	const {
		menuState: { menus },
		dispatch,
	} = useMenuValue();

	/////////////////////////////
	useEffect(() => {
		async function fetchMenus() {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/menus/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},
				}
			);
			const data = await response.json();
			console.log("Menus list :", data.settings);

			dispatch({ type: "UPDATE_MENUS", data });
		}
		fetchMenus();
	}, []);

	////////////////////////////////

	console.log("menus", menus);
	return (
		<Container maxWidth='md' sx={{ border: "3px solid", width: 900 }}>
			<Paper sx={{ height: "100vh" }}>
				{/* {isLoading && <LoadingSpinner asOverlay />} */}
				<Typography variant='h6'>Menus</Typography>

				<Divider sx={{ mt: 2 }} />
				<Stack gap={1}>
					<List>
						{menus.map((menu) => (
							<ListItem key={menu._id}>
								<Menu menu={menu} />
							</ListItem>
						))}
					</List>
				</Stack>
			</Paper>
		</Container>
	);
}

function Menu({ menu }) {
	const [isEditing, setIsEditing] = useState(false);

	let menuContent;
	if (isEditing) {
		menuContent = (
			<>
				{/* <input
					value={menu.date}
					onChange={(e) => {
						dispatch({
							type: "CHANGED",
							menu: {
								...menu,
								date: e.target.value,
							},
						});
					}}
				/> */}
				<Controls.DatePicker
					name='date'
					label='Menu Date'
					value={menu.date}
					onChange={(e) => {
						dispatch({
							type: "CHANGED",
							menu: {
								...menu,
								date: e.target.value,
							},
						});
					}}
				/>
				<Button
					sx={{ display: "flex", gap: "1rem" }}
					variant='contained'
					color='success'
					onClick={() => setIsEditing(false)}
				>
					Save
				</Button>
			</>
		);
	} else {
		menuContent = (
			<>
				<ListItemText>{menu.date}</ListItemText>

				<Button
					sx={{ display: "flex", gap: "1rem" }}
					variant='contained'
					// color='error'
					onClick={() => setIsEditing(true)}
				>
					Edit
				</Button>
			</>
		);
	}
	return (
		<label>
			{/* <input
				type='checkbox'
				checked={menu.done}
				onChange={(e) => {
					dispatch({
						type: "CHANGED",
						menu: {
							...menu,
							done: e.target.checked,
						},
					});
				}}
			/> */}
			{menuContent}
			<Button
				sx={{ display: "flex", gap: "1rem" }}
				variant='contained'
				color='error'
				onClick={() => {
					dispatch({
						type: "DELETED",
						id: menu._id,
					});
				}}
			>
				Delete
			</Button>
		</label>
	);
}

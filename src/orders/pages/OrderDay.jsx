import React, { useState, useEffect } from "react";
import {
	Typography,
	Box,
	Stack,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListSubheader,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
	Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { DevTool } from "@hookform/devtools";
import MenuItem from "./MenuItem";
import "./Listitem.css";

const OrderDay = ({ weekday }) => {
	const { control } = useFormContext();
	const {
		menuState: {
			menus,
			prices,
			selected_menu,
			main_recipes,
			side_recipes,
			vegie_recipes,
			salad_recipes,
			soup_recipes,
			frozen_recipes,
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
			frozen,
		},
		dispatch,
	} = useMenuValue();

	const [record, setRecord] = useState(selected_menu[0]);
	const [openVegies, setOpenVegies] = React.useState(false);
	const [openSalads, setOpenSalads] = React.useState(false);
	const [openSoups, setOpenSoups] = React.useState(false);
	const [openSides, setOpenSides] = React.useState(false);
	// const [openFrozen, setOpenFrozen] = React.useState(false);
	// const [openPromo, setOpenPromo] = React.useState(false);

	// const [dayMenu, setDayMenu] = useState([null]);
	console.log("selectedmenu", record);

	let menuOptions = [];
	switch (weekday) {
		case "monday":
			//fields = [...record.vegies];
			//	console.log("selected_menu[0].monday", selected_menu[0].monday);
			menuOptions = [...selected_menu[0].monday];
			break;
		case "tuesday":
			//fields = [...record.salads];
			menuOptions = [...selected_menu[0].tuesday];
			break;
		case "wednesday":
			//fields = [...record.soups];
			menuOptions = [...selected_menu[0].wednesday];
			break;
		case "thursday":
			//fields = [...record.sides];
			menuOptions = [...selected_menu[0].thursday];
			break;
		case "friday":
			//fields = [...record.sides];
			menuOptions = [...selected_menu[0].friday];
			break;
		case "frozen":
			//fields = [...record.sides];
			menuOptions = [...selected_menu[0].frozen];
			break;
		default:
			menuOptions = [];
	}

	const vegiesOptions = [...selected_menu[0].vegies];
	const saladsOptions = [...selected_menu[0].salads];
	const soupsOptions = [...selected_menu[0].soups];
	const sidesOptions = [...selected_menu[0].sides];
	// const frozenOptions = [...selected_menu[0].frozen];
	

	const handleVegiesClick = () => {
		setOpenVegies(!openVegies);
	};
	const handleSaladsClick = () => {
		setOpenSalads(!openSalads);
	};
	const handleSoupsClick = () => {
		setOpenSoups(!openSoups);
	};
	const handleSidesClick = () => {
		setOpenSides(!openSides);
	};
		// const handleFrozenClick = () => {
		// 	setOpenFrozen(!openFrozen);
		// };

	return (
		<Grid item xs={12} lg={12}>
			<Stack>
				<Grid item xs={12} lg={12}>
					<Controller
						name={weekday}
						control={control}
						render={({ fieldState: { error } }) => (
							<>
								<List label='Main Meals'>
									{menuOptions.map((item, i) => {
										return (
											<MenuItem data={item} id={i} key={i} day={weekday} />
										);
									})}
								</List>

								<ListItemButton onClick={handleVegiesClick} sx={{ width: 200 }}>
									<ListItemText primary='Add Vegies' />
									{openVegies ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
								<Collapse in={openVegies} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{vegiesOptions.map((item, i) => {
											return (
												<MenuItem data={item} id={i} key={i} day={weekday} />
											);
										})}
									</List>
								</Collapse>

								<ListItemButton onClick={handleSaladsClick} sx={{ width: 200 }}>
									<ListItemText primary='Fresh Salads' />
									{openSalads ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
								<Collapse in={openSalads} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{saladsOptions.map((item, i) => {
											return (
												<MenuItem data={item} id={i} key={i} day={weekday} />
											);
										})}
									</List>
								</Collapse>

								<ListItemButton onClick={handleSoupsClick} sx={{ width: 200 }}>
									<ListItemText primary='Yummy Soups' />
									{openSoups ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
								<Collapse in={openSoups} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{soupsOptions.map((item, i) => {
											return (
												<MenuItem data={item} id={i} key={i} day={weekday} />
											);
										})}
									</List>
								</Collapse>

								<ListItemButton onClick={handleSidesClick} sx={{ width: 200 }}>
									<ListItemText primary='Extra Sides' />
									{openSides ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
								<Collapse in={openSides} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{sidesOptions.map((item, i) => {
											return (
												<MenuItem data={item} id={i} key={i} day={weekday} />
											);
										})}
									</List>
								</Collapse>

								{/* <ListItemButton onClick={handleFrozenClick} sx={{ width: 200 }}>
									<ListItemText primary='Frozen Meals' />
									{openFrozen ? <ExpandLess /> : <ExpandMore />}
								</ListItemButton>
								<Collapse in={openFrozen} timeout='auto' unmountOnExit>
									<List component='div' disablePadding>
										{frozenOptions.map((item, i) => {
											return (
												<MenuItem data={item} id={i} key={i} day={weekday} />
											);
										})}
									</List>
								</Collapse> */}
							</>
						)}
					/>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default OrderDay;

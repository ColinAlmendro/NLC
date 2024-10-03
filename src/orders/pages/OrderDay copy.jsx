import React, { useState, useEffect } from "react";
import {
	Typography,
	Box,
	Stack,
	TextField,
	Button,
	MenuItem,
	List,
	ListItem,
	Grid,
	GridItem,
	Card,
	CardMedia,
	IconButton,
} from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteIcon from "@mui/icons-material/Delete";
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
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
		},
		dispatch,
	} = useMenuValue();

	const [record, setRecord] = useState(selected_menu[0]);
	// const [dayMenu, setDayMenu] = useState([null]);

	
let menuOptions = [];
switch (weekday) {
	case "monday":
		//fields = [...record.vegies];
		console.log("selected_menu[0].monday", selected_menu[0].monday);
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
	default:
		menuOptions = [];
}

console.log("CCCCC",weekday, menuOptions);

	const { fields, append, remove } = useFieldArray({
		control,
		name: `${weekday}`,
	});

	const [order, setOrder] = useState({
		// id: 0,
		item: "",
		category: "",
		description: "",
		premium: "",
		qty: "",
		price: "",
	});

	// const dayMainChange = (e) => {
	// 	let obj = main_recipes.find((o) => o._id === e.target.value);
	// 	let mainItems = {};
	// 	mainItems = {
	// 		image: obj.image,
	// 		main: e.target.value,
	// 		mainname: obj.name,
	// 		maindescription: obj.description,
	// 	};
	// 	setMeal((meal) => ({
	// 		...meal,
	// 		...mainItems,
	// 	}));

	// 	document.getElementById("dayMainDescInput").value = obj.description;
	// 	//		console.log("GETMealmain", meal);
	// };
	// const daySideChange = (e) => {
	// 	let obj = side_recipes.find((o) => o._id === e.target.value);
	// 	let sideItems = {};
	// 	sideItems = {
	// 		side: e.target.value,
	// 		sidename: obj.name,
	// 		sidedescription: obj.description,
	// 	};
	// 	setMeal((meal) => ({
	// 		...meal,
	// 		...sideItems,
	// 	}));

	// 	document.getElementById("daySideDescInput").value = obj.description;
	// 	//		console.log("GETMealside", meal);
	// };

	// const onSubmit = (data) => console.log(data);

	return (
		<Grid item xs={12} lg={12}>
			<Stack>
				<Grid item xs={12} lg={12}>
					<Box
						sx={{
							mx: "auto",
							textAlign: "center",
							p: 2,
							m: 0,
						}}
					>
						<Typography fontWeight='700' variant='h6'>
							~ {weekday.charAt(0).toUpperCase() + weekday.slice(1)} ~
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} lg={12}>
					{/* // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
					<Controller
						name={weekday}
						control={control}
						render={({ fieldState: { error } }) => (
							<List>
								{menuOptions.map(({ image, main,side,sidedescription }, index) => {
									{/* console.log("recordlists", menuOptions); */}
									return (
										<ListItem key={index}>
											<Grid width='95%'>
												<Stack direction='row' width='100%'>
													<Grid item xs={1} lg={1}>
														<Card sx={{ width: 50, p: 0.5 }}>
															<CardMedia
																component='img'
																image={image}
																alt='Meal image'
																height='50px'
															/>
														</Card>
													</Grid>
													<Grid item xs={6} lg={6}>
														<Stack direction='row'>
															<Typography fontWeight='700'>
																{main.name}
															</Typography>
															{menuOptions.indexOf("side" > -1) && (
																<Typography fontWeight='700'>
																	&nbsp; {`& ${sidedescription}`}
																</Typography>
															)}
															{main.premium > 0 && (
																<Typography fontWeight='700'>
																	<StarOutlineIcon style={{color:"green"}} sx={{pb:1,ml:1}}/>
																</Typography>
															)}
														</Stack>
													</Grid>
													<Grid item xs={3} lg={3}>
														<Stack direction='row'>
															<IconButton
																sx={{
																	height: 10,
																	m: 2,
																	p: 2,
																}}
																size='small'
																variant='outlined'
																color='error'
																type='button'
																// onClick={() => {
																// 	console.log("index", id),
																// 	remove(main),
																// 		setMeal({
																// 			image: "",
																// 			main: "",
																// 			mainname: "",
																// 			maindescription: "",
																// 			side: "",
																// 			sidename: "",
																// 			sidedescription: "",
																// 		}),
																// 		//	console.log("appendedmeal", meal),
																// 		(document.getElementById(
																// 			"dayMainDescInput"
																// 		).value = ""),
																// 		(document.getElementById(
																// 			"daySideDescInput"
																// 		).value = "");
																// }}
															>
																<DeleteIcon />
															</IconButton>
														</Stack>
													</Grid>
												</Stack>
											</Grid>
										</ListItem>
									);
								})}
							</List>
						)}
					/>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default OrderDay;

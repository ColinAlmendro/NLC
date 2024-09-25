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



const Day = ({ weekday }) => {
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

const { fields, append, remove } = useFieldArray({
	control,
	name: `${weekday}`,
});

const [meal, setMeal] = useState({
	// id: 0,
	image: "",
	main: "",
	mainname: "",
	maindescription: "",
	side: "",
	sidename: "",
	sidedescription: "",
});

	const dayMainChange = (e) => {
		let obj = main_recipes.find((o) => o._id === e.target.value);
		let mainItems = {};
		mainItems = {
			image: obj.image,
			main: e.target.value,
			mainname: obj.name,
			maindescription: obj.description,
		};
		setMeal((meal) => ({
			...meal,
			...mainItems,
		}));

		document.getElementById("dayMainDescInput").value = obj.description;
//		console.log("GETMealmain", meal);
	};
	const daySideChange = (e) => {
		let obj = side_recipes.find((o) => o._id === e.target.value);
		let sideItems = {};
		sideItems = {
			side: e.target.value,
			sidename: obj.name,
			sidedescription: obj.description,
		};
		setMeal((meal) => ({
			...meal,
			...sideItems,
		}));

		document.getElementById("daySideDescInput").value = obj.description;
//		console.log("GETMealside", meal);
	};

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
					<Stack>
						<Stack direction='row'>
							<Grid item xs={5} lg={5}>
								<Stack>
									<TextField
										select
										value={meal.main}
										name='daymain'
										label='Main meal'
										size='small'
										sx={{ width: "100%" }}
										// error={!!error}
										onChange={(event) => {
											dayMainChange(event);
										}}
									>
										{main_recipes.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
									</TextField>
									<TextField
										id='dayMainDescInput'
										defaultValue={meal.maindescription}
										onChange={(e) => {
											setMeal({
												...meal,
												maindescription: e.target.value,
											});
										}}
										size='small'
										fullWidth
										minRows={3}
										multiline
									/>
								</Stack>
							</Grid>
							<Grid item xs={5} lg={5}>
								<Stack>
									<TextField
										select
										value={meal.side}
										onChange={(event) => {
											daySideChange(event);
										}}
										label='Side meal'
										name='dayside'
										size='small'
										sx={{ width: "100%" }}
									>
										{side_recipes.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
									</TextField>

									<TextField
										id='daySideDescInput'
										defaultValue={meal.sidedescription}
										onChange={(e) => {
											setMeal({
												...meal,
												sidedescription: e.target.value,
											});
										}}
										size='small'
										fullWidth
										minRows={3}
										multiline
									/>
								</Stack>
							</Grid>
							<Grid item xs={2} lg={2}>
								<Button
									sx={{
										display: "flex",
										gap: "2rem",
									}}
									variant='contained'
									color='primary'
									type='button'
									onClick={() => {
										
										append({
											...meal,
										
										}),
											setMeal({
												image: "",
												main: "",
												mainname: "",
												maindescription: "",
												side: "",
												sidename: "",
												sidedescription: "",
											}),
											console.log("appendedmeal", meal),
											(document.getElementById("dayMainDescInput").value = ""),
											(document.getElementById("daySideDescInput").value = "");
									}}
									disabled={meal.main === "" && meal.side === ""}
								>
									Add Meal
								</Button>
							</Grid>
						</Stack>
					</Stack>
				</Grid>
			</Stack>
			{/* // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
			<Controller
				name={weekday}
				control={control}
				render={({ fieldState: { error } }) => (
					<List dense='true'>
						{fields.map(
							(
								{
									image,
									main,
									maindescription,
									mainname,
									side,
									sidedescription,
									sidename,
								},
								index
							) => {
								{/* console.log("List", fields[0]); */}
								return (
									<ListItem>
										<Grid width='95%'>
											<Stack direction='row' width='100%'>
												<Grid item xs={9} lg={9}>
													<Stack>
														<Stack direction='row'>
															<Typography fontWeight='700'>
																{mainname}
															</Typography>
															{side && (
																<Typography fontWeight='700'>
																	&nbsp; {`& ${sidename}`}
																</Typography>
															)}
														</Stack>
														<Typography>{maindescription}</Typography>
														{side && (
															<Typography>
																{` Served with ${sidedescription}`}
															</Typography>
														)}
													</Stack>
												</Grid>
												<Grid item xs={3} lg={3}>
													<Stack direction='row'>
														<Card sx={{ width: 100, p: 0.5 }}>
															<CardMedia
																component='img'
																image={image}
																alt='Meal image'
																height='100px'
															/>
														</Card>
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
															onClick={() => {
																// console.log("index", id),
																remove(main),
																	setMeal({
																		image: "",
																		main: "",
																		mainname: "",
																		maindescription: "",
																		side: "",
																		sidename: "",
																		sidedescription: "",
																	}),
																//	console.log("appendedmeal", meal),
																	(document.getElementById(
																		"dayMainDescInput"
																	).value = ""),
																	(document.getElementById(
																		"daySideDescInput"
																	).value = "");
															}}
														>
															<DeleteIcon />
														</IconButton>
													</Stack>
												</Grid>
											</Stack>
										</Grid>
									</ListItem>
								);
							}
						)}
					</List>
				)}
			/>
		</Grid>
	);
};

export default Day;

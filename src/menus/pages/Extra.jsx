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

import DeleteIcon from "@mui/icons-material/Delete";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";

import "./Listitem.css";

const Extra = ({ extra }) => {
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
			wednesday,
			thursday,
			friday,
			vegies,
			salads,
			soups,
		},
		dispatch,
	} = useMenuValue();

	const [record, setRecord] = useState(selected_menu[0]);

	const { fields, append, remove } = useFieldArray({
		control,
		name: `${extra}`,
	});
	//console.log("xtra record",record)

	const [meal, setMeal] = useState({
		image: "",
		main: "",
		mainname: "",
		maindescription: "",
	});

	//console.log("extra", extra);
	// let extraFields = [];
	let extraOptions = [];
	switch (extra) {
		case "vegies":
			//fields = [...record.vegies];
			extraOptions = [...vegie_recipes];
			break;
		case "salads":
			//fields = [...record.salads];
			extraOptions = [...salad_recipes];
			break;
		case "soups":
			//fields = [...record.soups];
			extraOptions = [...soup_recipes];
			break;
		case "sides":
			//fields = [...record.sides];
			extraOptions = [...side_recipes];
			break;
		default:
			fields = [];
	}
	//console.log("extraFields", extraFields);

	// const [meal, setMeal] = useState({
	// 	image: "",
	// 	main: "",
	// 	mainname: "",
	// 	maindescription: "",
	// });

	// const extraAppend = (meal) => {
	// //	console.log("Extraappend", extra);

	// 	switch (extra) {
	// 		case "vegies":
	// 			dispatch({ type: "UPDATE_VEGIES", meal })
	// 			break;
	// 		case "salads":
	// 			dispatch({ type: "UPDATE_SALADS", meal })
	// 			break;
	// 		case "soups":
	// 			dispatch({ type: "UPDATE_SOUPS", meal })
	// 			break;
	// 		default:
	// 			console.log("Invalid extra")
	// 	}
	// };
	// const extraRemove = (main) => {
	// //	console.log("Extraremove",extra)
	// 	switch (extra) {
	// 		case "vegies":
	// 			dispatch({ type: "DELETE_VEGIES", main });
	// 			break;
	// 		case "salads":
	// 			dispatch({ type: "DELETE_SALADS", main });
	// 			break;
	// 		case "soups":
	// 			dispatch({ type: "DELETE_SOUPS", main });
	// 			break;
	// 		default:
	// 			console.log("Invalid extra");
	// 	}
	// };

	const extraMainChange = (e) => {
	//	console.log("E", e.target.value)
		let obj = {}

switch (extra) {
	case "vegies":
		obj = vegie_recipes.find((o) => o._id === e.target.value);
		break;
	case "salads":
		obj = salad_recipes.find((o) => o._id === e.target.value);
		break;
	case "soups":
		obj = soup_recipes.find((o) => o._id === e.target.value);
		break;
	case "sides":
		obj = side_recipes.find((o) => o._id === e.target.value);
		break;
	default:
		obj = {};
}

		let extraItems = {};
		extraItems = {
			image: obj.image,
			main: e.target.value,
			mainname: obj.name,
			maindescription: obj.description,
		};
		setMeal((meal) => ({
			...meal,
			...extraItems,
		}));

		document.getElementById("extraMainDescInput").value = obj.description;
	//	console.log("GETMealmain", meal);
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
							~ {extra.charAt(0).toUpperCase() + extra.slice(1)} ~
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
										name='extramain'
										label='Main meal'
										size='small'
										sx={{ width: "100%" }}
										// error={!!error}
										onChange={(event) => {
											extraMainChange(event);
										}}
									>
										{extraOptions.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
									</TextField>
									<TextField
										id='extraMainDescInput'
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
											}),
											console.log("appendedmeal", meal),
											(document.getElementById("extraMainDescInput").value =
												"");
									}}
									disabled={meal.main === ""}
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
				name={extra}
				control={control}
				render={({ fieldState: { error } }) => (
					<List>
						{fields.map(({ image, main, mainname, maindescription }, index) => {
							{
								/* console.log("List", extraFields); */
							}
							return (
								<ListItem>
									<Grid width='95%'>
										<Stack direction='row' width='100%'>
											<Grid item xs={9} lg={9}>
												<Stack>
													<Stack direction='row'>
														<Typography fontWeight='700'>{mainname}</Typography>
													</Stack>
													<Typography>{maindescription}</Typography>
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
																}),
																(document.getElementById(
																	"extraMainDescInput"
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
						})}
					</List>
				)}
			/>
		</Grid>
	);
};

export default Extra;

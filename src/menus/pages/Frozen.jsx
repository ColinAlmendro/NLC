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
	Card,
	CardMedia,
	IconButton,
} from "@mui/material";
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

import "./Listitem.css";

const Frozen = ({ weekday }) => {
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
		},
		dispatch,
	} = useMenuValue();

	const { fields, append, remove } = useFieldArray({
		control,
		name: `${weekday}`,
	});

	const [meal, setMeal] = useState({
		image: "",
		main: "",
		mainname: "",
		maindescription: "",
		side: "",
		sidename: "",
		sidedescription: "",
		count: 1,
		cost: 0,
		price: 0,
	});

	const dayMainChange = (e) => {
		let obj = frozen_recipes.find((o) => o._id === e.target.value);
		let mainItems = {};
		mainItems = {
			image: obj.image,
			main: e.target.value,
			mainname: obj.name,
			maindescription: obj.description,
			count: 1,
			cost: obj.cost,
			price: obj.price,
		};
		setMeal((meal) => ({
			...meal,
			...mainItems,
		}));

		document.getElementById("dayMainDescInput").value = obj.description;
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
	};

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
							Frozen Meals
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} lg={12}>
					<Stack>
						<Stack direction='row' spacing={2}>
							<Grid item xs={5} lg={5}>
								<Stack>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={meal.main}
											name='daymain'
											label='Main meal'
											size='small'
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												width: "100%",
												border: "1px solid",
											}}
											// error={!!error}
											onChange={(event) => {
												dayMainChange(event);
											}}
										>
											{frozen_recipes.map((item) => (
												<MenuItem key={item._id} value={item._id}>
													{item.name}
													{item.premium > 0 && (
														<StarOutlineIcon
															style={{ color: "green" }}
															sx={{ pb: 1, ml: 1 }}
														/>
													)}
												</MenuItem>
											))}
										</TextField>
									</Box>
									<Box bgcolor='primary.light' p={0}>
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
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												width: "100%",
												border: "1px solid",
											}}
										/>
									</Box>
								</Stack>
							</Grid>
							<Grid item xs={5} lg={5}>
								<Stack>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={meal.side}
											onChange={(event) => {
												daySideChange(event);
											}}
											label='Side meal'
											name='dayside'
											size='small'
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												width: "100%",
												border: "1px solid",
											}}
										>
											{side_recipes.map((item) => (
												<MenuItem key={item._id} value={item._id}>
													{item.name}
												</MenuItem>
											))}
										</TextField>
									</Box>
									<Box bgcolor='primary.light' p={0}>
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
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												width: "100%",
												border: "1px solid",
											}}
										/>
									</Box>
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
					<List dense={true}>
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
								return (
									<ListItem key={index}>
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

export default Frozen;

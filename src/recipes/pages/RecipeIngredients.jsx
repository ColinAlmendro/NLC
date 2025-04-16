import React, { useContext, useState, useEffect } from "react";
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
	InputLabel,
	IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";

import { NumericFormat } from "react-number-format";
import { AuthContext } from "../../shared/context/auth-context";
import { useValue } from "../../shared/context/SettingsProvider.js";
import "./Listitem.css";
import { makeStyles } from "@mui/styles";
import { toast } from "sonner";

const useStyles = makeStyles({
	label: {
		color: "#212121",
		fontSize: 12,
		"&.Mui-focused": {
			color: "darkred",
		},
	},
});

const RecipeIngredients = (params) => {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const { state, dispatch } = useValue();
	const [isLoading, setIsLoading] = useState(false);
	const [addItemDisabled, setAddItemDisabled] = useState(true);
	const [qtyDisabled, setQtyDisabled] = useState(true);
	const [ingredientCategoryList, setIngredientCategoryList] = useState(
		state.ingredient_category_list
	);
	const [typeOptions, setTypeOptions] = useState([]);
	const { control } = useFormContext();

	const [ingredientsList, setIngredientsList] = useState([]);
	const [filteredIngredientsList, setFilteredIngredientsList] = useState([]);

	const [ingredientItem, setIngredientItem] = useState({
		category: "",
		ingredient: "",
		amount: "",
		qty: 0,
		cost: 0,
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: `ingredients`,
	});

	useEffect(() => {
		let arrayCopy = [...ingredientCategoryList];
		arrayCopy.map((type) => {
			type.value = type.value;
			type.label = type.value.charAt(0).toUpperCase() + type.value.slice(1);
		});
		setTypeOptions(arrayCopy);
	}, []);
	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	useEffect(() => {
		
		async function fetchIngredients() {
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				setIngredientsList(data.ingredients);
				
				setIsLoading(false);
			} catch (err) {
			
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchIngredients();
	}, []);

	const onChangeCategory = (event) => {
		let filteredIngredients = ingredientsList;
		filteredIngredients = filteredIngredients.filter(
			(item) => item.category === event.target.value
		);

		setIngredientItem({
			...ingredientItem,
			category: event.target.value,
		});
		setFilteredIngredientsList(filteredIngredients);
	};
	const onChangeQty = (event) => {
		let qty = event.target.value;
		let qtyCost = 0;
		let ingred = ingredientsList.find(
			(item) => item._id === ingredientItem.ingredient
		);

		qtyCost = qty * ingred.price;
		qtyCost = qtyCost.toFixed(2);
		setIngredientItem({
			...ingredientItem,
			qty: event.target.value,
			cost: qtyCost,
		});

		setAddItemDisabled(false);
	};

	let ingredientName = "";
	let ingredientDescription = "";
	let itemCost = 0;

	return (
		<Grid item xs={12} lg={12}>
			<Stack direction='row' spacing={2}>
				<Grid item xs={2} lg={2}>
					<InputLabel sx={{ textAlign: "left" }} className={classes.label}>
						Category
					</InputLabel>
					<Box bgcolor='primary.light' p={0}>
						<TextField
							select
							value={ingredientItem.category}
							name='categorySelect'
							size='small'
							onChange={(event) => {
								onChangeCategory(event), setQtyDisabled(true);
							}}
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
							{typeOptions.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Grid>
				<Grid item xs={5} lg={5}>
					<InputLabel sx={{ textAlign: "left" }} className={classes.label}>
						Ingredient
					</InputLabel>
					<Box bgcolor='primary.light' p={0}>
						<TextField
							select
							value={ingredientItem.ingredient}
							name='ingredientSelect'
							size='small'
							onChange={(event) => {
								setIngredientItem({
									...ingredientItem,
									ingredient: event.target.value,
								}),
									setQtyDisabled(
										!ingredientItem.ingredient === "" ? true : false
									);
							}}
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
							{filteredIngredientsList.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}&nbsp;-&nbsp;{item.description}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Grid>
				<Grid item xs={2} lg={2}>
					<InputLabel sx={{ textAlign: "left" }} className={classes.label}>
						Amount
					</InputLabel>
					<Box bgcolor='primary.light' p={0}>
						<TextField
							value={ingredientItem.amount}
							onChange={(event) => {
								setIngredientItem({
									...ingredientItem,
									amount: event.target.value,
								});
							}}
							name='ingredientAmount'
							size='small'
							fullwidth='true'
							sx={{
								"& fieldset": { border: "none" },
								"& .MuiInputBase-root": {
									"& input": {
										textAlign: "left",
									},
								},

								border: "1px solid",
							}}
						/>
					</Box>
				</Grid>
				<Grid item xs={1} lg={1}>
					<InputLabel sx={{ textAlign: "left" }} className={classes.label}>
						Qty / Kg
					</InputLabel>
					<Box bgcolor='primary.light' p={0}>
						<NumericFormat
							customInput={TextField}
							value={ingredientItem.qty}
							onChange={(event) => {
								onChangeQty(event);
							}}
							name='itemQty'
							thousandSeparator=','
							decimalSeparator='.'
							decimalScale={2}
							size='small'
							disabled={qtyDisabled}
							sx={{
								"& fieldset": { border: "none" },
								"& .MuiInputBase-root": {
									"& input": {
										textAlign: "left",
									},
								},

								border: "1px solid",
							}}
						/>
					</Box>
				</Grid>
				<Grid item xs={1} lg={1}>
					<InputLabel sx={{ textAlign: "left" }} className={classes.label}>
						Cost Kg/L
					</InputLabel>
					<Box bgcolor='primary.light' p={0}>
						<TextField
							value={ingredientItem.cost}
							name='ingredientCost'
							size='small'
							sx={{
								"& fieldset": { border: "none" },
								"& .MuiInputBase-root": {
									"& input": {
										textAlign: "left",
									},
								},

								border: "1px solid",
							}}
						/>
					</Box>
				</Grid>
				<Grid item xs={1} lg={1}>
					<Button
						sx={{
							gap: "2rem",
							mt: 3,
						}}
						variant='contained'
						color='primary'
						type='button'
						disabled={addItemDisabled}
						onClick={() => {
							append({
								...ingredientItem,
							}),
								params.setTotalCost(
									params.totalCost + Number(ingredientItem.cost)
								),
								setIngredientItem({
									category: "",
									ingredient: "",
									amount: "",
									qty: "",
									cost: "",
								}),
								setAddItemDisabled(true);
						}}
					>
						Add
					</Button>
				</Grid>
			</Stack>

			{/* // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
			{fields.length > 0 && (
				<Box sx={{ border: 1, mt: 2 }}>
					<Grid width='100%'>
						<Stack direction='row' width='100%'>
							<Grid item xs={1} lg={1}>
								<InputLabel
									sx={{ textAlign: "left", pl: 2 }}
									className={classes.label}
								>
									Amount
								</InputLabel>
							</Grid>
							<Grid item xs={7} lg={7}>
								<InputLabel
									sx={{ textAlign: "left", pl: 2 }}
									className={classes.label}
								>
									Ingredient
								</InputLabel>
							</Grid>

							<Grid item xs={1} lg={1}>
								<InputLabel
									sx={{ textAlign: "left" }}
									className={classes.label}
								>
									Quantity
								</InputLabel>
							</Grid>
							<Grid item xs={1} lg={1}>
								<InputLabel
									sx={{ textAlign: "left" }}
									className={classes.label}
								>
									Cost
								</InputLabel>
							</Grid>
							<Grid item xs={2} lg={2}></Grid>
						</Stack>
					</Grid>

					<Controller
						name={"ingredients"}
						control={control}
						render={({ fieldState: { error } }) => (
							<List dense={true}>
								{fields.map(
									({ category, ingredient, amount, qty, cost }, index) => {
										{
											

											if (ingredient.name === undefined) {
												let currIngredient = ingredientsList.find(
													(item) => item._id === ingredient
												);
												

												if (currIngredient !== undefined) {
													ingredientName = currIngredient.name;
													ingredientDescription = currIngredient.description;
													itemCost =
														qty * Number(currIngredient.price).toFixed(2);
												} else {
													ingredientName = "???";
													ingredientDescription = "";
													itemCost = qty * Number(ingredient.price);
												}
											} else {
												ingredientName = ingredient.name;
												ingredientDescription = ingredient.description;
												itemCost = qty * Number(ingredient.price);
											}
										}
										return (
											<ListItem key={`${index}_${fields.length}`}>
												<Grid width='100%'>
													<Stack direction='row' width='100%'>
														<Grid item xs={1} lg={1}>
															<Typography fontWeight='500'>{amount}</Typography>
														</Grid>
														<Grid item xs={7} lg={7}>
															<Stack direction='row'>
																<Typography fontWeight='500'>
																	{ingredientName}
																</Typography>
																&nbsp;-&nbsp;
																<Typography fontWeight='300'>
																	{ingredientDescription}
																</Typography>
															</Stack>
														</Grid>

														<Grid
															item
															xs={1}
															lg={1}
															sx={{ textAlign: "left", pl: 1 }}
														>
															<Typography fontWeight='500'>{qty}</Typography>
														</Grid>
														<Grid
															item
															xs={1}
															lg={1}
															sx={{ textAlign: "left", pl: 1 }}
														>
															<Typography fontWeight='500'>
																{itemCost.toFixed(2)}
															</Typography>
														</Grid>
														<Grid item xs={2} lg={2}>
															<IconButton
																sx={{
																	height: 15,
																	m: 0,
																	p: 0,
																}}
																size='small'
																variant='outlined'
																color='error'
																type='button'
																onClick={() => {
																	// console.log(
																	// 	"removecost",
																	// 	params.totalCost,
																	// 	ingredientItem.cost
																	// ),
																		params.setTotalCost(
																			params.totalCost -
																				Number(ingredientItem.cost)
																		),
																		remove(index),
																		setIngredientItem({
																			category: "",
																			ingredient: "",
																			amount: "",
																			qty: "",
																			cost: "",
																		});
																}}
															>
																<DeleteIcon />
															</IconButton>
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
				</Box>
			)}
		</Grid>
	);
};

export default RecipeIngredients;

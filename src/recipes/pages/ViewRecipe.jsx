import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Typography,
	Box,
	Divider,
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
	IconButton,
	MenuItem,
	FormLabel,
	FormControl,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListSubheader,
	Tabs,
	Tab,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
	Collapse,
} from "@mui/material";
// import { IconButton, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// import { useMenuValue } from "../../shared/context/MenuProvider.js";
// import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
// import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { useRecipeValue } from "../../shared/context/RecipeProvider.js";

import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ViewRecipe.css";
import "./Listitem.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	label: {
		color: "#212121",
		fontSize: 12,
		"&.Mui-focused": {
			color: "darkred",
		},
	},
});

function ViewRecipe(props) {
	const [isLoading, setIsLoading] = useState(false);
	const classes = useStyles();
	const pdfRef = useRef();

	// const {
	// 	menuState: { menus, selected_menu, promotions },
	// 	dispatchMenu,
	// } = useMenuValue();
	// const {
	// 	customersState: { customers, selected_customer },
	// 	dispatchCustomer,
	// } = useCustomersValue();
	const {
		recipeState: { recipes, selected_recipe },
		dispatchRecipe,
	} = useRecipeValue();

	const [record, setRecord] = useState(selected_recipe[0]);
	const { openViewPopup, setOpenViewPopup } = props;
	const [open, setOpen] = useState(false);
	// const [period, setPeriod] = useState(null);
	// let selDate = new Date();
	// if (record) {
	// 	selDate = new Date(selected_menu[0].date);
	// } else {
	// 	selDate = new Date();
	// }
	// const [selectedDate, setSelectedDate] = useState(selDate);
	console.log("loadrecord", record);
	const [servingsCount, setServingsCount] = useState(record.feeds);
	const [unitCost, setUnitCost] = useState(record.cost);
	const [totalCost, setTotalCost] = useState(record.cost * record.feeds);
	let recordCost = 0;

	let recipe = {};
	if (record) {

		recipe = {
			...record,
		};
		console.log("recipe", recipe);
	} else {

		recipe = {
			category: "",
			freezable: "",
			name: "",
			description: "",
			ingredients: [],
			instructions: "",
			image: "",
			feeds: "",
			url: "",
			premium: "",
			cost: "",
			price: "",
		};
	}

	
	const decrementServings = () => {
		setServingsCount(servingsCount - 1);
			//setUnitCost(totalCost / servingsCount);
	};
	const incrementServings = () => {
		setServingsCount(servingsCount + 1);
			//setUnitCost(totalCost / servingsCount);
	};

	const calcIngredientAmount = (amount, qty) => {
		let ingredientAmount = 0;
		let ingredientUnit = "gr";
		let pattern = /l/;
		const res = (qty / record.feeds) * servingsCount;
		//console.log("res", res);
		if (res < 1) {
			
			ingredientAmount = Math.round(res * 1000);
			console.log("res-1", res, ingredientAmount);
			// ingredientAmount = res.toFixed(2);
			//ingredientAmount = res;
			pattern.test(amount) ? (ingredientUnit = "ml") : (ingredientUnit = "gr");
		} else {
			console.log("res+1", res);
			 Number.isInteger(res)
			 	? (ingredientAmount = Math.round(res))
			 	: (ingredientAmount = res.toFixed(2));
			//  ingredientAmount = res.toFixed(2);
			  console.log("res+1", res, ingredientAmount);
			//ingredientAmount = res;
			pattern.test(amount) ? (ingredientUnit = "L") : (ingredientUnit = "Kg");
			
		}
		// return `${Math.round(ingredientAmount)} ${ingredientUnit}`;
		return `${ingredientAmount} ${ingredientUnit}`;
	};

	const calcIngredientCost = (cost) => {
		console.log("cost", cost);
		 const res = (cost / record.feeds) * servingsCount;
		//const res = cost * servingsCount;
		console.log("res", res);
return res.toFixed(2);
		// return Math.round(res);
	};
let cost = 0;
	useEffect(() => {
		console.log("useEffectView", unitCost, totalCost, record.cost, record.feeds, servingsCount);
		
		// setTotalCost( (record.cost / record.feeds) * servingsCount);
		setTotalCost(unitCost* servingsCount);
		//setUnitCost(totalCost / servingsCount);

	}, [incrementServings,decrementServings]);

	const createPDF = async () => {
	
		const input = pdfRef.current;
		html2canvas(input, { useCORS: true }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 30;
			pdf.addImage(
				imgData,
				"PNG",
				imgX,
				imgY,
				imgWidth * ratio,
				imgHeight * ratio
			);
			pdf.save(`Recipe_${recipe.name}.pdf`);
		});
	};
	let ingredientName = "";
	let ingredientDescription = "";
	

	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<Container sx={{ border: "none" }}>
				<Paper>
					<Box display='flex' p={0}>
						<Stack>
							<Grid
								container
								rowSpacing={0}
								columnSpacing={0}
								sx={{ border: "none" }} //1px solid
							>
								{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
								<Grid item xs={12} lg={12}>
									<Stack direction='row'>
										<Grid item xs={12} lg={10}></Grid>
										<Grid item xs={2} lg={2}>
											<Stack direction='row' spacing={1}>
												<Button
													sx={{ gap: "1rem" }}
													// width='100px'
													variant='contained'
													color='error'
													autoFocus
													onClick={() => {
														setOpenViewPopup(false);
														setOpen(false);
													}}
												>
													Cancel
												</Button>
												<Button
													sx={{ display: "flex", gap: "1rem" }}
													// width='100px'
													variant='contained'
													color='success'
													type='button'
													onClick={() => {
														createPDF();
														setOpenViewPopup(false);
														setOpen(false);
													}}
												>
													Export
												</Button>
											</Stack>
										</Grid>
									</Stack>
								</Grid>
							</Grid>
							<br />
							{/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                         RECIPE  */}
							<div
								ref={pdfRef}
								style={{ width: "770px", margin: "0px", border: "1px solid" }}
							>
								{/* <Divider sx={{ my: 2 }} /> */}
								<Stack gap={2}>
									<Grid item xs={12} lg={12}>
										<Box
											sx={{
												mx: "auto",
												textAlign: "center",
												p: 0,
												mt: 3,
											}}
										>
											<Typography fontWeight='700' variant='h5'>
												{recipe.name}
											</Typography>
										</Box>
									</Grid>
									{/* <br /> */}
									<Stack direction='row' gap={2}>
										{recipe.image && (
											<Box
												sx={{
													my: 2,
													mx: 2,
													display: "flex",
													justifyContent: "center",
												}}
											>
												<Card sx={{ maxWidth: 345 }}>
													<CardMedia
														component='img'
														image={recipe.image}
														alt='Image'
													/>
												</Card>
											</Box>
										)}
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Servings
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<div>
													<IconButton onClick={decrementServings}>
														<RemoveCircleOutlineIcon />
													</IconButton>
													<span className='count'>{servingsCount}</span>

													<IconButton onClick={incrementServings}>
														<AddCircleOutlineIcon />
													</IconButton>
												</div>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "center", fontWeight: "bold" }}
												className={classes.label}
											>
												Freezable
											</InputLabel>
											<Box bgcolor='primary.light' p={1}>
												<p>{recipe.freezable}</p>
											</Box>
										</div>
									</Stack>

									<div>
										<InputLabel
											sx={{ textAlign: "left", fontWeight: "bold" }}
											className={classes.label}
										>
											Description
										</InputLabel>
										<Box bgcolor='primary.light' p={0}>
											{/* <p>{recipe.description}</p> */}
											<TextField
												value={recipe.description}
												fullWidth
												minRows={1}
												//maxRows={10}
												multiline='true'
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
									</div>

									{/* 77777777777777777777777777777777777777777777777777777777777777777777777777777777777     INGREDIENTS */}
									<div>
										<InputLabel
											sx={{ textAlign: "left", fontWeight: "bold" }}
											className={classes.label}
										>
											Ingredients
										</InputLabel>
										{/* <RecipeIngredients
										totalCost={totalCost}
										setTotalCost={setTotalCost}
									/> */}
										<List
											dense='true'
											// style={{
											// 	width: "770px",
											// 	margin: "0px",
											// 	border: "1px solid",
											// }}
										>
											{/* {console.log("fields", fields)} */}
											{recipe.ingredients.map(
												({ cost, ingredient, amount, qty }, index) => {
													{
														console.log("curr", qty);
														console.log("currname", ingredient.name);
														//console.log("currilist", ingredientsList);
														amount = calcIngredientAmount(amount, qty);
														console.log("newr", amount);
														cost = calcIngredientCost(cost);
													}
													return (
														<ListItem
															key={`${index}_${recipe.ingredients.length}`}
														>
															<Grid
																container
																rowSpacing={0}
																columnSpacing={0}
																sx={{ border: "none" }}
															>
																<Grid item xs={2} lg={2}>
																	{amount}
																</Grid>
																<Grid item xs={9} lg={9}>
																	{`${ingredient.name} ${ingredient.description}`}
																</Grid>

																<Grid item xs={1} lg={1}>
																	{/* R{cost.toFixed(2)}
																	 */}
																	{cost}
																</Grid>
															</Grid>
														</ListItem>
													);
												}
											)}
										</List>
									</div>
									{/*777777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}

									{/* <Divider sx={{ mt: 2 }} /> */}
									<Box display='flex' gap={2}>
										<div style={{ width: "100%" }}>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Instructions
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<p>{recipe.description}</p>
											</Box>
										</div>
									</Box>

									<Stack direction='row' gap={2}>
										{/* */}
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Original Servings
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<p>{recipe.feeds}</p>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Unit Cost
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<TextField
													value={Number(unitCost).toFixed(2)}
													name='cost'
													//control={control}
													//	label='Cost'
													size='small'
												/>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Total Cost
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<TextField
													value={Number(totalCost).toFixed(2)}
													name='totalcost'
													//control={control}
													//	label='Cost'
													size='small'
												/>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Premium
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<TextField
													name='premium'
													value={recipe.premium}
													//control={control}
													//	label='Premium'
													size='small'
												/>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold" }}
												className={classes.label}
											>
												Unit Price
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<TextField
													value={Number(recipe.price).toFixed(2)}
													name='price'
													//control={control}
													//	label='Price'
													size='small'
												/>
											</Box>
										</div>
									</Stack>
									<div>
										<InputLabel
											sx={{ textAlign: "left", fontWeight: "bold" }}
											className={classes.label}
										>
											Website
										</InputLabel>
										<Box bgcolor='primary.light' p={0}>
											<TextField
												value={recipe.url}
												name='url'
												fullWidth
												//control={control}
												//label='Website'
											/>
										</Box>
									</div>
								</Stack>
							</div>
						</Stack>
					</Box>
				</Paper>
			</Container>
		</>
	);
}
export default ViewRecipe;

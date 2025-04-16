import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Typography,
	Box,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	IconButton,
	List,
	ListItem,
	Grid,
	Card,
	CardMedia,
	CircularProgress,
} from "@mui/material";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useRecipeValue } from "../../shared/context/RecipeProvider.js";

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

	const {
		recipeState: { recipes, selected_recipe },
		dispatchRecipe,
	} = useRecipeValue();

	const [record, setRecord] = useState(selected_recipe[0]);
	const { openViewPopup, setOpenViewPopup } = props;
	const [open, setOpen] = useState(false);

	//console.log("loadrecord", record);
	const ingredientsPrice = record.ingredients.reduce((accumulator, item) => {
		//console.log("accumulator", item);
		return (accumulator += item.ingredient.price * item.qty);
	}, 0);
	const [servingsCount, setServingsCount] = useState(record.feeds);
	const [unitCost, setUnitCost] = useState(ingredientsPrice / record.feeds);
	const [totalCost, setTotalCost] = useState(ingredientsPrice);

	let recipe = {};
	if (record) {
		recipe = {
			...record,
		};
		//console.log("recipe", recipe);
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
	};
	const incrementServings = () => {
		setServingsCount(servingsCount + 1);
	};

	const calcIngredientAmount = (amount, qty) => {
		let ingredientAmount = 0;
		let ingredientUnit = "gr";
		let pattern = /l/;
		const res = (qty / record.feeds) * servingsCount;

		if (res < 1) {
			ingredientAmount = Math.round(res * 1000);
			//console.log("res-1", res, ingredientAmount);

			pattern.test(amount) ? (ingredientUnit = "ml") : (ingredientUnit = "gr");
		} else {
			//console.log("res+1", res);
			Number.isInteger(res)
				? (ingredientAmount = Math.round(res))
				: (ingredientAmount = res.toFixed(2));

			//console.log("res+1", res, ingredientAmount);

			pattern.test(amount) ? (ingredientUnit = "L") : (ingredientUnit = "Kg");
		}

		return `${ingredientAmount} ${ingredientUnit}`;
	};

	const calcIngredientCost = (cost) => {
		//console.log("cost", cost);
		const res = (cost / record.feeds) * servingsCount;

		//console.log("res", res);
		return res.toFixed(2);
	};
	let cost = 0;
	useEffect(() => {
		setTotalCost(unitCost * servingsCount);
	}, [incrementServings, decrementServings]);

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
								sx={{ border: "none" }}
							>
								{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
								<Grid item xs={12} lg={12}>
									<Stack direction='row'>
										<Grid item xs={12} lg={10}></Grid>
										<Grid item xs={2} lg={2}>
											<Stack direction='row' spacing={1}>
												<Button
													sx={{ gap: "1rem" }}
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
								style={{ width: "760px", margin: "0px", padding:"15px", border: "0px solid" }}
							>
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
														style={{ border: "1px solid" }}
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
											sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
											className={classes.label}
										>
											Description
										</InputLabel>
										<Box bgcolor='primary.light' p={0} m={1}>
											<TextField
												value={recipe.description}
												fullWidth
												minRows={1}
												multiline={true}
												sx={{
													"& fieldset": { border: "none" },
													"& .MuiInputBase-root": {
														"& input": {
															textAlign: "left",
														},
													},
												}}
											/>
										</Box>
									</div>

									{/* 77777777777777777777777777777777777777777777777777777777777777777777777777777777777     INGREDIENTS */}
									<div>
										<InputLabel
											sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
											className={classes.label}
										>
											Ingredients
										</InputLabel>
										<Box bgcolor='primary.light' p={0} m={1}>
											<List dense={true}>
												{recipe.ingredients.map(
													({ cost, ingredient, amount, qty }, index) => {
														{
															amount = calcIngredientAmount(amount, qty);
															//console.log("newr", amount);
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
																		{cost}
																	</Grid>
																</Grid>
															</ListItem>
														);
													}
												)}
											</List>
										</Box>
									</div>
									{/*777777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}

									<Box display='flex' gap={2}>
										<div style={{ width: "100%" }}>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Instructions
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												<p>{recipe.description}</p>
											</Box>
										</div>
									</Box>

									<Stack direction='row' gap={2}>
										{/* */}
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Original Servings
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												<p>{recipe.feeds}</p>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Unit Cost
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												{/* <TextField
													value={Number(unitCost).toFixed(2)}
													name='cost'
													size='small'
												/> */}
												<p>{Number(unitCost).toFixed(2)}</p>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Total Cost
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												{/* <TextField
													value={Number(totalCost).toFixed(2)}
													name='totalcost'
													size='small'
												/> */}
												<p>{Number(unitCost).toFixed(2)}</p>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Premium
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												{/* <TextField
													name='premium'
													value={recipe.premium}
													size='small'
												/> */}
												<p>{recipe.premium}</p>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left", fontWeight: "bold", mx: 1 }}
												className={classes.label}
											>
												Unit Price
											</InputLabel>
											<Box bgcolor='primary.light' p={0} m={1}>
												{/* <TextField
													value={Number(recipe.price).toFixed(2)}
													name='price'
													size='small'
												/> */}
												<p>{Number(recipe.price).toFixed(2)}</p>
											</Box>
										</div>
									</Stack>
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

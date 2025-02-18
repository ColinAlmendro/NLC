import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Typography, Box, Divider } from "@mui/material";
import * as Yup from "yup";
import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { useRecipeValue } from "../../shared/context/RecipeProvider.js";
import { AuthContext } from "../../shared/context/auth-context";
import { useValue } from "../../shared/context/SettingsProvider.js";

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
	Grid,
	InputLabel,
	Button,
	MenuItem,
	List,
	ListItem,
	Card,
	CardMedia,
	CircularProgress,
	Radio,
	Checkbox,
} from "@mui/material";

// import { categoryOptions, freezableOptions } from "./utils/constants";
// import { unitOptions } from "./utils/constants";
// import { typeOptions } from "./utils/constants";
import RecipeIngredients from "./RecipeIngredients.jsx";
import FieldInputSelect from "./FieldInputSelect";
import FieldInputText from "./FieldInputText";
import FieldInputTextarea from "./FieldInputTextarea";
// import { NumericFormat } from "react-number-format";
import "./Listitem.css";
import { makeStyles } from "@mui/styles";
import { toast } from "sonner";

const useStyles = makeStyles({
	label: {
		color: "#212121",
		"&.Mui-focused": {
			color: "darkred",
		},
	},
});

const validationSchema = Yup.object()
	.shape({
		category: Yup.string()
			.required()
			.label("Category")
			.typeError("Category required"),
		freezable: Yup.string()
			.required()
			.label("Freezable")
			.typeError("Freezable required"),
		// image: Yup.mixed()
		// 	.test("fileType", "Unsupported file format", (value) =>
		// 		["image/jpeg", "image/jpg", "image/png"].includes(value?.type)
		// 	)
		// 	.required("Images are required")
		// 	.label("Image")
		// 	.typeError("Image required"),
		name: Yup.string()
			.required()
			.label("Name")
			.typeError("Name required"),
		description: Yup.string()
			.required()
			.label("Description")
			.typeError("Description required"),
		// ingredients: Yup.array()
		// 	.of(
		// 		Yup.object().shape({
		// 			ingredient: Yup.string()
		// 				.required()
		// 				.label("Ingredient")
		// 				.typeError("Ingredient required"),
		// 			unit: Yup.string()
		// 				.required()
		// 				.label("Unit")
		// 				.typeError("Unit required"),
		// 			qty: Yup.number()
		// 				.required()
		// 				.label("Quantity")
		// 				.typeError("Quantity required"),
		// 		})
		// 	)
		// 	.required()
		// 	.min(1, "Ingredients are required")
		// 	.label("Ingredients")
		// 	.typeError("Ingredients required"),
		instructions: Yup.string()
			.required()
			.label("Instructions")
			.typeError("Instructions required"),
		feeds: Yup.number()
			.required()
			.label("Servings")
			.typeError("No. of servings required"),
		url: Yup.string()
			.notRequired()
			.label("Website"),
		premium: Yup.number()
			.required()
			.label("Premium")
			.typeError("Premium required"),
		// cost: Yup.number()
		// 	.nullable()
		// 	.positive()
		// 	.required()
		// 	.label("Cost")
		// 	.typeError("Cost required"),
		price: Yup.number()
			.nullable()
			.positive()
			.required()
			.label("Price")
			.typeError("Price required"),
	})
	.required();

function FormRecipe(props) {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const history = useNavigate();
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(true);
	const { state, dispatch } = useValue();
	const {
		recipeState: { recipes, selected_recipe },
		dispatchRecipe,
	} = useRecipeValue();

	const [record, setRecord] = useState(selected_recipe[0]);
	const [recipeTypeList, setRecipeTypeList] = useState(state.recipe_type_list);
const [typeOptions,setTypeOptions] = useState([]);

	// const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ingredientsList, setIngredientsList] = useState([]);
	const [filteredIngredientsList, setFilteredIngredientsList] = useState([]);
	const [recipeImage, setRecipeImage] = useState(null);
	const [recipeImagePreview, setRecipeImagePreview] = useState(null);
	const [servingsCount, setServingsCount] = useState(6);
	const [unitCost, setUnitCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	// const [freezable, setFreezable] = useState(null);
	let recordCost = 0;
	let defaultRecipe = {};
	if (record) {
		// console.log("ISrecordY", record);
		defaultRecipe = {
			...record,
		};
	} else {
		// console.log("ISrecordN", record);
		defaultRecipe = {
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

	const formProps = useForm({
		defaultValues: defaultRecipe,
		resolver: yupResolver(validationSchema),
		mode: "all",
	});

	const {
		register,
		handleSubmit,
		formState,
		control,
		reset,
		watch,
		setValue,
		getValues,
	} = formProps;

	const {
		errors,
		touchedFields,
		dirtyFields,
		isDirty,
		isValid,
		isSubmitting,
		isSubmitted,
		isSubmitSuccessful,
		submitCount,
	} = formState;

	const freezableOptions = [
		{ label: "No", value: "No" },
		{ label: "Yes", value: "Yes" },
	];

	useEffect(() => {
	let arrayCopy = [...recipeTypeList];
	arrayCopy.map((type) => {
		
			type.value = type.value;
			type.label = type.value.charAt(0).toUpperCase() + type.value.slice(1);
		
	});
	setTypeOptions(arrayCopy);
	}, []);
	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	useEffect(() => {
		if (record) {
			setRecipeImagePreview(record.image);
			setUnitCost(record.cost);
			setTotalCost(record.cost * record.feeds);
		} else {
			setRecipeImagePreview(null);
		}
	}, []);

	useEffect(() => {
		//console.log("servingsCount", servingsCount);
		setUnitCost(totalCost / servingsCount);
		setValue("feeds", servingsCount);
	}, [servingsCount]);

	useEffect(() => {
		setUnitCost(totalCost / servingsCount);

		setValue("cost", Number(unitCost).toFixed(2));
	}, [totalCost]);

	const handelImageChange = (event) => {
		let file = event.target.files[0];
		console.log("handlechangefile:", file);
		if (file) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setRecipeImage(reader.result), setRecipeImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setRecipeImagePreview(null);
		}
	};

	const uploadFile = async (file) => {
		setIsLoading(true);
		try {
			let imageUrl;

			const imgFile = new FormData();
			imgFile.append("file", file);
			imgFile.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
			imgFile.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
				{
					method: "post",
					body: imgFile,
				}
			);
			const imgData = await response.json();

			imageUrl = imgData.url.toString();
			console.log("cloudinary url:", imageUrl);

			setIsLoading(false);
			return imageUrl;
		} catch (error) {
			console.log("cloudinary upload error:", error);
			toast.error(error, {
				style: {
					background: "red",
					color: "white",
				},
			});
			toast.error(error, {
				style: {
					background: "red",
					color: "white",
				},
			});
			setIsLoading(false);
		}
	};

	// const toggleFreezable = () => {
	// 	// 👇️ Passed function to setState
	// 	setFreezable((current) => !current);
	// };
	const onInvalid = (errors) => console.error(errors);

	const onSubmit = async (data) => {
		console.log("clicked", data);

		const imgUrl = await uploadFile(recipeImagePreview);
		//	console.log("imgUrl", imgUrl);

		if (record) {
			try {
				setIsLoading(true);
				//	console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/recipes/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify({
							category: data.category,
							freezable: data.freezable,
							name: data.name,
							description: data.description,
							ingredients: data.ingredients,
							instructions: data.instructions,
							image: imgUrl,
							//feeds: data.feeds,
							feeds: servingsCount,
							url: data.url,
							premium: data.premium,
							cost: unitCost,
							// cost: data.cost,
							price: data.price,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					console.log("response error", dataEdit.message);
					toast.error(dataEdit.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					return data;
				}
				console.log("UpDate", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/recipes");
				//alert("Recipe updated");
				toast.success("Recipe updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.recipes;
			} catch (err) {
				console.log("Update err:", err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				console.log("in new submit");

				const responseNew = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/recipes/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							category: data.category,
							freezable: data.freezable,
							name: data.name,
							description: data.description,
							ingredients: data.ingredients,
							instructions: data.instructions,
							image: imgUrl,
							// feeds: data.feeds,
							feeds: servingsCount,
							url: data.url,
							premium: data.premium,
							cost: unitCost,
							// cost: data.cost,
							price: data.price,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/recipes");
				// alert("New recipe added");
				toast.success("New recipe added", {
					style: {
						background: "green",
						color: "white",
					},
				});
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				console.log("SubmitNew err:", err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}

		// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
		//console.log("XXXX", totalCost);
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
					{isLoading && <LoadingSpinner asOverlay />}

					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit, onInvalid)}>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={0}
									sx={{ border: "none" }} //1px solid
								>
									<Grid item xs={12} lg={12}>
										<Stack direction='row'>
											<Grid item xs={12} lg={10}>
												<Box
													sx={{
														mx: "auto",
														textAlign: "center",
														p: 2,
														m: 0,
													}}
												>
													<Typography fontWeight='700' variant='h5'>
														Recipe
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} lg={2}>
												<Button
													sx={{ gap: "1rem" }}
													variant='outlined'
													color='error'
													autoFocus
													onClick={() => {
														setOpen(false), setOpenPopup(false);
													}}
												>
													Cancel
												</Button>
												<Button
													sx={{ gap: "1rem" }}
													variant='outlined'
													color='success'
													type='submit'
												>
													Save
												</Button>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 2 }} />
									<Stack gap={2}>
										<Stack direction='row' gap={2}>
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Type
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputSelect
														name='category'
														//	label='Category'
														control={control}
														options={typeOptions}
													/>
												</Box>
											</div>
											<Controller
												name='image'
												control={control}
												render={({
													field: { onChange, value, ...field },
													fieldState: { error },
												}) => {
													return (
														<div>
															<InputLabel
																sx={{ textAlign: "left" }}
																className={classes.label}
															>
																Image
															</InputLabel>
															<Box bgcolor='primary.light' p={0}>
																<TextField
																	//sx={{ border: "none", width: "100%" }}
																	// {...field}
																	// value={value?.File}
																	onChange={(event) => {
																		onChange(event.target.files[0]);
																		handelImageChange(event);

																		console.log(
																			"onChange",
																			event.target.files[0]
																		);
																	}}
																	type='file'
																	id='image'
																	error={!!errors.image}
																	sx={{
																		"& fieldset": { border: "none" },
																		"& .MuiInputBase-root": {
																			"& input": {
																				textAlign: "left",
																			},
																		},
																		//width: "200px",
																		border: "1px solid",
																	}}
																/>

																{recipeImagePreview && (
																	<Box
																		sx={{
																			my: 2,
																			display: "flex",
																			justifyContent: "center",
																		}}
																	>
																		<Card sx={{ maxWidth: 345 }}>
																			<CardMedia
																				component='img'
																				image={recipeImagePreview}
																				alt='Preview'
																			/>
																		</Card>
																	</Box>
																)}
															</Box>
														</div>
													);
												}}
											/>

											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Freezable
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputSelect
														name='freezable'
														//	label='Freezable'
														control={control}
														options={freezableOptions}
													/>
												</Box>
											</div>
										</Stack>

										{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}

										<div>
											<InputLabel
												sx={{ textAlign: "left" }}
												className={classes.label}
											>
												Recipe Name
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText
													name='name'
													control={control}
													//label='Recipe Name'
												/>
											</Box>
										</div>
										<div>
											<InputLabel
												sx={{ textAlign: "left" }}
												className={classes.label}
											>
												Description
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText
													name='description'
													control={control}
													//	label='Recipe Description'
												/>
											</Box>
										</div>
										{/* </Stack> */}
										{/* <Divider sx={{ mt: 2 }} /> */}
										{/* 77777777777777777777777777777777777777777777777777777777777777777777777777777777777     INGREDIENTS */}
										<div>
											<InputLabel
												sx={{ textAlign: "left" }}
												className={classes.label}
											>
												Ingredients
											</InputLabel>
											<RecipeIngredients
												totalCost={totalCost}
												setTotalCost={setTotalCost}
											/>
										</div>
										{/*777777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}

										{/* <Divider sx={{ mt: 2 }} /> */}
										<Box display='flex' gap={2}>
											<div style={{ width: "100%" }}>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Instructions
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputTextarea
														name='instructions'
														//	label='Instructions'
														control={control}
													/>
												</Box>
											</div>
										</Box>

										<Stack direction='row' gap={2}>
											{/* */}
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Servings
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														name='feeds'
														control={control}
														value={servingsCount}
														//label='Servings'
														onChange={(event) => {
															//onChange(event.target.value);
															setServingsCount(event.target.value);

															console.log("onChangeFeeds", event.target.value);
														}}
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Unit Cost
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														value={Number(unitCost).toFixed(2)}
														name='cost'
														//	control={control}
														//	label='Cost'
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Total Cost
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														value={Number(totalCost).toFixed(2)}
														name='cost'
														//	control={control}
														//	label='Cost'
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Premium
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText
														name='premium'
														control={control}
														//	label='Premium'
													/>
												</Box>
											</div>
											<div>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Unit Price
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText
														name='price'
														control={control}
														//	label='Price'
													/>
												</Box>
											</div>
										</Stack>
										<div>
											<InputLabel
												sx={{ textAlign: "left" }}
												className={classes.label}
											>
												Website (optional)
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText
													name='url'
													control={control}
													//label='Website'
												/>
											</Box>
										</div>
									</Stack>
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
		</>
	);
}

export default FormRecipe;

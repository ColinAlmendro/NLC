import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Divider } from "@mui/material";
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
// import { useHttpClient } from "../../shared/hooks/http-hook";

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
	Grid,
	InputLabel,
	Button,
	MenuItem,
	List,
	ListItem,
	Card,
	CardMedia,
	CircularProgress,
} from "@mui/material";

import { categoryOptions } from "./utils/constants";
import { unitOptions } from "./utils/constants";
import FieldInputSelect from "./FieldInputSelect";
import FieldInputText from "./FieldInputText";
import FieldInputTextarea from "./FieldInputTextarea";
import { NumericFormat } from "react-number-format";
import "./Listitem.css";

const validationSchema = Yup.object()
	.shape({
		category: Yup.string()
			.required()
			.label("Category")
			.typeError("Category required"),
		image: Yup.mixed()
			.test("fileType", "Unsupported file format", (value) =>
				["image/jpeg", "image/png"].includes(value?.type)
			)
			.required("Images are required")
			.label("Image")
			.typeError("Image required"),
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
		cost: Yup.number()
			.nullable()
			.positive()
			.required()
			.label("Cost")
			.typeError("Cost required"),
		price: Yup.number()
			.nullable()
			.positive()
			.required()
			.label("Price")
			.typeError("Price required"),
	})
	.required();

function FormRecipe(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const history = useNavigate();
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(true);

	const {
		recipeState: { recipes, selected_recipe },
		dispatch,
	} = useRecipeValue();

	const [record, setRecord] = useState(selected_recipe[0]);

	// const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ingredientsList, setIngredientsList] = useState([]);
	const [recipeImage, setRecipeImage] = useState(null);
	const [recipeImagePreview, setRecipeImagePreview] = useState(null);

	let defaultRecipe = {};
	if (record) {
		console.log("ISrecordY", record);
		defaultRecipe = {
			...record,
		};
	} else {
		console.log("ISrecordN", record);
		defaultRecipe = {
			category: "",
			name: "",
			description: "",
			ingredients: [
				{
					ingredient: "",
					unit: "",
					qty: "",
				},
			],
			instructions: "",
			image: "",
			feeds: "",
			url: "",
			premium:"",
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
	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	useEffect(() => {
		if (record) {
			setRecipeImagePreview(record.image);
		} else {
			setRecipeImagePreview(null);
		}
	}, []);

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
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchIngredients();
	}, []);

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	useEffect(() => {
		const { ingredients } = fields;

		if (ingredients?.length) {
			ingredients.forEach((item, index) => {
				append({
					ingredient: item.id,
					unit: item.unit,
					qty: item.qty,
				});
				setValue(`ingredients[${index}].ingredient`, item.id);
				setValue(`ingredients[${index}].unit`, item.unit);
				setValue(`ingredients[${index}].qty`, item.qty);
			});
		}
	}, [setValue, append]);

	

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

			for (var [key, value] of imgFile.entries()) {
				console.log("imgFile »", key, value);
			}

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
			setIsLoading(false);
		}
	};

	const onSubmit = async (data) => {

		// console.log("clicked", data);

		const imgUrl = await uploadFile(recipeImagePreview);
		console.log("imgUrl", imgUrl);

		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
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
							name: data.name,
							description: data.description,
							ingredients: data.ingredients,
							instructions: data.instructions,
							image: imgUrl,
							feeds: data.feeds,
							url: data.url,
							premium:data.premium,
							cost: data.cost,
							price: data.price,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					console.log("response error", dataEdit.message);
					return data;
				}
				console.log("UpDate", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/recipes");
				alert("Recipe updated");
				return data.recipes;
			} catch (err) {
				console.log("Update err:", err);
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
							name: data.name,
							description: data.description,
							ingredients: data.ingredients,
							instructions: data.instructions,
							image: imgUrl,
							feeds: data.feeds,
							url: data.url,
							premium:data.premium,
							cost: data.cost,
							price: data.price,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/recipes");
				alert("New recipe added");
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				console.log("SubmitNew err:", err);
				setIsLoading(false);
			}
		}

		// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
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
			{/* <Dialog
				open={openPopup}
				onClose={() => {
					setOpenPopup(false);
					//setOpen(false), 
				}}
				aria-labelledby='dialog-title'
				aria-describedby='dialog-description'
				fullWidth
				maxWidth='lg'
				//show-close="false"
			>
				<DialogContent>
					<DialogActions></DialogActions> */}
			{/* 77&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7
			 */}
			<Container sx={{ border: "none" }}>
				<Paper>
					{isLoading && <LoadingSpinner asOverlay />}

					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}>
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
													// onClick={() => {
													// 	onSubmit();
													// }}
												>
													Save
												</Button>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 2 }} />
									<Stack gap={2}>
										<Stack direction='row' gap={2}>
											<FieldInputSelect
												name='category'
												label='Category'
												control={control}
												options={categoryOptions}
											/>
											<Controller
												name='image'
												control={control}
												render={({
													field: { onChange, value, ...field },
													fieldState: { error },
												}) => {
													return (
														<div>
															<TextField
																sx={{ border: "none", width: "100%" }}
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
														</div>
													);
												}}
											/>
										</Stack>

										<FieldInputText
											name='name'
											control={control}
											label='Recipe Name'
										/>
										<FieldInputText
											name='description'
											control={control}
											label='Recipe Description'
										/>
										{/* </Stack> */}
										<Divider sx={{ mt: 2 }} />

										{/* */}
										<Stack>
											<Controller
												name={`ingredients`}
												control={control}
												render={({ fieldState: { error } }) => (
													<List error={!!error}>
														{fields.map(
															(
																{ ingredient, unit, qty, canDelete, options },
																index
															) => {
																return (
																	<ListItem key={index}>
																		<Stack
																			gap={1}
																			sx={{ border: "none", width: "100%" }}
																			direction='row'
																		>
																			<Controller
																				name={`ingredients[${index}].ingredient`}
																				control={control}
																				defaultValue=''
																				render={({
																					field: { field, onChange, value },
																					fieldState: { error },
																				}) => (
																					<TextField
																						select
																						//	{...field}
																						//value={record ? value._id : value}
																						defaultValue={
																							record ? value._id : value
																						}
																						name={`ingredients[${index}].ingredient`}
																						label='Ingredient'
																						onChange={onChange}
																						size='small'
																						sx={{ width: "75%" }}
																						error={!!error}
																					>
																						{ingredientsList.map((item) => (
																							<MenuItem
																								key={item.id}
																								value={item.id}
																							>
																								{item.name}
																							</MenuItem>
																						))}
																					</TextField>
																				)}
																			/>

																			<Controller
																				name={`ingredients[${index}].unit`}
																				control={control}
																				defaultValue=''
																				render={({
																					field: { onChange, value },
																					fieldState: { error },
																				}) => (
																					<TextField
																						select
																						value={value}
																						defaultValue={value ? value : ""}
																						onChange={onChange}
																						label='Unit'
																						name={`ingredientsArray[${index}].unit`}
																						size='small'
																						sx={{ width: "300px" }}
																						error={!!error}
																					>
																						{unitOptions.map((option) => (
																							<MenuItem
																								key={option.value}
																								value={option.value}
																							>
																								{option.label}
																							</MenuItem>
																						))}
																					</TextField>
																				)}
																			/>

																			<Controller
																				name={`ingredients[${index}].qty`}
																				control={control}
																				render={({
																					field: { ref, ...rest },
																					fieldState: { error },
																				}) => (
																					<NumericFormat
																						customInput={TextField}
																						name={`ingredientsArray[${index}].qty`}
																						label='Quantity'
																						thousandSeparator=','
																						decimalSeparator='.'
																						decimalScale={2}
																						getInputRef={ref}
																						{...rest}
																						size='small'
																						sx={{ width: "200px" }}
																						error={!!error}
																					/>
																				)}
																			/>

																			<Button
																				type='button'
																				onClick={() => {
																					remove(index);
																				}}
																			>
																				Remove
																			</Button>
																		</Stack>
																	</ListItem>
																);
															}
														)}
														{error ? (
															<p style={{ color: "red" }}>{error.message}</p>
														) : null}
													</List>
												)}
											/>

											<Button
												type='button'
												onClick={() => {
													append({
														ingredient: "",
														unit: "",
														qty: "",
													});
												}}
											>
												Add Ingredient
											</Button>
										</Stack>
										<Divider sx={{ mt: 2 }} />
										<Box display='flex' gap={2}>
											<FieldInputTextarea
												name='instructions'
												label='Instructions'
												control={control}
											/>
										</Box>

										<Stack direction='row' gap={2}>
											{/* */}
											<FieldInputText
												name='feeds'
												control={control}
												label='Servings'
											/>
											<FieldInputText
												name='cost'
												control={control}
												label='Cost'
											/>
											<FieldInputText
												name='premium'
												control={control}
												label='Premium'
											/>
											<FieldInputText
												name='price'
												control={control}
												label='Price'
											/>
										</Stack>
										{/* <Divider sx={{ mt: 2 }} /> */}
										<FieldInputText
											name='url'
											control={control}
											label='Website'
										/>
									</Stack>
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
			{/* </DialogContent>
			</Dialog> */}
		</>
	);
}

export default FormRecipe;

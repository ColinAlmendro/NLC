import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
	Container,
	Paper,
	Stack,
	TextField,
	Grid,
	InputLabel,
	Button,
	Card,
	CardMedia,
	CircularProgress,
} from "@mui/material";

import RecipeIngredients from "./RecipeIngredients.jsx";
import FieldInputSelect from "../../components/controls/FieldInputSelect";
import FieldInputText from "../../components/controls/FieldInputText";
import FieldInputTextarea from "../../components/controls/FieldInputTextarea.jsx";

import "./Listitem.css";

import { toast } from "sonner";

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

		name: Yup.string()
			.required()
			.label("Name")
			.typeError("Name required"),
		description: Yup.string()
			.required()
			.label("Description")
			.typeError("Description required"),

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
	const { state, dispatch } = useValue();
	const {
		recipeState: { recipes, selected_recipe },
		dispatchRecipe,
	} = useRecipeValue();

	const [record, setRecord] = useState(selected_recipe[0]);
	const [recipeTypeList, setRecipeTypeList] = useState(state.recipe_type_list);
	const [typeOptions, setTypeOptions] = useState([]);

	const [recipeImage, setRecipeImage] = useState(null);
	const [recipeImagePreview, setRecipeImagePreview] = useState(null);
	const [servingsCount, setServingsCount] = useState(6);
	const [unitCost, setUnitCost] = useState(0);
	const [totalCost, setTotalCost] = useState(0);

	let defaultRecipe = {};
	if (record) {
		defaultRecipe = {
			...record,
		};
	} else {
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
			const ingredientsPrice = record.ingredients.reduce(
				(accumulator, item) => {
					return (accumulator += item.ingredient.price * item.qty);
				},
				0
			);

			setRecipeImagePreview(record.image);
			setUnitCost(ingredientsPrice / record.feeds);
			setTotalCost(ingredientsPrice);
		} else {
			setRecipeImagePreview(null);
		}
	}, []);

	useEffect(() => {
		setUnitCost(totalCost / servingsCount);
		setValue("feeds", servingsCount);
	}, [servingsCount]);

	useEffect(() => {
		setUnitCost(totalCost / servingsCount);

		setValue("cost", Number(unitCost).toFixed(2));
	}, [totalCost]);

	const handelImageChange = (event) => {
		let file = event.target.files[0];

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

			setIsLoading(false);
			return imageUrl;
		} catch (error) {
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

	const onInvalid = (errors) => console.error(errors);

	const onSubmit = async (data) => {
		let imgUrl = await uploadFile(recipeImagePreview);
		imgUrl = imgUrl.replace("upload/", "upload/c_crop,w_600,h_600/"); //crop image 600px X 600px

		if (record) {
			try {
				setIsLoading(true);

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

							feeds: servingsCount,
							url: data.url,
							premium: data.premium,
							cost: unitCost,

							price: data.price,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					toast.error(dataEdit.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					return data;
				}

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/recipes");

				toast.success("Recipe updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.recipes;
			} catch (err) {
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

							feeds: servingsCount,
							url: data.url,
							premium: data.premium,
							cost: unitCost,

							price: data.price,
						}),
					}
				);
				const dataNew = await responseNew.json();

				setIsLoading(false);
				history("/recipes");

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
									sx={{ border: "none" }}
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
												<Stack direction='row' spacing={1}>
													<Button
														sx={{ gap: "1rem" }}
														variant='contained'
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
														variant='contained'
														color='success'
														type='submit'
													>
														Save
													</Button>
												</Stack>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 2 }} />
									<Stack gap={2}>
										<Stack direction='row' gap={2}>
											<div>
												<InputLabel sx={{ textAlign: "left" }}>Type</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputSelect
														name='category'
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
															<InputLabel sx={{ textAlign: "left" }}>
																Image
															</InputLabel>
															<Box
																bgcolor='primary.light'
																p={0}
																border='1px solid'
															>
																<TextField
																	onChange={(event) => {
																		onChange(event.target.files[0]);
																		handelImageChange(event);
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
																		width: "120px",
																		overFlow: "hidden",
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
																				style={{ border: "1px solid" }}
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
												<InputLabel sx={{ textAlign: "left" }}>
													Freezable
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputSelect
														name='freezable'
														control={control}
														options={freezableOptions}
													/>
												</Box>
											</div>
											<div>
												<Box sx={{ pt: 3, textAlign: "right" }}>
													<Button
														href='https://www.culinaryschools.org/career-info/conversion/'
														target='_blank'
													>
														Conversion Calculator
													</Button>
												</Box>
											</div>
										</Stack>

										{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}

										<div>
											<InputLabel sx={{ textAlign: "left" }}>
												Recipe Name
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText name='name' control={control} />
											</Box>
										</div>
										<div>
											<InputLabel sx={{ textAlign: "left" }}>
												Description
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText name='description' control={control} />
											</Box>
										</div>

										{/* 77777777777777777777777777777777777777777777777777777777777777777777777777777777777     INGREDIENTS */}
										<div>
											<InputLabel sx={{ textAlign: "left" }}>
												Ingredients
											</InputLabel>
											<RecipeIngredients
												totalCost={totalCost}
												setTotalCost={setTotalCost}
											/>
										</div>
										{/*777777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}

										<Box display='flex' gap={2}>
											<div style={{ width: "100%" }}>
												<InputLabel sx={{ textAlign: "left" }}>
													Instructions
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputTextarea
														name='instructions'
														control={control}
													/>
												</Box>
											</div>
										</Box>

										<Stack direction='row' gap={2}>
											{/* */}
											<div>
												<InputLabel sx={{ textAlign: "left" }}>
													Servings
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														name='feeds'
														control={control}
														value={servingsCount}
														onChange={(event) => {
															setServingsCount(event.target.value);
														}}
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel sx={{ textAlign: "left" }}>
													Unit Cost
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														value={Number(unitCost).toFixed(2)}
														name='cost'
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel sx={{ textAlign: "left" }}>
													Total Cost
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														value={Number(totalCost).toFixed(2)}
														name='cost'
														size='small'
													/>
												</Box>
											</div>
											<div>
												<InputLabel sx={{ textAlign: "left" }}>
													Premium
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText name='premium' control={control} />
												</Box>
											</div>
											<div>
												<InputLabel sx={{ textAlign: "left" }}>
													Unit Price
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText name='price' control={control} />
												</Box>
											</div>
										</Stack>
										<div>
											<InputLabel sx={{ textAlign: "left" }}>
												Website (optional)
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<FieldInputText name='url' control={control} />
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

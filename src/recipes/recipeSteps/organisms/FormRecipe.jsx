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

import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import {
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	MenuItem,
	List,
	ListItem,
	Card,
	CardMedia,
} from "@mui/material";

import { categoryOptions } from "../utils/constants";
import { unitOptions } from "../utils/constants";
import FieldInputSelect from "../atoms/FieldInputSelect";
import FieldInputText from "../atoms/FieldInputText";
import FieldInputTextarea from "../atoms/FieldInputTextarea";
import { NumericFormat } from "react-number-format";
import "../atoms/Listitem.css";

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
		ingredients: Yup.array()
			.of(
				Yup.object().shape({
					ingredient: Yup.string()
						.required()
						.label("Ingredient")
						.typeError("Ingredient required"),
					unit: Yup.string()
						.required()
						.label("Unit")
						.typeError("Unit required"),
					qty: Yup.number()
						.required()
						.label("Quantity")
						.typeError("Quantity required"),
				})
			)
			.required()
			.min(1, "Ingredients are required")
			.label("Ingredients")
			.typeError("Ingredients required"),
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

function FormRecipe() {
	const auth = useContext(AuthContext);

	const history = useNavigate();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ingredientsList, setIngredientsList] = useState([]);
	const [imagePreview, setImagePreview] = useState(null);

	const {
		register,
		handleSubmit,

		formState,
		control,
		reset,
		setValue,
	} = useForm({
		defaultValues: {
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
			cost: "",
			price: "",
		},
		resolver: yupResolver(validationSchema),
		mode: "all",
	});

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

	const handelImageChange = (event) => {
		let file = event.target.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/list"
				);
				setIngredientsList(responseData.ingredients);
			} catch (err) {}
		};
		fetchIngredients();
	}, [sendRequest, !!ingredientsList.length]);

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

	const onSubmit = async (data) => {
		// e.preventDefault();
		console.log("clicked", data);

		try {
			const formData = new FormData();

			formData.append("category", data.category);
			formData.append("name", data.name);
			formData.append("description", data.description);
			formData.append("ingredients", JSON.stringify(data.ingredients));
			formData.append("instructions", data.instructions);
			formData.append("feeds", data.feeds);
			formData.append("url", data.url);
			formData.append("image", data.image);
			formData.append("cost", data.cost);
			formData.append("price", data.price);

			// for (var [key, value] of formData.entries()) {
			// 	console.log("formData »", key, value);
			// }

			const responseData = await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/recipes/new",
				"POST",
				formData
			);

			alert("New recipe added");
			// history("/recipes/list");
		} catch (err) {}
	};

	return (
		<>
			<Container maxWidth='md'>
				<Paper sx={{ height: "100vh" }}>
					<Typography variant='h4'>New Recipe</Typography>
					<Divider sx={{ mt: 2 }} />

					<Box  display="flex" p={2}>
						<form onSubmit={handleSubmit(onSubmit)}>
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
														{...field}
														value={value?.fileName}
														onChange={(event) => {
															onChange(event.target.files[0]);
															handelImageChange(event);

															//	console.log("onChange", event.target.files[0]);
														}}
														type='file'
														id='image'
														error={!!errors.image}
													/>

													{imagePreview && (
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
																	image={imagePreview}
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
																			field,
																			fieldState: { error },
																		}) => (
																			<TextField
																				select
																				{...field}
																				name={`ingredients[${index}].ingredient`}
																				label='Ingredient'
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
								<Box display="flex" gap={2}>
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

									<FieldInputText name='cost' control={control} label='Cost' />
									<FieldInputText
										name='price'
										control={control}
										label='Price'
									/>
								</Stack>
								{/* <Divider sx={{ mt: 2 }} /> */}
								<FieldInputText name='url' control={control} label='Website' />

								<Divider sx={{ mt: 2 }} />

								{/* <Button
									type='submit'
									color='primary'
									variant='contained'
									// fullWidth
									size='small'
								>
									Submit
								</Button> */}

								<Stack display='block' spacing={2} direction='row'>
									<Button
										type='submit'
										sx={{ mx: "auto" }}
										variant='contained'
										disabled={!isDirty || !isValid || isSubmitting}
									>
										Submit
									</Button>
									<Button
										sx={{ mx: "auto" }}
										variant='contained'
										onClick={() => reset()}
									>
										Reset
									</Button>
								</Stack>

								{/* */}
							</Stack>

							{/* */}
						</form>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
		</>
	);
}

export default FormRecipe;

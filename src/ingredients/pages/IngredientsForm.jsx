import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Box,
	Divider,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	Grid,
	CircularProgress,
} from "@mui/material";

import * as Yup from "yup";
import { useIngredientsValue } from "../../shared/context/IngredientsProvider.js";
import { useValue } from "../../shared/context/SettingsProvider.js";

import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import FieldInputText from "../../components/controls/FieldInputText.jsx";
import FieldInputSelect from "../../components/controls/FieldInputSelect.jsx";

import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { makeStyles } from "@mui/styles";
import "./Ingredients.css";

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
		name: Yup.string()
			.required()
			.label("Name")
			.typeError("Name required"),
		description: Yup.string()
			.required()
			.label("Description")
			.typeError("Description required"),
		price: Yup.number()
			.nullable()
			.positive()
			.required()
			.label("Price")
			.typeError("Price required"),
	})
	.required();

function IngredientsForm(props) {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const { state, dispatch } = useValue();
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const {
		ingredientsState: { ingredients, selected_ingredient },
		dispatchIngredient,
	} = useIngredientsValue();

	const [record, setRecord] = useState(selected_ingredient[0]);
	const [ingredientCategories, setIngredientCategories] = useState(
		state.ingredient_category_list
	);
	const [typeOptions, setTypeOptions] = useState([]);

	const history = useNavigate();

	let defaultIngredient = {};
	if (record) {
		defaultIngredient = {
			...record,
		};
	} else {
		defaultIngredient = {
			category: "",
			name: "",
			description: "",
			price: "",
		};
	}

	const formProps = useForm({
		defaultValues: defaultIngredient,
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

	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	useEffect(() => {
		let arrayCopy = [...ingredientCategories];

		arrayCopy.map((type) => {
			type.value = type.value;
			type.label = type.value.charAt(0).toUpperCase() + type.value.slice(1);
		});

		setTypeOptions(arrayCopy);
	}, []);

	const onSubmit = async (data) => {
		if (record) {
			try {
				setIsLoading(true);

				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/ingredients/edit/${record._id}`,
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
				history("/ingredients");

				toast.success("Ingredient updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.ingredients;
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
					process.env.REACT_APP_BACKEND_URL + "/ingredients/new",
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
							price: data.price,
						}),
					}
				);
				const dataNew = await responseNew.json();

				if (!responseNew.ok) {
					toast.error(dataNew.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					setIsLoading(false);
					history("/ingredients");
					return data;
				}
				//console.log("ret data", dataNew);

				setIsLoading(false);
				history("/ingredients");

				toast.success("New ingredient added", {
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
			<Container sx={{ border: "none" }} id='container'>
				<Paper>
					{isLoading && <LoadingSpinner asOverlay />}

					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}>
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
														Ingredient
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
															setOpenPopup(false);
															setOpen(false); // ,
														}}
													>
														Cancel
													</Button>
													<Button
														sx={{ display: "flex", gap: "1rem" }}
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
									<Divider sx={{ my: 6 }} />

									<Grid item xs={12} lg={12}>
										<Stack spacing={2}>
											<Stack direction='row' spacing={2}>
												<Stack spacing={0}>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Category
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputSelect
															name='category'
															control={control}
															options={typeOptions}
														/>
													</Box>
												</Stack>
												<Stack spacing={0} style={{ width: "100%" }}>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Name
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText name='name' control={control} />
													</Box>
												</Stack>
											</Stack>
											<Stack direction='row' spacing={2}>
												<Stack spacing={0} style={{ width: "100%" }}>
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
														/>
													</Box>
												</Stack>
												<Stack spacing={0}>
													<Controller
														name='price'
														control={control}
														render={({
															field: { onChange, value },
															fieldState: { error },
														}) => {
															return (
																<div>
																	<InputLabel
																		sx={{ textAlign: "left" }}
																		className={classes.label}
																	>
																		Price Kg/L
																	</InputLabel>
																	<Box bgcolor='primary.light' p={0}>
																		<NumericFormat
																			customInput={TextField}
																			value={value}
																			onChange={onChange}
																			control={control}
																			name='price'
																			thousandSeparator=','
																			decimalSeparator='.'
																			decimalScale={2}
																			size='small'
																			error={!!error}
																			helperText={`${
																				error?.message ? error?.message : ""
																			}`}
																			sx={{
																				"& fieldset": { border: "none" },
																				"& .MuiInputBase-root": {
																					"& input": {
																						textAlign: "left",
																					},
																				},
																				width: "100px",
																				border: "1px solid",
																			}}
																		/>
																	</Box>
																</div>
															);
														}}
													/>
												</Stack>
											</Stack>
										</Stack>
									</Grid>
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

export default IngredientsForm;

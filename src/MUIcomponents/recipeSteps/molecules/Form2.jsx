import React from "react";
import { useEffect, useState } from "react";
import {
	Stack,
	TextField,
	Button,
	MenuItem,
	List,
	ListItem,
} from "@mui/material";
import {
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";

import { unitOptions } from "../utils/constants";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { NumericFormat } from "react-number-format";
import "../atoms/Listitem.css";

function FormTwo() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [ingredientsList, setIngredientsList] = useState([]);

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

	const { control } = useFormContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			ingredients: [
				{
					ingredient: "",
					unit: "",
					qty: "",
				},
			],
		},
		mode: "onTouched",
	});

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

	// const saveData = (data) => {
	// 	console.log("data:", data);
	// };

	return (
		<fieldset>
			<Controller
				name={`ingredients`}
				control={control}
				render={({ fieldState: { error } }) => (
					<List error={!!error}>
						{fields.map(
							({ ingredient, unit, qty, canDelete, options }, index) => {
								return (
									<ListItem key={index}>
										<Stack
											gap={2}
											sx={{ border: "none", width: "100%" }}
											direction='row'
										>
											<Controller
												name={`ingredients[${index}].ingredient`}
												control={control}
												defaultValue=''
												render={({ field, fieldState: { error } }) => (
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
															<MenuItem key={item.id} value={item.id}>
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
															<MenuItem key={option.value} value={option.value}>
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
						{error ? <p style={{color:'red'}}>{error.message}</p> : null}
					</List>
				)}
			/>
			<section>
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
			</section>
		</fieldset>
	);
}

export default FormTwo;

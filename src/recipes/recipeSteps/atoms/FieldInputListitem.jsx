import React from "react";

import { forwardRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
//import { Button, Field, Form, Input } from "../Forms";
import RecipeIngredients from "./RecipeIngredients";
import {
	Typography,
	Box,
	Stack,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
// import "../App.css";


function FieldInputListitem({ name, label, options, disabled, control }) {
	const [state, setState] = useAppState();
	const {
		form,
		register,
		// control,
		handleSubmit,
		formState,
		setValue,
	} = useForm({
		//defaultValues: state,
		defaultValues: {
			ingredients: [
				{
					ingredient: { value: "", label: "" },
					// ingredient: "",
					unit: "",
					qty: "",
					//canDelete: true,
					// options: [],
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	useEffect(() => {
		const { ingredients } = state;

		if (ingredients?.length) {
			// console.log("useEffect state", state);
			// console.log("useEffect ingredients", ingredients);
			ingredients.forEach((item, index) => {
				append({
					ingredient: {
						value: item.id,
						label: item.name,
					},
					// ingredient: item.id,
					unit: item.unit,
					qty: item.qty,
					//canDelete: true,
				});
				setValue(`ingredients[${index}].ingredient`, {
					value: item.id,
					label: item.name,
				});
				// setValue(`ingredients[${index}].ingredient`, item.id);
				setValue(`ingredients[${index}].unit`, item.unit);
				setValue(`ingredients[${index}].qty`, item.qty);
			});
		}
	}, [setValue, append]);

	const saveData = (data) => {
		// console.log("data:", data);
		setState({ ...state, ...data });
		//console.log("ingredient state:", state);
		//console.log("ingredient fields:", fields);
	};
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				return (
					<form onSubmit={handleSubmit(saveData)}>
						<fieldset>
							<legend>Ingredients</legend>

							<ul>
								{fields.map(
									({ id, ingredient, unit, qty }, index) => {
										return (
											<li key={id}>
												<Controller
													name={`ingredients[${index}].ingredient`}
													//name='ingredients'
													control={control}
													defaultValue={ingredient}
													//defaultValue=''
													render={({ field, fieldState: { error } }) => (
														<Select
															{...field}
															id='ingredients'
															labelId='Inglabel'
															sx={{ width: "200px" }}
														>
															{RecipeIngredients.map((item, i) => (
																<MenuItem key={i} value={item.id}>
																	{item.name}
																</MenuItem>
															))}
														</Select>
													)}
												/>
												<input
													type='text'
													name={`ingredients[${index}].unit`}
													defaultValue={unit}
													{...register(`ingredients[${index}].unit`, {
														// value: true,
														message: "Unit is required",
													})}
												/>
												<input
													type='number'
													min='0'
													name={`ingredients[${index}].qty`}
													defaultValue={qty}
													{...register(`ingredients[${index}].qty`, {
														// value: true,
														message: "Quantity is required",
													})}
												/>

												{/* {canDelete && ( */}
													<button
														type='button'
														onClick={() => {
															remove(index);
														}}
													>
														Delete
													</button>
												{/* )} */}
											</li>
										);
									}
								)}
							</ul>
							<section>
								<button
									type='button'
									onClick={() => {
										append({
											ingredient: "",
											unit: "",
											qty: "",
										//	canDelete: true,
										});
									}}
								>
									append
								</button>
							</section>

							{/* <div className='button-row'>
								<Link className={`btn btn-secondary`} to='/recipes/recipe'>
									{"<"} Previous
								</Link>
								<Button ref={ref}>Next {">"}</Button>
							</div> */}
						</fieldset>
						,
					</form>
				);
			}}
		/>
	);
}

export default FieldInputListitem;

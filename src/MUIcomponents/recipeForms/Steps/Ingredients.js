import { forwardRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Field, Form, Input } from "../Forms";
import RecipeIngredients from "./RecipeIngredients";
import {
	Typography,
	Box,
	Stack,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";
import "../App.css";
// import { DevTool } from "@hookform/devtools";

// const options = RecipeIngredients.map((item) => {
// 	return item["id"];
// });
// //const options = [];

export const IngredientsList = forwardRef((props, ref) => {
	// RecipeIngredients.map((item) => {
	// 	console.log("RecipeIngredients", item.id, item.name);
	// });

	const [state, setState] = useAppState();
	const { register, control, handleSubmit, formState, setValue } = useForm({
		// defaultValues: state,
		defaultValues: {
			ingredients: [
				{
					ingredient: { value: "", label: "" },
					// ingredient: "",
					unit: "",
					qty: "",
					canDelete: true,
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
			console.log("useEffect state", state);
			console.log("useEffect ingredients", ingredients);
			ingredients.forEach((item, index) => {
				append({
					ingredient: {
						value: item.id,
						label: item.name,
					},
					// ingredient: item.id,
					unit: item.unit,
					qty: item.qty,
					canDelete: true,
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
		console.log("ingredient state:", state);
		console.log("ingredient fields:", fields);
	};

	return (
		<Form onSubmit={handleSubmit(saveData)} nextStep={"/recipes/instructions"}>
			<fieldset>
				<legend>Ingredients</legend>

				<ul>
					{fields.map(
						({ id, ingredient, unit, qty, canDelete, options }, index) => {
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
												// defaultValue={ingredient}
												// {...register("ingredient", {
												// 	// value: true,
												// 	message: "Ingredient is required",
												// })}
												// error={!!errors.category}
											>
												{RecipeIngredients.map((item, i) => (
													<MenuItem key={i} value={item.id}>
														{item.name}
													</MenuItem>
												))}
												{/* <MenuItem value='IN'>India</MenuItem>
										<MenuItem value='ZA'>South Africa</MenuItem>
										<MenuItem value='NZ'>New Zealand</MenuItem> */}
												{/* {options.map((option, i) => (
															<MenuItem key={i} value={option.value}>
																{option.label}
															</MenuItem>
														))} */}
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

									{canDelete && (
										<button
											type='button'
											onClick={() => {
												remove(index);
											}}
										>
											Delete
										</button>
									)}
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
								canDelete: true,
							});
						}}
					>
						Append
					</button>
				</section>
				{/* <Field label='Ingredient'>
					<Input {...register("ingredient")} id='ingredient' />
				</Field>
				<Field label='Unit'>
					<Input {...register("unit")} id='unit' />
				</Field>
				<Field label='Quantity'>
					<Input {...register("qty")} id='qty' />
				</Field> */}
				<div className='button-row'>
					<Link className={`btn btn-secondary`} to='/recipes/recipe'>
						{"<"} Previous
					</Link>
					<Button ref={ref}>Next {">"}</Button>
				</div>
			</fieldset>
			{/* <DevTool control={control} /> */}
		</Form>
	);
});

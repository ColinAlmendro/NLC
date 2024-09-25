import React from "react";
import styled from "@emotion/styled";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
	Typography,
	Box,
	Stack,
	Container,
	Select,
	MenuItem,
	TextField,
	InputLabel,
	Button,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
//import Field from "./Field";
//import FieldSet from "./FieldSet";
import { ingredientOptions } from "./constants";
import { DevTool } from "@hookform/devtools";

export const categories = [
	"Main",
	"Side Veg",
	"Salad",
	"Soup",
	"Dessert",
	"Other",
];

const RecipeForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	const { fields, append, remove } = useFieldArray({
		name: "ingredients",
		control,
	});

	const submitForm = (formData) => {
		console.log({ formData });
		//  saveData(formData);
	};

	return (
		<React.Fragment>
			<Container>
				<h1>New recipe</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					<Stack label='Basics'>
						<InputLabel id='catlabel' htmlFor='category'>
							Category
						</InputLabel>
						<Controller
							name="category"
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => {
								return (
									<TextField
										select
										value={value}
										defaultValue={value ? value : ""}
										onChange={onChange}
										label={label}
										size='small'
										sx={{ m: 1, width: "200px" }}
										helperText={`${error ? error.message : ""}`}
										error={!!error}
										//disabled={disabled}
									>
										{options.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								);
							}}
						/>
						{/* <Controller
							name='category'
							// label='Category'
							control={control}
							defaultValue=''
							required
							render={({ field }) => (
								<Select
									id='category'
									//labelId='catlabel'
									defaultValue={field.category}
									// {...register("category", {
									// 	value: true,
									// 	message: "Category is required",
									// })}
									//	error={!!errors.category}
								>
									{categories.map((category, i) => (
										<MenuItem key={i} value={category.value}>
											{category.label}
										</MenuItem>
									))}
								</Select>
							)}
						/> */}
						<InputLabel id='namelabel' htmlFor='name'>
							Name
						</InputLabel>
						<TextField
							{...register("name", { required: "Recipe name is required" })}
							type='text'
							id='name'
						/>
						<InputLabel id='desclabel' htmlFor='description'>
							Description
						</InputLabel>
						<TextField
							{...register("description", {
								required: "Recipe description is required",
							})}
							type='text'
							id='description'
						/>
						<InputLabel id='imglabel' htmlFor='image'>
							Image
						</InputLabel>
						<TextField
							{...register("image", {
								required: "Recipe image is required",
							})}
							type='file'
							name='image'
							id='image'
						/>
						<InputLabel id='instlabel' htmlFor='instructions'>
							Instructions
						</InputLabel>
						<TextField
							{...register("instructions", {
								maxLength: {
									value: 5000,
									message: "Instructions cannot be longer than 5000 characters",
								},
							})}
							id='instructions'
							rows={10}
							multiline
						/>
						<InputLabel id='feedslabel' htmlFor='feeds'>
							Feeds
						</InputLabel>
						<TextField
							{...register("feeds", {
								valueAsNumber: true,
								max: {
									value: 10,
									message: "Maximum number of servings is 10",
								},
							})}
							type='number'
							id='feeds'
						/>
						<InputLabel id='costlabel' htmlFor='cost'>
							Cost
						</InputLabel>
						<Controller
							name='cost'
							id='cost'
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<NumericFormat
									customInput={TextField}
									//		label='Cost'
									thousandSeparator=','
									decimalSeparator='.'
									// prefix='R '
									decimalScale={2}
									getInputRef={ref}
									{...rest}
								/>
							)}
						/>
						<InputLabel id='pricelabel' htmlFor='price'>
							Price
						</InputLabel>
						<Controller
							name='price'
							id='price'
							control={control}
							render={({ field: { ref, ...rest } }) => (
								<NumericFormat
									customInput={TextField}
									//	label='Price'
									thousandSeparator=','
									decimalSeparator='.'
									// prefix='R '
									decimalScale={2}
									getInputRef={ref}
									{...rest}
								/>
							)}
						/>
						<InputLabel id='urllabel' htmlFor='url'>
							Website
						</InputLabel>
						<TextField {...register("url")} type='text' id='url' />

						{/*Alternative approach using controlled component*/}
						{/*<Field label="Picture" error={errors.picture}>*/}
						{/*  <Controller*/}
						{/*    control={control}*/}
						{/*    name={"picture"}*/}
						{/*    rules={{ required: "Recipe picture is required" }}*/}
						{/*    render={({ field: { value, onChange, ...field } }) => {*/}
						{/*      return (*/}
						{/*        <Input*/}
						{/*          {...field}*/}
						{/*          value={value?.fileName}*/}
						{/*          onChange={(event) => {*/}
						{/*            onChange(event.target.files[0]);*/}
						{/*          }}*/}
						{/*          type="file"*/}
						{/*          id="picture"*/}
						{/*        />*/}
						{/*      );*/}
						{/*    }}*/}
						{/*  />*/}
						{/*</Field>*/}
					</Stack>
					<Stack>
						{/* <ul>
						{fields.map(({ id, ingredient, unit, qty, canDelete }, index) => {
							return (
								<li key={id}>
									<Controller
										//	name={`ingredients[${index}].ingredient`}
										name='ingredients'
										control={control}
										defaultValue={ingredient}
										//defaultValue=''
										render={({ field, fieldState: { error } }) => (
											<Select
												{...field}
												id='ingredients'
												labelId='Inglabel'
												// defaultValue={ingredient}
												{...register("ingredient", {
													// value: true,
													message: "Ingredient is required",
												})}
												// error={!!errors.category}
											>
												{ingredientOptions.map((item, i) => (
													<MenuItem key={i} value={item.value}>
														{item.label}
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
						})}
					</ul> */}
						<InputLabel id='inglabel' htmlFor='ingredients'>
							Ingredients
						</InputLabel>
						{fields.map((field, index) => {
							return (
								<Row key={field.id}>
									<InputLabel>Ingredient</InputLabel>
									<TextField
										type='text'
										{...register(`ingredients.${index}.ingredient`)}
										id={`ingredients[${index}].ingredient`}
									/>
									<InputLabel>Unit</InputLabel>
									<TextField
										type='text'
										{...register(`ingredients.${index}.unit`)}
										defaultValue={field.unit}
										id={`ingredients[${index}].unit`}
									/>
									<InputLabel>Quantity</InputLabel>
									<TextField
										type='text'
										{...register(`ingredients.${index}.qty`)}
										defaultValue={field.qty}
										id={`ingredients[${index}].qty`}
									/>

									<Button
										type='button'
										onClick={() => remove(index)}
										aria-label={`Remove ingredient ${index}`}
									>
										&#8722;
									</Button>
								</Row>
							);
						})}
						<Button
							type='button'
							onClick={() => append({ ingredient: "", unit: "", qty: "" })}
						>
							Add ingredient
						</Button>
					</Stack>

					<Button type='submit' variant='primary'>
						Save Recipe
					</Button>
				</form>
				{control && <DevTool control={control} />}
			</Container>
		</React.Fragment>
	);
};


export default RecipeForm;

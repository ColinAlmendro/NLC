import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Typography, Box, Stack, TextField, Button } from "@mui/material";
import { categoryOptions, ingredientOptions } from "./constants";

import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";

// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";

const schema = yup.object({
	category: yup.string().required("Category is required"),
	name: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
	// ingredients: yup.array().of(yup.string().required("Ingredients are required")),
	ingredients: yup.string().required("Ingredients are required"),
	instructions: yup.string().required("Instructions are required"),
	feeds: yup.string().required("Feeds amount is required"),
	url: yup.string().required("Url is required"),
	image: yup.string().required("Image is required"),
	cost: yup
		.number()
		.positive()
		.typeError("Cost is required")
		.nullable(true)
		.required("Cost is required"),
	price: yup
		.number()
		.nullable()
		.positive()
		.typeError("Price is required")
		.required("Price is required"),
});

const AddIngredient = () => {
	const auth = useContext(AuthContext);
	//const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const form = useForm({
		defaultValues: {
			category: "",
			name: "",
			description: "",
			ingredients: "",
			instructions: "",
			feeds: "",
			url: "",
			image: "",
			cost: null,
			price: null,
		},
		mode: "onTouched",
	//	resolver: yupResolver(schema),
	});
	const {
		register,
		control,
		handleSubmit,
		formState,
		watch,
		getValues,
		setValue,
		reset,
	} = form;

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

	// console.log({
	// 	isSubmitting,
	// 	isSubmitted,
	// 	isSubmitSuccessful,
	// 	submitCount,
	// });

	const { fields, append, remove } = useFieldArray({
		name: "ingredients",
		control,
	});

	//console.log({ errors, touchedFields, dirtyFields, isDirty, isValid });

	// const onSubmit = (data) => {
	// 	console.log("Submitted", data);
	// };

	const onError = (errors) => {
		console.log("form errors:", errors);
	};
	const history = useNavigate();

	// const handelSelectChange = (option) => {
	// 	field.onChange(option.value);
	// };

	const onSubmit = async (data) => {
		// event.preventDefault();
		console.log("clicked", { data });
		const formData = new FormData();
		formData.append("files", data.image[0]);
		//@ts-expect-error
		data = { ...data, image: data.image[0]};
		console.log("clicked", { data });
		formData.append("recipe", JSON.stringify(data));
		console.log("formData", { formData });
		try {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/recipes/new",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			// enter you logic when the fetch is successful
			console.log(data);
			alert("well done");

			//	history("/ingredients/list");
		} catch (error) {
			// enter your logic for when there is an error (ex. error toast)

			console.log(error);
		}
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<React.Fragment>
			<Box>
				{/* <ErrorModal error={error} onClear={clearError} /> */}
				<FormControl>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={2} width={400}>
							{/* {isLoading && <LoadingSpinner asOverlay />} */}
							<h3>Add Recipe</h3>

							{/* <FormControl sx={{ m: 1, width: 200 }}> */}
							<InputLabel id='catlabel' htmlFor='category'>
								Category
							</InputLabel>
							<Controller
								name={"category"}
								control={control}
								//	defaultValue=''
								required
								render={({ field, fieldState: { error } }) => (
									<Select
										id='category-select'
										labelId='catlabel'
										defaultValue=''
										{...register("category", {
											value: true,
											message: "Category is required",
										})}
										error={!!errors.category}
									>
										{categoryOptions.map((category, i) => (
											<MenuItem key={i} value={category.value}>
												{category.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							<Typography variant='inherit' color='error'>
								{errors.category?.message}
							</Typography>
							{/* </FormControl> */}

							<TextField
								label='Name'
								{...register("name", {
									value: true,
									message: "Name is required",
								})}
								error={!!errors.name}
								// helperText={errors.name?.message}
							/>
							<Typography variant='inherit' color='error'>
								{errors.name?.message}
							</Typography>

							<TextField
								label='Description'
								type='text'
								{...register("description", {
									value: true,
									message: "Description is required",
								})}
								error={!!errors.description}
							/>
							<Typography variant='inherit' color='error'>
								{errors.description?.message}
							</Typography>

							<TextField
								label='Ingredients'
								type='text'
								{...register("ingredients", {
									value: true,
									message: "Ingredients are required",
								})}
								error={!!errors.ingredients}
							/>
							<Typography variant='inherit' color='error'>
								{errors.ingredients?.message}
							</Typography>

							<TextField
								label='Instructions'
								type='text'
								multiline
								rows={10}
								{...register("instructions", {
									value: true,
									message: "Instructions are required",
								})}
								error={!!errors.instructions}
							/>
							<Typography variant='inherit' color='error'>
								{errors.instructions?.message}
							</Typography>
							<TextField
								label='Url'
								type='text'
								{...register("url", {
									value: true,
									message: "Url is required",
								})}
								error={!!errors.url}
							/>
							<Typography variant='inherit' color='error'>
								{errors.url?.message}
							</Typography>
							{/* <Field label='Image' error={errors.image}> */}
							{/* <TextField
								{...register("image", {
									required: "Recipe image is required",
								})}
								//label='Image'
								type='file'
								//id='image'
							/> */}
							{/* </Field> */}

							<Controller
								control={control}
								name={"image"}
								rules={{ required: "Recipe image is required" }}
								render={({ field: { value, onChange, ...field } }) => {
									return (
										<input
											{...field}
											value={value?.fileName}
											onChange={(event) => {
												onChange(event.target.files[0]);
											}}
											type='file'
											id='image'
										/>
									);
								}}
							/>

							<Typography variant='inherit' color='error'>
								{errors.image?.message}
							</Typography>

							{/* <FormControl sx={{ m: 1, width: 400 }}> */}
							<Controller
								name='cost'
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<NumericFormat
										customInput={TextField}
										label='Cost'
										thousandSeparator=','
										decimalSeparator='.'
										// prefix='R '
										decimalScale={2}
										getInputRef={ref}
										{...rest}
									/>
								)}
							/>
							<Typography variant='inherit' color='error'>
								{errors.cost?.message}
							</Typography>
							{/* </FormControl> */}
							{/* <FormControl sx={{ m: 1, width: 400 }}> */}
							<Controller
								name='price'
								control={control}
								render={({ field: { ref, ...rest } }) => (
									<NumericFormat
										customInput={TextField}
										label='Price'
										thousandSeparator=','
										decimalSeparator='.'
										// prefix='R '
										decimalScale={2}
										getInputRef={ref}
										{...rest}
									/>
								)}
							/>
							<Typography variant='inherit' color='error'>
								{errors.price?.message}
							</Typography>
							{/* </FormControl> */}
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
							{/* </FormControl> */}
						</Stack>
					</form>

					<DevTool control={control} />
				</FormControl>
			</Box>
		</React.Fragment>
	);
};

export default AddIngredient;

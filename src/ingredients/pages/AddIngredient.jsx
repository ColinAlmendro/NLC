import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Typography, Box, Stack, TextField, Button } from "@mui/material";

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

const categories = [
	{ value: "", label: "None" },
	{ value: "Meat", label: "Meat" },
	{ value: "Vegetable", label: "Vegetable" },
	{ value: "Dairy", label: "Dairy" },
	{ value: "Grains", label: "Grains" },
	{ value: "Spice", label: "Spice" },
	{ value: "Canned", label: "Canned" },
	{ value: "Oil", label: "Oil" },
	{ value: "Sauce", label: "Sauce" },
	{ value: "Other", label: "Other" },
];

const schema = yup.object({
	category: yup.string().required("Category is required"),
	name: yup.string().required("Name is required"),
	description: yup.string().required("Description is required"),
	unit: yup.string().required("Unit is required"),
	volume: yup
		.number()
		.integer()
		.positive()
		.typeError("Volume is required")
		.nullable(true)
		.required("Volume is required"),
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
			unit: "",
			volume: null,
			price: null,
		},
		mode: "onTouched",
		resolver: yupResolver(schema),
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

	console.log({
		isSubmitting,
		isSubmitted,
		isSubmitSuccessful,
		submitCount,
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

	const onSubmit = async (formData) => {
		// event.preventDefault();
		console.log("clicked");
		try {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/ingredients/new",
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

			history("/ingredients/list");
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
							<h3>Add Ingredient</h3>

							<FormControl sx={{ m: 1, width: 400 }}>
								<InputLabel id='catlabel' htmlFor='category'>
									Category
								</InputLabel>
								<Controller
									name='category'
									// label='Category'
									control={control}
									defaultValue=''
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
											{categories.map((category, i) => (
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
							</FormControl>

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
								label='Unit'
								type='text'
								{...register("unit", {
									value: true,
									message: "Unit is required",
								})}
								error={!!errors.unit}
							/>
							<Typography variant='inherit' color='error'>
								{errors.unit?.message}
							</Typography>

							<TextField
								label='Volume'
								type='number'
								{...register("volume", {
									value: true,
									message: "Volume is required",
								})}
								error={!!errors.volume}
							/>
							<Typography variant='inherit' color='error'>
								{errors.volume?.message}
							</Typography>
							{/* <InputLabel htmlFor='price'>Price</InputLabel> */}

							{/* <TextField
							label='Price'
							type='number'
							step='0.01'
							{...register("price", {
								// value: true,
								message: "Price is required",
							})}
							error={!!errors.price}
							//helperText={errors.price?.message}
						/> */}
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

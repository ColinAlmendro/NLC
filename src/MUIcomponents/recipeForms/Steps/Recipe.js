import { forwardRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Field, Form, Input } from "../Forms";
import {
	Typography,
	Box,
	Stack,
	TextField,
	Select,
	MenuItem,
} from "@mui/material";

// import { Typography } from "@mui/material";
import { categories } from "./RecipeCategories";
// import {
// 	Select,
// 	MenuItem,
// 	FormControl,
// 	InputLabel,
// 	FormHelperText,
// } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import "../App.css";
import { DevTool } from "@hookform/devtools";

// const schema = yup.object({
// 	category: yup.string().required("Category is required"),
// 	name: yup.string().required("Name is required"),
// 	description: yup.string().required("Description is required"),
// });

export const Recipe = forwardRef((props, ref) => {
	const [state, setState] = useAppState();
	// const { handleSubmit, register, control, formState } = useForm({
	const { handleSubmit, register, control } = useForm({
		defaultValues: state,
		mode: "onSubmit",
		// resolver: yupResolver(schema),
	});
	// const {
	// 	errors,
	// } = formState;
	// const [cat, setCat] = useState("");
	// console.log({ cat });

	// const handleSingleChange = (event) => {
	// 	console.log("mmmm",event.target.value);
	// 	setCat(event.target.value);
	// 	console.log("change", { cat });
	// };

	const saveData = (data) => {
		setState({ ...state, ...data });
		console.log("recipe_state:", state);
	};

	return (
		<Form onSubmit={handleSubmit(saveData)} nextStep={"/recipes/ingredients"}>
			<fieldset>
				<legend>New Recipe</legend>
				<Field label='Category'>
					{/* <Input {...register("category")} id='category' /> */}
					{/* <TextField
						label='Category'
						select
						value={cat}
						onChange={handleSingleChange}
						fullWidth
						{...register("category", {
							// value: true,
							message: "Category is required",
						})}
						// error={!!errors.name}
						// helperText={errors.name?.message}
					>
						<MenuItem value='IN'>India</MenuItem>
						<MenuItem value='ZA'>South Africa</MenuItem>
						<MenuItem value='NZ'>New Zealand</MenuItem>
					</TextField> */}

					<Controller
						name='category'
						// label='Category'
						control={control}
						defaultValue=''
						// required
						render={({ field, fieldState: { error } }) => (
							<Select
								id='category'
								labelId='catlabel'
								defaultValue=''
								{...register("category", {
									// value: true,
									message: "Category is required",
								})}
								// error={!!errors.category}
							>
								<MenuItem value='IN'>India</MenuItem>
								<MenuItem value='ZA'>South Africa</MenuItem>
								<MenuItem value='NZ'>New Zealand</MenuItem>
								{/* {categories.map((category, i) => (
									<MenuItem key={i} value={category.value}>
										{category.label}
									</MenuItem>
								))} */}
							</Select>
						)}
					/>
				</Field>
				{/* <Typography variant='inherit' color='error'>
					{errors.category?.message}
				</Typography> */}
				<Field label='Name'>
					{/* <Input
						{...register("name", {
							// value: true,
							message: "Name is required",
						})}
						id='name'
					/> */}
					<TextField
						// label='Name'
						{...register("name", {
							// value: true,
							message: "Name is required",
						})}
						// error={!!errors.name}
						// helperText={errors.name?.message}
					/>
				</Field>
				{/* <Typography variant='inherit' color='error'>
					{errors.name?.message}
				</Typography> */}
				<Field label='Description'>
					{/* <Input
						{...register("description", {
							// value: true,
							message: "Description is required",
						})}
						id='description'
					/> */}
					<TextField
						// label='Name'
						{...register("description", {
							// value: true,
							message: "Description is required",
						})}
						// error={!!errors.description}
						// helperText={errors.description?.message}
					/>
				</Field>
				{/* <Typography variant='inherit' color='error'>
					{errors.description?.message}
				</Typography> */}
				<Button ref={ref}>Next {">"}</Button>
			</fieldset>
			<DevTool control={control} />
		</Form>
	);
});

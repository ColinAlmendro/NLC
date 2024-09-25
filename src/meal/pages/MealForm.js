import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
// import fetchRecipes from "../controllers/mealController";
import { useHttpClient } from "../../shared/hooks/http-hook";

const initialFValues = {
	id: 0,
	main: "",
	mainDescription: "",
	side: "",
	sideDescription: "",
};

export default function MealForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [loadedRecipes, setLoadedRecipes] = useState([
		// {
		// 	id: "",
		// 	category: "",
		// 	name: "",
		// 	description: "",
		// 	ingredients: [],
		// 	instructions: "",
		// 	feeds: "",
		// 	url: "",
		// 	image: "",
		// 	cloudinary_id:"",
		// 	cost:"",
		// 	price:"",
		// },
	]);
	const [mainRecipes, setMainRecipes] = useState([]);
	const [sideRecipes, setSideRecipes] = useState([]);

	const mainFilter = loadedRecipes.filter(
		(recipe) => recipe.category === "main"
	);
	const sideFilter = loadedRecipes.filter(
		(recipe) => recipe.category === "side"
	);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "/recipes/list"
				);

				console.log("recipes", responseData);
				// if (responseData.recipes.length === 0) {
				setLoadedRecipes(responseData.recipes);
				setMainRecipes(mainFilter);
				setSideRecipes(sideFilter);
				// }
			} catch (err) {}
		};
		fetchRecipes();
		// console.log("loadedRecipes", loadedRecipes);
		// console.log("mainRecipes1", mainRecipes);
		// console.log("sideRecipes1", sideRecipes);
	}, [sendRequest, loadedRecipes.length === 0]);

	const validate = (fieldValues = values) => {
	
		let temp = { ...errors };
		if ("main" in fieldValues)
			temp.main = fieldValues.main ? "" : "Main meal is required.";
		if ("mainDescription" in fieldValues)
			temp.mainDescription = fieldValues.mainDescription ? "" : "Description is required.";

		setErrors({
			...temp,
		});

		if (fieldValues == values) return Object.values(temp).every((x) => x == "");
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	} = useForm(initialFValues, true, validate);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitmealdata:", values)
		if (validate()) {
			addOrEdit(values, resetForm);
		}
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
	}, [recordForEdit]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={9}>
					<Controls.Select
						name='main'
						label='Main'
						value={values.main}
						onChange={handleInputChange}
						options={mainRecipes}
						error={errors.main}
					/>
					<Controls.Input
						name='mainDescription'
						label='MainDescription'
						value={values.mainDescription}
						onChange={handleInputChange}
						error={errors.mainDescription}
					/>
					<Controls.Select
						name='side'
						label='Side'
						value={values.side}
						onChange={handleInputChange}
						options={sideRecipes}
						error={errors.side}
					/>
					<Controls.Input
						name='sideDescription'
						label='SideDescription'
						value={values.sideDescription}
						onChange={handleInputChange}
						error={errors.sideDescription}
					/>
					<div>
						<Controls.Button type='submit' text='Save' />
						<Controls.Button text='Reset' color='primary' onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}

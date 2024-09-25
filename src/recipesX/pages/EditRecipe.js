import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./RecipeForm.css";

const EditRecipe = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedRecipe, setLoadedRecipe] = useState();
	const recipeId = useParams().recipeId;
	const history = useNavigate();

	const [formState, inputHandler, setFormData] = useForm(
		{
			category: {
				value: "",
				isValid: false,
			},
			name: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			ingredients: {
				value: "",
				isValid: false,
			},
			instructions: {
				value: "",
				isValid: false,
			},
			feeds: {
				value: "",
				isValid: false,
			},
			url: {
				value: "",
				isValid: false,
			},
			image: {
				value: null,
				isValid: false,
			},
			cost: {
				value: "",
				isValid: false,
			},
			price: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/recipes/${recipeId}`
				);
				setLoadedRecipe(responseData.recipe);
				setFormData(
					{
						category: {
							value: responseData.recipe.category,
							isValid: true,
						},
						name: {
							value: responseData.recipe.name,
							isValid: true,
						},
						description: {
							value: responseData.recipe.description,
							isValid: true,
						},
						ingredients: {
							value: responseData.recipe.ingredients,
							isValid: true,
						},
						instructions: {
							value: responseData.recipe.instructions,
							isValid: true,
						},
						feeds: {
							value: responseData.recipe.feeds,
							isValid: true,
						},
						url: {
							value: responseData.recipe.url,
							isValid: true,
						},
						image: {
							value: responseData.recipe.image,
							isValid: true,
						},
						cost: {
							value: responseData.recipe.cost,
							isValid: true,
						},
						price: {
							value: responseData.recipe.price,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchRecipe();
	}, [sendRequest, recipeId, setFormData]);

	const recipeUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/recipes/edit/${recipeId}`,
				"PATCH",
				JSON.stringify({
					category: formState.inputs.category.value,
					name: formState.inputs.name.value,
					description: formState.inputs.description.value,
					ingredients: formState.inputs.ingredients.value,
					instructions: formState.inputs.instructions.value,
					feeds: formState.inputs.feeds.value,
					url: formState.inputs.url.value,
					image: formState.inputs.image.value,
					cost: formState.inputs.cost.value,
					price: formState.inputs.price.value,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			history("/recipes/list");
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedRecipe && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find recipe!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && loadedRecipe && <LoadingSpinner asOverlay />}
				<h2>Edit Recipe</h2>
				<hr />

				<form className='recipe-form' onSubmit={recipeUpdateSubmitHandler}>
					<div className='recipe-item__image'>
						<img
							src={`${process.env.REACT_APP_ASSET_URL}/${loadedRecipe.image}`}
							alt={loadedRecipe.name}
						/>
					</div>
					<Input
						id='category'
						element='input'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
						initialValue={loadedRecipe.category}
						initialValid={true}
					/>
					<Input
						id='name'
						element='input'
						type='text'
						label='Common Name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid common name.'
						onInput={inputHandler}
						initialValue={loadedRecipe.name}
						initialValid={true}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (min. 5 characters).'
						onInput={inputHandler}
						initialValue={loadedRecipe.description}
						initialValid={true}
					/>
					<Input
						id='ingredients'
						element='textarea'
						label='Ingredients'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter valid ingredients (min. 5 characters).'
						onInput={inputHandler}
						initialValue={loadedRecipe.ingredients}
						initialValid={true}
					/>
					<Input
						id='instructions'
						element='textarea'
						label='Instructions'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter valid instructions (min. 5 characters).'
						onInput={inputHandler}
						initialValue={loadedRecipe.instructions}
						initialValid={true}
					/>
					<Input
						id='feeds'
						element='input'
						type='text'
						label='Servings'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid number of servings.'
						onInput={inputHandler}
						initialValue={loadedRecipe.feeds}
						initialValid={true}
					/>{" "}
					<Input
						id='url'
						element='input'
						type='text'
						label='Website'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid website.'
						onInput={inputHandler}
						initialValue={loadedRecipe.url}
						initialValid={true}
					/>
					<ImageUpload
						id='image'
						onInput={inputHandler}
						btn='Change Image'
						//errorText='Please provide an image.'
					/>
					<Input
						id='cost'
						element='input'
						type='text'
						label='Cost'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid cost.'
						onInput={inputHandler}
						initialValue={loadedRecipe.cost}
						initialValid={true}
					/>{" "}
					<Input
						id='price'
						element='input'
						type='text'
						label='Price'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid price.'
						onInput={inputHandler}
						initialValue={loadedRecipe.price}
						initialValid={true}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						Update Recipe
					</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default EditRecipe;

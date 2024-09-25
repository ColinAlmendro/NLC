import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import InputSelect from "../../shared/components/FormElements/InputSelect";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import recipeIngredients from "../components/RecipeIngredients";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./RecipeForm.css";

const categoryOptions = [
	{ value: "main", label: "Main" },
	{ value: "side", label: "Side Veg" },
	{ value: "salad", label: "Salad" },
	{ value: "soup", label: "Soup" },
	{ value: "dessert", label: "Dessert" },
	{ value: "other", label: "Other" },
];

const NewRecipe = () => {
	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
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
			ingredients: [
				{
					ingredient: { value: "", isValid: true },
					unit: { value: "", isValid: true },
					qty: { value: "", isValid: true },
				},
			],
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

	const IngredTest = [
		{ ingredient: "667abfdc493f9432cc68fd59", unit: "Kg", qty: "2" },
		{ ingredient: "667ac028493f9432cc68fd5b", unit: "Gr", qty: "500" },
	];
	// console.log(IngredTest);

	const history = useNavigate();

	const recipeSubmitHandler = async (event) => {
		event.preventDefault();
		console.log("formState", formState);
		try {
					const formData = new FormData();
					formData.append("category", formState.inputs.category.value);
					formData.append("name", formState.inputs.name.value);
					formData.append("description", formState.inputs.description.value);
					//formData.append("ingredients", formState.inputs.ingredients.value);
					formData.append("ingredients", IngredTest);
					formData.append("instructions", formState.inputs.instructions.value);
					formData.append("feeds", formState.inputs.feeds.value);
					formData.append("url", formState.inputs.url.value);
					formData.append("image", formState.inputs.image.value);
					formData.append("cost", formState.inputs.cost.value);
					formData.append("price", formState.inputs.price.value);

					for (var [key, value] of formData.entries()) {
						console.log(key, value);
					}

					await sendRequest(
						process.env.REACT_APP_BACKEND_URL + "/recipes/new",
						"POST",
						formData,
						{
							Authorization: "Bearer " + auth.token,
						}
					);
					history("/recipes/list");
				} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>New Recipe</h2>
				<hr />
				<form className='recipe-form' onSubmit={recipeSubmitHandler}>
					<InputSelect
						id='category'
						//element='input'
						//type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
						options={categoryOptions}
					/>
					{/* <Input
						id='category'
						element='input'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
					/> */}
					<Input
						id='name'
						element='input'
						type='text'
						label='Recipe Name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid recipe name.'
						onInput={inputHandler}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (at least 5 characters).'
						onInput={inputHandler}
					/>
					<Input
						id='ingredients'
						element='textarea'
						label='Ingredients'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid ingredient (at least 5 characters).'
						onInput={inputHandler}
					/>
					<Input
						id='instructions'
						element='textarea'
						label='Instructions'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (at least 5 characters).'
						onInput={inputHandler}
					/>
					<Input
						id='feeds'
						element='input'
						type='text'
						label='Servings'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a number of servings.'
						onInput={inputHandler}
					/>
					<Input
						id='url'
						element='input'
						type='text'
						label='Website'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid website.'
						onInput={inputHandler}
					/>
					<ImageUpload
						id='image'
						onInput={inputHandler}
						btn='Pick Image'
						errorText='Please provide an image.'
					/>
					<Input
						id='cost'
						element='input'
						type='text'
						label='Common Cost'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid cost.'
						onInput={inputHandler}
					/>
					<Input
						id='price'
						element='input'
						type='text'
						label='Price'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid price.'
						onInput={inputHandler}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						Add Recipe
					</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default NewRecipe;

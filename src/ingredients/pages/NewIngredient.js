import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./IngredientForm.css";

const NewIngredient = () => {
	const auth = useContext(AuthContext);

	// const categories = [
	// 	{ value: "Meat", label: "Meat" },
	// 	{ value: "Vegetable", label: "Vegetable" },
	// 	{ value: "Dairy", label: "Dairy" },
	// 	{ value: "Grain", label: "Grains" },
	// 	{ value: "Spice", label: "Spice" },
	// 	{ value: "Canned", label: "Canned" },
	// 	{ value: "Oil", label: "Oil" },
	// 	{ value: "Sauce", label: "Sauce" },
	// 	{ value: "Other", label: "Other" },
	// ];

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
			unit: {
				value: "",
				isValid: false,
			},
			volume: {
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

	const history = useNavigate();

	const ingredientSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();

			formData.append("category", formState.inputs.category.value);
			formData.append("name", formState.inputs.name.value);
			formData.append("description", formState.inputs.description.value);
			formData.append("unit", formState.inputs.unit.value);
			formData.append("volume", formState.inputs.volume.value);
			formData.append("price", formState.inputs.price.value);
			

			console.log(formData);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/ingredients/new",
				"POST",
				formData,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			history("/ingredients/list");
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>New Ingredient</h2>
				<hr />
				<form className='ingredient-form' onSubmit={ingredientSubmitHandler}>
					{/* <Input
						id='category'
						element='input'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
					/> */}
					{/* <Input
						options={categories}
						ismulti='true'
						id='category'
						element='select'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
					/> */}
					<Input
						id='category'
						element='input'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
					/>
					<Input
						id='name'
						element='input'
						type='text'
						label='Name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
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
						id='unit'
						element='input'
						label='Unit'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid unit.'
						onInput={inputHandler}
					/>
					<Input
						id='volume'
						element='input'
						label='Volume'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid volume.'
						onInput={inputHandler}
					/>
					<Input
						id='price'
						element='input'
						label='Price'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid price.'
						onInput={inputHandler}
					/>
					{/* <Input
						id='recipe'
						element='input'
						label='Recipe'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid recipe.'
						onInput={inputHandler}
					/> */}
					{/* <ImageUpload
						id='image'
						onInput={inputHandler}
						btn='Pick Image'
						//errorText='Please provide an image.'
					/> */}
					<Button type='submit' disabled={!formState.isValid}>
						Add Ingredient
					</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default NewIngredient;

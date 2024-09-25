import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./IngredientForm.css";

const EditIngredient = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedIngredient, setLoadedIngredient] = useState();
	const ingredientId = useParams().ingredientId;
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
			recipe: {
				value: "",
				isValid: false,
			},
			// image: {
			// 	value: null,
			// 	isValid: false,
			// },
		},
		false
	);

	useEffect(() => {
		const fetchIngredient = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/ingredients/${ingredientId}`
				);
				setLoadedIngredient(responseData.ingredient);
				setFormData(
					{
						category: {
							value: responseData.ingredient.category,
							isValid: true,
						},
						name: {
							value: responseData.ingredient.name,
							isValid: true,
						},
						description: {
							value: responseData.ingredient.description,
							isValid: true,
						},
						unit: {
							value: responseData.ingredient.unit,
							isValid: true,
						},
						volume: {
							value: responseData.ingredient.volume,
							isValid: true,
						},
						price: {
							value: responseData.ingredient.price,
							isValid: true,
						},
						// recipe: {
						// 	value: responseData.ingredient.recipe,
						// 	isValid: true,
						// },
						// image: {
						// 	value: responseData.ingredient.image,
						// 	isValid: true,
						// },
					},
					true
				);
			} catch (err) {}
		};
		fetchIngredient();
	}, [sendRequest, ingredientId, setFormData]);

	const ingredientUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/ingredients/edit/${ingredientId}`,
				"PATCH",
				JSON.stringify({
					category: formState.inputs.ccategory.value,
					name: formState.inputs.name.value,
					description: formState.inputs.description.value,
					unit: formState.inputs.unit.value,
					volume: formState.inputs.volume.value,
					price: formState.inputs.price.value,
					// recipe: formState.inputs.recipe.value,
					// image: formState.inputs.image.value,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			history("/ingredients/list");
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className='center'>
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedIngredient && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>Could not find ingredient!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<Card className='authentication'>
				{isLoading && loadedIngredient && <LoadingSpinner asOverlay />}
				<h2>Edit Ingredient</h2>
				<hr />

				<form
					className='ingredient-form'
					onSubmit={ingredientUpdateSubmitHandler}
				>
					<div className='ingredient-item__image'>
						{/* <img
							src={`${process.env.REACT_APP_ASSET_URL}/${loadedIngredient.image}`}
							alt={loadedIngredient.name}
						/> */}
					</div>
					<Input
						id='category'
						element='input'
						type='text'
						label='Category'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid category.'
						onInput={inputHandler}
						initialValue={loadedIngredient.category}
						initialValid={true}
					/>
					<Input
						id='name'
						element='input'
						type='text'
						label='Common Name'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
						onInput={inputHandler}
						initialValue={loadedIngredient.name}
						initialValid={true}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (min. 5 characters).'
						onInput={inputHandler}
						initialValue={loadedIngredient.description}
						initialValid={true}
					/>
					<Input
						id='unit'
						element='input'
						type='text'
						label='Unit'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid unit.'
						onInput={inputHandler}
						initialValue={loadedIngredient.unit}
						initialValid={true}
					/>
					<Input
						id='volume'
						element='input'
						type='text'
						label='Volume'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid volume.'
						onInput={inputHandler}
						initialValue={loadedIngredient.volume}
						initialValid={true}
					/>
					<Input
						id='price'
						element='input'
						type='text'
						label='Price'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid price.'
						onInput={inputHandler}
						initialValue={loadedIngredient.price}
						initialValid={true}
					/>
					<Input
						id='recipe'
						element='input'
						type='text'
						label='Recipe'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid recipe.'
						onInput={inputHandler}
						initialValue={loadedIngredient.recipe}
						initialValid={true}
					/>
					{/* <ImageUpload
						id='image'
						onInput={inputHandler}
						btn='Change Image'
						//errorText='Please provide an image.'
					/> */}
					<Button type='submit' disabled={!formState.isValid}>
						Update Ingredient
					</Button>
				</form>
			</Card>
		</React.Fragment>
	);
};

export default EditIngredient;

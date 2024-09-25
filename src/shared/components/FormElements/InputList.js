import React, { useRef, useState, useEffect } from "react";
import RecipeIngredients from "./RecipeIngredients";
import Input from "../../shared/components/FormElements/Input";
import InputSelect from "../../shared/components/FormElements/InputSelect";
import Button from "./Button";
//import "./ImageUpload.css";

const ingredientOptions = RecipeIngredients.map((ingredient) => ({
	value: ingredient.id,
	label: ingredient.name,
}));

const InputList = (props) => {
	const [ingredientList, setIngredientList] = useState([null]);
	
	const [isValid, setIsValid] = useState(false);

	

	// useEffect(() => {
	// 	if (!ingredientList) {
	// 		return;
	// 	}
		

	const pickedHandler = (event) => {
		// let pickedFile;
		// let fileIsValid = isValid;
		// if (event.target.files && event.target.files.length === 1) {
		// 	pickedFile = event.target.files[0];
		// 	setFile(pickedFile);
		// 	setIsValid(true);
		// 	fileIsValid = true;
		// } else {
		// 	setIsValid(false);
		// 	fileIsValid = false;
		// }

		props.onInput(props.ingredientList, fileIsValid);
	};
	

	// const pickImageHandler = () => {
	// 	filePickerRef.current.click();
	// };

	return (
		<div className='form-control'>
			<ul>
				{ingredientList.map(
					({ ingredient, unit, qty}, index) => {
						return (
							<li key={id}>
								{/* <Select
									id='ingredient'
									labelId='Inglabel'
									sx={{ width: "200px" }}
								>
									{RecipeIngredients.map((item, i) => (
										<MenuItem key={i} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select> */}
								<InputSelect
									id='ingredient'
									//element='input'
									//type='text'
									label='Ingredient'
									validators={[VALIDATOR_REQUIRE()]}
									errorText='Please select an ingredient.'
									onInput={inputHandler}
									options={ingredientOptions}
								/>

								{/* <input
									type='text'
									name={`ingredients[${index}].unit`}
									defaultValue={unit}
									{...register(`ingredients[${index}].unit`, {
										// value: true,
										message: "Unit is required",
									})}
								/> */}
								<Input
									id={`ingredients[${index}].unit`}
									element='input'
									type='text'
									label='Unit'
									validators={[VALIDATOR_REQUIRE()]}
									errorText='Please enter a valid unit.'
									onInput={inputHandler}
								/>
								{/* <input
									type='number'
									min='0'
									name={`ingredients[${index}].qty`}
									defaultValue={qty}
									{...register(`ingredients[${index}].qty`, {
										// value: true,
										message: "Quantity is required",
									})}
								/> */}
								<Input
									id={`ingredients[${index}].qty`}
									element='input'
									type='text'
									label='Quantity'
									validators={[VALIDATOR_REQUIRE()]}
									errorText='Please enter a valid quantity.'
									onInput={inputHandler}
								/>

								{canDelete && (
									<button
										type='button'
										onClick={() => {
											remove(index);
										}}
									>
										Remove
									</button>
								)}
							</li>
						);
					}
				)}
			</ul>
			<div>
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
					Add Ingredient
				</button>
			</div>

			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};

export default InputList;

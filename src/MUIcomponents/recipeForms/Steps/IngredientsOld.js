import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Field, Form, Input } from "../Forms";

export const IngredientsList = forwardRef((props, ref) => {
	const [state, setState] = useAppState();
	console.log("state...:", state);
	const { handleSubmit, register } = useForm({ defaultValues: state });

	const saveData = (data) => {
		setState({ ...state, ...data });
	};

	return (
		<Form onSubmit={handleSubmit(saveData)} nextStep={"/recipes/instructions"}>
			<fieldset>
				<legend>Ingredients</legend>
				<Field label='Ingredient'>
					<Input {...register("ingredient")} id='ingredient' />
				</Field>
				<Field label='Unit'>
					<Input {...register("unit")} id='unit' />
				</Field>
				<Field label='Quantity'>
					<Input {...register("qty")} id='qty' />
				</Field>
				<div className='button-row'>
					<Link className={`btn btn-secondary`} to='/recipes/recipe'>
						{"<"} Previous
					</Link>
					<Button ref={ref}>Next {">"}</Button>
				</div>
			</fieldset>
		</Form>
	);
});

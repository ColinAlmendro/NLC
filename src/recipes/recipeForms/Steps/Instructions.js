import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Field, Form } from "../Forms";
import "../App.css";
// import { DevTool } from "@hookform/devtools";

export const Instructions = forwardRef((props, ref) => {
	const [state, setState] = useAppState();
	const { handleSubmit, register, control } = useForm({ defaultValues: state });

	const saveData = (data) => {
		setState({ ...state, ...data });
		console.log("Instructions_state:", state);
	};

	return (
		<Form onSubmit={handleSubmit(saveData)} nextStep={"/recipes/details"}>
			<fieldset>
				<legend>Instructions</legend>
				<Field label='Instructions'>
					<textarea
						{...register("instructions")}
						id='instructions'
						className='form-control'
					/>
				</Field>
				<div className='button-row'>
					<Link className={`btn btn-secondary`} to='/recipes/ingredients'>
						{"<"} Previous
					</Link>
					<Button ref={ref}>Next {">"}</Button>
				</div>
			</fieldset>
			{/* <DevTool control={control} /> */}
		</Form>
	);
});

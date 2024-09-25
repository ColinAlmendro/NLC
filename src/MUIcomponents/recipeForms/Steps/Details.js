import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppState } from "../../../shared/context/app-context";
import { Button, Field, Form, Input } from "../Forms";
import "../App.css";
// import { DevTool } from "@hookform/devtools";

export const Details = forwardRef((props, ref) => {
	const [state, setState] = useAppState();
	const { handleSubmit, register, control } = useForm({
		defaultValues: state,
		mode: "onSubmit",
	});

	
	const saveData = (data) => {
		setState({ ...state, ...data });
		console.log("details_state:", state);
	};

	return (
		<Form onSubmit={handleSubmit(saveData)} nextStep={"/recipes/confirm"}>
			<fieldset>
				<legend>Details</legend>

				<Field label='Image'>
					<Input
						{...register("image")}
						id='image'
						type='file'
						onChange={(event) => {
							onChange(event.target.files[0]);						
							// setImagePreview(URL.createObjectURL(event.target.files[0]));
							console.log("onChange", event.target.files[0]);
						}}
					/>
				</Field>
				<Field label='Website'>
					<Input {...register("url")} id='url' />
				</Field>
				<Field label='Servings'>
					<Input {...register("feeds")} id='feeds' />
				</Field>
				<Field label='Cost'>
					<Input {...register("cost")} id='cost' />
				</Field>
				<Field label='Price'>
					<Input {...register("price")} id='price' />
				</Field>
				<div className='button-row'>
					<Link className={`btn btn-secondary`} to='/recipes/instructions'>
						{"<"} Previous
					</Link>
					<Button ref={ref}>Next {">"}</Button>
				</div>
			</fieldset>
			{/* <DevTool control={control} /> */}
		</Form>
	);
});

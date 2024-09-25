import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
// import * as daysController from "../controllers/daysController";
import Meal from "../../meal/pages/Meal";

const dayOptions = [
	{ id: "monday", name: "Monday" },
	{ id: "tuesday", name: "Tuesday" },
	{ id: "wednesday", name: "Wednesday" },
	{ id: "thursday", name: "Thursday" },
	{ id: "friday", name: "Friday" },
];

const initialFValues = {
	id: 0,
	day: "",
	main: "",
	mainDescription: "",
	side: "",
	sideDescription: "",

};

export default function DaysForm(props) {
	const { addOrEdit, recordForEdit } = props;

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ("day" in fieldValues)
		 	temp.day = fieldValues.day ? "" : "Day is required.";
		// if ("email" in fieldValues)
		// 	temp.email = /$^|.+@.+..+/.test(fieldValues.email)
		// 		? ""
		// 		: "Email is not valid.";
		// if ("mobile" in fieldValues)
		// 	temp.mobile =
		// 		fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
		// if ("departmentId" in fieldValues)
		// 	temp.departmentId =
		// 		fieldValues.departmentId.length != 0 ? "" : "This field is required.";
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
		console.log("submitday",values)
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
						name='day'
						label='Day'
						value={values.day}
						onChange={handleInputChange}
						options={dayOptions}
						error={errors.day}
					/>
					<Meal />
			
					<div>
						<Controls.Button type='submit' text='Save' />
						<Controls.Button text='Reset' color='primary' onClick={resetForm} />
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}

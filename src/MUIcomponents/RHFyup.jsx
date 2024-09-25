import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { DevTool } from "@hookform/devtools";

const schema = yup.object({
	username: yup.string().required("Username is required"),
	email: yup
		.string()
		.email("Email is not valid")
		.required("Email is required"),
	channel: yup.string().required("Channel is required"),
});

const RHFyup = () => {
	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			channel: "",
		},
		resolver:yupResolver(schema)
	});

	const { register, control, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div>
			<h1>Yup Form</h1>

			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className='form-control'>
					<label htmlFor='username'>Username</label>
					<input type='text' id='username' {...register("username")} />
					<p className='error'>{errors.username?.message}</p>
				</div>

				<div className='form-control'>
					<label htmlFor='email'>E-mail</label>
					<input type='email' id='email' {...register("email")} />
					<p className='error'>{errors.email?.message}</p>
				</div>

				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<input type='text' id='channel' {...register("channel")} />
					<p className='error'>{errors.channel?.message}</p>
				</div>

				<button>Submit</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default RHFyup;

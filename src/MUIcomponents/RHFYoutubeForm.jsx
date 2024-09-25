import React from "react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const RHFYoutubeForm = () => {
	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			channel: "",
			social: {
				twitter: "",
				facebook: "",
			},
			phones: [{ number: "" }],
			age: 0,
			dob: new Date(),
		},
		mode: "onTouched",
	});
	const {
		register,
		control,
		handleSubmit,
		formState,
		watch,
		getValues,
		setValue,
		reset,
		trigger,
	} = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "phone",
	});
	const {
		errors,
		touchedFields,
		dirtyFields,
		isDirty,
		isValid,
		isSubmitting,
		isSubmitted,
		isSubmitSuccessful,
		submitCount,
	} = formState;
	console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });
	console.log({ errors, touchedFields, dirtyFields, isDirty, isValid });

	const onSubmit = (data) => {
		console.log("Submitted", data);
	};

	const onError = (errors) => {
		console.log("form errors:", errors);
	};

	const handleGetValues = () => {
		console.log("get values:", getValues(["username", "social"]));
	};
	const handleSetValue = () => {
		setValue("username", "", {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);
	// useEffect(()=>{
	// 	const subscription = watch((value)=>{
	// 		console.log({value})
	// 	});
	// 	return () => subscription.unsubscribe();
	// },[watch]);

	//const watchUsername = watch(["username","email"]);

	return (
		<div>
			<h1>Input Form</h1>
			{/* <h2>Watched value: {watchUsername}</h2> */}

			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<div className='form-control'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						{...register("username", {
							required: { value: true, message: "Username is required" },
						})}
					/>
					<p className='error'>{errors.username?.message}</p>
				</div>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: "Invalid email",
							},
							validate: {
								notAdmin: (fieldValue) => {
									return (
										fieldValue !== "admin@example.com" ||
										"Enter a different email"
									);
								},
								notBlacklisted: (fieldValue) => {
									return (
										!fieldValue.endsWith("baddomain.com") ||
										"Domain not supported"
									);
								},
								emailAvailable: async (fieldValue) => {
									const response = await fetch(
										`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
									);
									const data = await response.json();
									return data.length === 0 || "Email already exists";
								},
							},
						})}
					/>
					<p className='error'>{errors.email?.message}</p>
				</div>
				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<input
						type='text'
						id='channel'
						{...register("channel", { required: "Channel is required" })}
					/>
					<p className='error'>{errors.channel?.message}</p>
				</div>
				<div className='form-control'>
					<label htmlFor='twitter'>Twitter</label>
					<input
						type='text'
						id='twitter'
						{...register("social.twitter", {
							disabled: watch("channel") === "",
							required: "Enter twitter",
						})}
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='facebook'>Facebook</label>
					<input type='text' id='facebook' {...register("social.facebook")} />
				</div>

				<div>
					<label>List of phone numbers</label>
					<div>
						{fields.map((field, index) => (
							<div className='form-control' key={field.id}>
								<input type='text' {...register(`phones.${index}.number`)} />
								{index > 0 && (
									<button type='button' onClick={() => remove(index)}>
										Remove
									</button>
								)}
							</div>
						))}
						<button
							type='button'
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								append({ number: "" });
							}}
						>
							Add phone number
						</button>
					</div>
				</div>
				<div className='form-control'>
					<label htmlFor='age'>Age</label>
					<input
						type='number'
						id='age'
						{...register("age", {
							valueAsNumber: true,
							required: {
								value: true,
								message: "Age is required",
							},
						})}
					/>
					<p className='error'>{errors.age?.message}</p>
				</div>
				<div className='form-control'>
					<label htmlFor='dob'>Date of birth</label>
					<input
						type='date'
						id='dob'
						{...register("dob", {
							valueAsDate: true,
							required: {
								value: true,
								message: "Date of birth is required",
							},
						})}
					/>
					<p className='error'>{errors.dob?.message}</p>
				</div>
				<button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
				<button type='button' onClick={() => reset()}>
					Reset
				</button>
				<button type='button' onClick={handleGetValues}>
					Get values
				</button>
				<button type='button' onClick={handleSetValue}>
					Set value
				</button>
				<button type='button' onClick={() => trigger("")}>
					Validate
				</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default RHFYoutubeForm;

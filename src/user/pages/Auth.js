import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
//import { useHttpClient } from "../../shared/hooks/http-hook";
//import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import { toast } from "sonner";
import "./Auth.css";


const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	// const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [isLoading, setIsLoading] = useState(false);
// const history = useNavigate();
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					// image: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
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
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
						setIsLoading(true);
						console.log("in login");
						const responseData = await fetch(
							process.env.REACT_APP_BACKEND_URL + `/users/login`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Authorization: "Bearer " + auth.token,
								},

								body: JSON.stringify({
									email: formState.inputs.email.value,
									password: formState.inputs.password.value,
								}),
							}
						);
						const dataLogin = await responseData.json();
						if (!responseData.ok) {
							console.log("response error", dataLogin.message);
							toast.error(dataLogin.message, {
								style: {
									background: "red",
									color: "white",
								},
							});
							setIsLoading(false);
							//history("/home");
							return dataLogin;
						}
						console.log("UpDate", dataLogin);

						auth.login(dataLogin.userId, dataLogin.token, dataLogin.admin);
						setIsLoading(false);
						//history("/home");

							return dataLogin;
					} catch (err) {
							console.log("Login err:", err);
							setIsLoading(false);
						}
			// try {
			// 	const responseData = await sendRequest(
			// 		process.env.REACT_APP_BACKEND_URL + "/users/login",
			// 		"POST",
			// 		JSON.stringify({
			// 			email: formState.inputs.email.value,
			// 			password: formState.inputs.password.value,
			// 		}),
			// 		{
			// 			"Content-Type": "application/json",
			// 		}
			// 	);
			// //	console.log("authlogin", responseData);
			// 	auth.login(responseData.userId, responseData.token,responseData.admin);
			// } catch (err) {
			// 	//console.log("eee", err);
			// 	toast.error(err, {
			// 		style: {
			// 			background: "red",
			// 			color: "white",
			// 		},
			// 	});
			// }
		} else {

			try {
							setIsLoading(true);
							console.log("in new submit");
			
							const responseNew = await fetch(
								process.env.REACT_APP_BACKEND_URL + "/users/signup",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Authorization: "Bearer " + auth.token,
									},

									body: JSON.stringify({
										name: formState.inputs.name.value,
										email: formState.inputs.email.value,
										password: formState.inputs.password.value,
										admin: false,
									}),
								}
							);
							const dataNew = await responseNew.json();
							console.log("ret user data", dataNew);
			
							setIsLoading(false);
							//history("/home");
							
							toast.success("New user added", {
								style: {
									background: "green",
									color: "white",
								},
							});
							// setOpen(false);
							// setOpenPopup(false);
							return dataNew;
						} catch (err) {
							console.log("New User err:", err);
							toast.error(err, {
								style: {
									background: "red",
									color: "white",
								},
							});
							setIsLoading(false);
						}
// 			try {
// 						const formData = new FormData();
// 						formData.append("email", formState.inputs.email.value);
// 						formData.append("name", formState.inputs.name.value);
// 						formData.append("password", formState.inputs.password.value);
// 						//formData.append("image", formState.inputs.image.value);

// 						for (var [key, value] of formData.entries()) {
// 							console.log("formData »", key, value);
// 						}
// 						const responseData = await sendRequest(
// 							process.env.REACT_APP_BACKEND_URL + "/users/signup",
// 							"POST",
// 							formData
// 						);
//  console.log("auth response", responseData)
// 						auth.login(responseData.userId, responseData.token, responseData.admin);
// 					} catch (err) {}
		}
	};

	return (
		<React.Fragment>
			{/* <ErrorModal error={error} onClear={clearError} /> */}
			<Card className='authentication'>
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Login Required</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element='input'
							id='name'
							type='text'
							label='Your Name'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a name.'
							onInput={inputHandler}
						/>
					)}
					{/* {!isLoginMode && (
						<ImageUpload
							center
							id='image'
							onInput={inputHandler}
							btn='Pick Image'
							//errorText='Please provide an image.'
						/>
					)} */}
					<Input
						element='input'
						id='email'
						type='email'
						label='E-Mail'
						validators={[VALIDATOR_EMAIL()]}
						errorText='Please enter a valid email address.'
						onInput={inputHandler}
					/>
					<Input
						element='input'
						id='password'
						type='password'
						label='Password'
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText='Please enter a valid password, at least 6 characters.'
						onInput={inputHandler}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						{isLoginMode ? "Login" : "Signup"}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					Switch to {isLoginMode ? "Signup" : "Login"}
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Auth;

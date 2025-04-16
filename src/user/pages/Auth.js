import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { Button as Btn, Box, Stack } from "@mui/material";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Popup from "../../components/Popup.js";
import ChngPwd from "./ChngPwd.jsx";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import { AuthContext } from "../../shared/context/auth-context";
import { toast } from "sonner";
import "./Auth.css";

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
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
					toast.error(dataLogin.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					setIsLoading(false);

					return dataLogin;
				}

				auth.login(dataLogin.userId, dataLogin.token, dataLogin.admin);
				setIsLoading(false);

				return dataLogin;
			} catch (err) {
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);

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

				setIsLoading(false);

				toast.success("New user added", {
					style: {
						background: "green",
						color: "white",
					},
				});

				return dataNew;
			} catch (err) {
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
	};

	return (
		<React.Fragment>
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
							label='User Name'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a user name.'
							onInput={inputHandler}
						/>
					)}

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

					<Stack>
						<Box
							sx={{
								mx: "auto",
								textAlign: "center",
								p: 0,
								m: 0,
							}}
						>
							<Button type='submit' disabled={!formState.isValid}>
								{isLoginMode ? "Login" : "Signup"}
							</Button>
						</Box>
						{isLoginMode && (
							<Btn
								disabled={!formState.isValid}
								onClick={() => {
									setOpenPopup(true);
								}}
							>
								Change Password
							</Btn>
						)}
					</Stack>
				</form>
				<Button inverse onClick={switchModeHandler}>
					Switch to {isLoginMode ? "Signup" : "Login"}
				</Button>
			</Card>
			<Popup
				title='Loading...'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<ChngPwd openPopup={openPopup} setOpenPopup={setOpenPopup} />
			</Popup>
		</React.Fragment>
	);
};

export default Auth;

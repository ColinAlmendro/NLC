import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Box,
	Divider,
	Container,
	Paper,
	Stack,
	TextField,
	Button,
	IconButton,
	InputAdornment,
	FormControl,
	FormControlLabel,
	Grid,
	CircularProgress,
	Radio,
	RadioGroup,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context.js";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { toast } from "sonner";

function ChngPwd(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);

	const [choice, setChoice] = React.useState("password");

	const [oldEmail, setOldEmail] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [pwdEmail, setPwdEmail] = useState("");

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [error, setError] = useState({
		oldEmail: "",
		newEmail: "",
		confirmEmail: "",
		pwdEmail: "",
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleChoiceChange = (event) => {
		setChoice(event.target.value);
		setError((prev) => {
			const stateObj = {
				...prev,
				oldEmail: "",
				newEmail: "",
				confirmEmail: "",
				pwdEmail: "",
				oldPassword: "",
				newPassword: "",
				confirmPassword: "",
			};
			return stateObj;
		});
		setOldEmail("");
		setNewEmail("");
		setConfirmEmail("");
		setOldPassword("");
		setNewPassword("");
		setConfirmPassword("");
		setPwdEmail("");
	};

	const handleClickShowOldPassword = () => {
		setShowOldPassword(!showOldPassword);
	};
	const handleClickShowNewPassword = () => {
		setShowNewPassword(!showNewPassword);
	};
	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const validateInput = (e) => {
		let { name, value } = e.target;
		setError((prev) => {
			const stateObj = { ...prev, [name]: "" };

			let isValid = true;

			switch (name) {
				case "oldEmail":
					isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
					if (!value) {
						stateObj[name] = "Please enter Email Address.";
					} else if (!isValid) {
						stateObj[name] = "Invalid Email Address.";
					}

					break;
				case "newEmail":
					isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
					if (!value) {
						stateObj[name] = "Please enter Email Address.";
					} else if (!isValid) {
						stateObj[name] = "Invalid Email Address.";
					} else if (confirmEmail && value !== confirmEmail) {
						stateObj["confirmEmail"] =
							"New Email and Confirm Email do not match.";
					} else {
						stateObj["confirmEmail"] = confirmEmail ? "" : error.confirmEmail;
					}
					break;

				case "confirmEmail":
					isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
					if (!value) {
						stateObj[name] = "Please enter Email Address.";
					} else if (!isValid) {
						stateObj[name] = "Invalid Email Address.";
					} else if (newEmail && value !== newEmail) {
						stateObj[name] = "New Email and Confirm Email do not match.";
					}
					break;

				case "pwdEmail":
					isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
					if (!value) {
						stateObj[name] = "Please enter Email Address.";
					} else if (!isValid) {
						stateObj[name] = "Invalid Email Address.";
					}
					break;

				case "oldPassword":
					if (!value) {
						stateObj[name] = "Please enter Password.";
					} else if (value.length < 6) {
						stateObj["oldPassword"] =
							"Please enter a valid password, at least 6 characters.";
					}
					break;

				case "newPassword":
					if (!value) {
						stateObj[name] = "Please enter New Password.";
					} else if (value.length < 6) {
						stateObj["newPassword"] =
							"Please enter a valid password, at least 6 characters.";
					} else if (confirmPassword && value !== confirmPassword) {
						stateObj["confirmPassword"] =
							"New Password and Confirm Password do not match.";
					} else {
						stateObj["confirmPassword"] = confirmPassword
							? ""
							: error.confirmPassword;
					}
					break;

				case "confirmPassword":
					if (!value) {
						stateObj[name] = "Please enter Confirm Password.";
					} else if (value.length < 6) {
						stateObj["confirmPassword"] =
							"Please enter a valid password, at least 6 characters.";
					} else if (newPassword && value !== newPassword) {
						stateObj[name] = "New Password and Confirm Password do not match.";
					}
					break;

				default:
					break;
			}

			return stateObj;
		});
	};

	const onSubmit = async () => {
		if (choice === "email") {
			try {
				setIsLoading(true);

				const responseChangeEmail = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/users/changeEmail`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							old_email: oldEmail,
							new_email: newEmail,
							confirm_email: confirmEmail,
							old_password: oldPassword,
						}),
					}
				);
				const dataChangeEmail = await responseChangeEmail.json();
				if (!responseChangeEmail.ok) {
					toast.error(dataChangeEmail.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					return data;
				}

				setIsLoading(false);

				toast.success("Email updated", {
					style: {
						background: "green",
						color: "white",
					},
				});

				setOpen(false);
				setOpenPopup(false);
				return dataChangeEmail;
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

				const responseChangePwd = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/users/changePwd",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							new_password: newPassword,
							confirm_password: confirmPassword,
							pwd_email: pwdEmail,
						}),
					}
				);
				const dataChangePwd = await responseChangePwd.json();

				setIsLoading(false);

				toast.success("Password updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				setOpen(false);
				setOpenPopup(false);
				return dataChangePwd;
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

		// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	};
	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<Container sx={{ border: "none" }}>
				<Paper>
					<Box display='flex' p={2}>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={0}
							sx={{ border: "none" }}
						>
							<Grid item xs={12} lg={12}>
								<Stack direction='row'>
									<Grid item xs={12} lg={9}>
										<Box
											sx={{
												mx: "auto",
												textAlign: "center",
												p: 2,
												m: 0,
											}}
										>
											<FormControl>
												<Typography fontWeight='700' variant='h5'>
													Change Login
												</Typography>

												<RadioGroup
													aria-labelledby='demo-radio-buttons-group-label'
													defaultValue='password'
													name='radio-buttons-group'
													value={choice}
													onChange={handleChoiceChange}
												>
													<FormControlLabel
														value='password'
														control={<Radio />}
														label='Password'
													/>
													<FormControlLabel
														value='email'
														control={<Radio />}
														label='Email'
													/>
												</RadioGroup>
											</FormControl>
										</Box>
									</Grid>
									<Grid item xs={12} lg={3}>
										<Stack direction='row' spacing={1}>
											<Button
												sx={{ gap: "1rem" }}
												variant='contained'
												color='error'
												autoFocus
												onClick={() => {
													setOpenPopup(false);
													setOpen(false); // ,
												}}
											>
												Cancel
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												variant='contained'
												color='success'
												type='button'
												onClick={() => {
													onSubmit();
												}}
												disabled={
													error.oldEmail !== "" ||
													error.newEmail !== "" ||
													error.confirmEmail !== "" ||
													error.oldPassword !== "" ||
													error.newPassword !== "" ||
													error.confirmPassword !== "" ||
													error.pwdEmail !== "" ||
													(choice === "email" && oldEmail === "") ||
													(choice === "email" && newEmail === "") ||
													(choice === "email" && confirmEmail === "") ||
													(choice === "email" && oldPassword === "") ||
													(choice === "password" && newPassword === "") ||
													(choice === "password" && confirmPassword === "") ||
													(choice === "password" && pwdEmail === "")
												}
											>
												Save
											</Button>
										</Stack>
									</Grid>
								</Stack>
							</Grid>

							<Divider sx={{ my: 1 }} />

							<Grid item xs={12} lg={12}>
								<div className='conditional-container'>
									{choice === "email" ? (
										//* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&    EMAIL *
										<div className='conditional-email'>
											<Stack spacing={2}>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='oldEmail'
																size='small'
																type='email'
																value={oldEmail}
																onChange={(e) => {
																	setOldEmail(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																fullWidth
																autoComplete='new-password'
																placeholder='Enter current email address'
															/>
															{error.oldEmail && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.oldEmail}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='newEmail'
																size='small'
																type='email'
																value={newEmail}
																onChange={(e) => {
																	setNewEmail(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																fullWidth
																autoComplete='new-password'
																placeholder='Enter new email address'
															/>
															{error.newEmail && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.newEmail}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='confirmEmail'
																size='small'
																type='email'
																value={confirmEmail}
																onChange={(e) => {
																	setConfirmEmail(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																fullWidth
																autoComplete='new-password'
																placeholder='Confirm new email address'
															/>
															{error.confirmEmail && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.confirmEmail}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='oldPassword'
																size='80'
																type={showOldPassword ? "text" : "password"}
																value={oldPassword}
																onChange={(e) => {
																	setOldPassword(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																InputProps={{
																	endAdornment: (
																		<InputAdornment position='end'>
																			<IconButton
																				aria-label='toggle password visibility'
																				onClick={handleClickShowOldPassword}
																				edge='end'
																			>
																				{showOldPassword ? (
																					<VisibilityOff />
																				) : (
																					<Visibility />
																				)}
																			</IconButton>
																		</InputAdornment>
																	),
																}}
																fullWidth
																autoComplete='new-password'
																id='old_password'
																placeholder='Enter password'
															/>
															{error.oldPassword && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.oldPassword}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
											</Stack>
										</div>
									) : (
										//* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&    PASSWORD *
										<div className='conditional-pwd'>
											<Stack spacing={2}>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='pwdEmail'
																size='small'
																type='email'
																value={pwdEmail}
																onChange={(e) => {
																	setPwdEmail(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																fullWidth
																autoComplete='new-password'
																placeholder='Enter email address'
															/>
															{error.pwdEmail && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.pwdEmail}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='newPassword'
																size='small'
																type={showNewPassword ? "text" : "password"}
																value={newPassword}
																onChange={(e) => {
																	setNewPassword(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																InputProps={{
																	endAdornment: (
																		<InputAdornment position='end'>
																			<IconButton
																				aria-label='toggle password visibility'
																				onClick={handleClickShowNewPassword}
																				edge='end'
																			>
																				{showNewPassword ? (
																					<VisibilityOff />
																				) : (
																					<Visibility />
																				)}
																			</IconButton>
																		</InputAdornment>
																	),
																}}
																fullWidth
																autoComplete='new-password'
																placeholder='Enter new password, at least 6 characters.'
															/>
															{error.newPassword && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.newPassword}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
												<Stack direction='row' spacing={2}>
													<Grid item xs={12} lg={12}>
														<Box bgcolor='primary.light' p={0}>
															<TextField
																name='confirmPassword'
																size='small'
																type={showConfirmPassword ? "text" : "password"}
																value={confirmPassword}
																onChange={(e) => {
																	setConfirmPassword(e.target.value);
																	validateInput(e);
																}}
																onBlur={validateInput}
																required={true}
																InputProps={{
																	endAdornment: (
																		<InputAdornment position='end'>
																			<IconButton
																				aria-label='toggle password visibility'
																				onClick={handleClickShowConfirmPassword}
																				edge='end'
																			>
																				{showConfirmPassword ? (
																					<VisibilityOff />
																				) : (
																					<Visibility />
																				)}
																			</IconButton>
																		</InputAdornment>
																	),
																}}
																fullWidth
																autoComplete='new-password'
																placeholder='Confirm new password'
															/>
															{error.confirmPassword && (
																<span>
																	<Typography
																		variant='body1'
																		style={{
																			color: "red",
																			backgroundColor: "white",
																		}}
																	>
																		{error.confirmPassword}
																	</Typography>
																</span>
															)}
														</Box>
													</Grid>
												</Stack>
											</Stack>
										</div>
									)}
								</div>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Container>
		</>
	);
}

export default ChngPwd;

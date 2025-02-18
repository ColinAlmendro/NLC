import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Box,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	IconButton,
	MenuItem,
	FormLabel,
	FormControl,
	List,
	ListItem,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
	Checkbox,
} from "@mui/material";

import * as Yup from "yup";
import { useValue } from "../../shared/context/SettingsProvider.js";
import { useUsersValue } from "../../shared/context/UsersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FieldInputText from "./FieldInputText.jsx";
import FieldInputTextarea from "./FieldInputTextarea.jsx";
import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import "./Listitem.css";
import { makeStyles } from "@mui/styles";

import { toast } from "sonner";

const useStyles = makeStyles({
	label: {
		color: "#212121",
		"&.Mui-focused": {
			color: "black",
		},
	},
});

const validationSchema = Yup.object()
	.shape({
		name: Yup.string()
			.required()
			.label("Name")
			.typeError("Name required"),

		email: Yup.string()
			.email("Invalid email format")
			.required()
			.label("Email"),
		password: Yup.string()
			.required()
			.min(6, "Minimum of 6 characters required")
			.label("Password"),
		admin: Yup.boolean()
			.required()
			.label("Admin")
			.typeError("Admin required"),
	})
	.required();

function UsersForm(props) {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const [administrator, setAdministrator] = useState(false);
	const { state, dispatch } = useValue();
	const {
		usersState: { users, selected_user },
		dispatchUser,
	} = useUsersValue();
	//const [areaList, setAreaList] = useState(state.area_list);
	const [record, setRecord] = useState(selected_user[0]);

	const history = useNavigate();

	let defaultUser = {};
	if (record) {
		console.log("ISrecordY", record);
		// setAdministrator(record.admin);
		defaultUser = {
			...record,
		};
	} else {
		console.log("ISrecordN", record);
		defaultUser = {
			name: "",
			email: "",
			password: "",
			admin: false,
		};
	}

	useEffect(() => {
		
		if (record) {
			setAdministrator(record.admin);
		}
	}, []);

	const formProps = useForm({
		defaultValues: defaultUser,
		resolver: yupResolver(validationSchema),
		mode: "all",
	});
	const {
		register,
		handleSubmit,
		formState,
		control,
		reset,
		watch,
		setValue,
		getValues,
	} = formProps;

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

	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	const onSubmit = async (data) => {
		console.log("clicked", data);

		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/users/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							name: data.name,
							email: data.email,
							password: data.password,
							admin: data.admin,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					console.log("response error", dataEdit.message);
					toast.error(dataEdit.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					return data;
				}
				console.log("UpDateUser", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/users");
				//alert("User updated");
				toast.success("User updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.users;
			} catch (err) {
				console.log("Update err:", err);
				setIsLoading(false);
			}
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
							name: data.name,
							email: data.email,
							password: data.password,
							admin: data.admin,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/users");
				//alert("New user added");
				toast.success("New user added", {
					style: {
						background: "green",
						color: "white",
					},
				});
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				console.log("SubmitNew err:", err);
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
					{/* {isLoading && <LoadingSpinner asOverlay />} */}

					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={0}
									sx={{ border: "none" }} //1px solid
								>
									<Grid item xs={12} lg={12}>
										<Stack direction='row'>
											<Grid item xs={12} lg={10}>
												<Box
													sx={{
														mx: "auto",
														textAlign: "center",
														p: 2,
														m: 0,
													}}
												>
													<Typography fontWeight='700' variant='h5'>
														User
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} lg={2}>
												<Stack direction='row'>
													<Button
														sx={{ gap: "1rem" }}
														variant='outlined'
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
														variant='outlined'
														color='success'
														type='submit'
													>
														Save
													</Button>
												</Stack>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 6 }} />

									<Grid item xs={12} lg={12}>
										<Stack spacing={2}>
											<Stack direction='row' spacing={2}>
												<Stack>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Username
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText name='name' control={control} />
													</Box>
												</Stack>

												<Stack style={{ width: "100%" }}>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Email
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText name='email' control={control} />
													</Box>
												</Stack>
											</Stack>
											<Stack style={{ width: "50%" }}>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Password
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText
														name='password'
														control={control}
														// label='Address'
													/>
												</Box>
											</Stack>
											<Stack direction='row' spacing={2}>
												<Stack>
													<Controller
														name='admin'
														control={control}
														render={({
															field: { onChange, value },
															fieldState: { error },
														}) => {
															return (
																<>
																	<InputLabel
																		sx={{ textAlign: "left" }}
																		className={classes.label}
																	>
																		Administrator
																	</InputLabel>
																	<Box bgcolor='primary.light' p={0}>
																		<Checkbox
																			checked={administrator}
																			// onChange={handleAdminChange}
																			onChange={(event) => {
																				onChange(event.target.checked);
																				setAdministrator(event.target.checked);
																			}}
																			// inputProps={{
																			// 	"aria-label": "controlled",
																			// }}
																			onError={error}
																		/>
																	</Box>
																</>
															);
														}}
													/>
												</Stack>
											</Stack>
										</Stack>
									</Grid>
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
		</>
	);
}

export default UsersForm;

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
} from "@mui/material";

import * as Yup from "yup";
import { useValue } from "../../shared/context/SettingsProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FieldInputText from "./FieldInputText";
import FieldInputTextarea from "./FieldInputTextarea";
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
		surname: Yup.string()
			.required()
			.label("Name")
			.typeError("Surname required"),
		cell: Yup.string()
			.required()
			.label("Cell")
			.matches(/^[0-9]+$/, "Invalid cell no.")
			.min(10, "Invalid cell no.")
			.typeError("Cell no. required"),
		email: Yup.string()
			.email("Invalid email format")
			.required()
			.label("Email"),
		dob: Yup.string()
			.notRequired()
			.label("Birthday"),
		address1: Yup.string()
			.required()
			.label("Address")
			.typeError("Address required"),
		area: Yup.string()
			.required()
			.label("Area")
			.typeError("Area required"),
		note: Yup.string()
			.notRequired()
			.label("Name"),
	})
	.required();

function CustomersForm(props) {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const { state, dispatch } = useValue();
	const {
		customersState: { customers, selected_customer },
		dispatchCustomer,
	} = useCustomersValue();
	const [areaList, setAreaList] = useState(state.area_list);
	const [record, setRecord] = useState(selected_customer[0]);

	const history = useNavigate();

	let defaultCustomer = {};
	if (record) {
		console.log("ISrecordY", record);
		defaultCustomer = {
			...record,
		};
	} else {
		console.log("ISrecordN", record);
		defaultCustomer = {
			name: "",
			surname: "",
			dob: "",
			cell: "",
			email: "",
			address1: "",
			area: "",
			note: "",
		};
	}

	const formProps = useForm({
		defaultValues: defaultCustomer,
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
		// e.preventDefault();
		console.log("clicked", data);

		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/customers/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							name: data.name,
							surname: data.surname,
							dob: data.dob,
							cell: data.cell,
							email: data.email,
							address1: data.address1,
							area: data.area,
							note: data.note,
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
				console.log("UpDate", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/customers");
				//alert("Customer updated");
				toast.success("Customer updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.customers;
			} catch (err) {
				console.log("Update err:", err);
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				console.log("in new submit");

				const responseNew = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/customers/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							name: data.name,
							surname: data.surname,
							dob: data.dob,
							cell: data.cell,
							email: data.email,
							address1: data.address1,
							area: data.area,
							note: data.note,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/customers");
				//alert("New customer added");
				toast.success("New customer added", {
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
														Customer
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
														Name
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText
															name='name'
															control={control}
														
														/>
													</Box>
												</Stack>
												<Stack style={{ width: "100%" }}>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Surname
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText
															name='surname'
															control={control}
														
														/>
													</Box>
												</Stack>
											</Stack>
											<Stack direction='row' spacing={2}>
												<Stack>
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Cell
													</InputLabel>
													<Box bgcolor='primary.light' p={0}>
														<FieldInputText
															name='cell'
															control={control}
														
														/>
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
														<FieldInputText
															name='email'
															control={control}
															
														/>
													</Box>
												</Stack>
											</Stack>
											<Stack style={{ width: "100%" }}>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Address
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputText
														name='address1'
														control={control}
														// label='Address'
													/>
												</Box>
											</Stack>
											<Stack direction='row' spacing={2}>
												<Stack>
													<Controller
														name='area'
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
																		Area
																	</InputLabel>
																	<Box bgcolor='primary.light' p={0}>
																		<TextField
																			select
																			value={value}
																			onChange={(event) => {
																				onChange(event.target.value);
																			}}
																			sx={{
																				"& fieldset": { border: "none" },
																				"& .MuiInputBase-root": {
																					"& input": {
																						textAlign: "left",
																					},
																				},

																				border: "1px solid",
																			}}
																			size='small'
																			// fullWidth
																			style={{ width: 200 }}
																			helperText={`${
																				error?.message ? error?.message : ""
																			}`}
																			error={!!error}
																		>
																			{areaList.map((option) => (
																				<MenuItem
																					key={option.id}
																					value={option.area}
																				>
																					{option.area}
																				</MenuItem>
																			))}
																		</TextField>
																	</Box>
																</>
															);
														}}
													/>
												</Stack>

												<Stack >
													<InputLabel
														sx={{ textAlign: "left" }}
														className={classes.label}
													>
														Birthday
													</InputLabel>
													<Box
														id='dobBox'
														style={{ marginTop: "1px", padding: "none" }}
														sx={{
															"& .MuiTextField-root": {
																border: "1px solid",
																color: "lightgrey",
															},
															mx: "auto",
															mt: 0,
															//	bgcolor: "primary.light",
														}}
													>
														<Controller
															name='dob'
															control={control}
															render={({
																field: { onChange, value },
																fieldState: { error },
															}) => {
																console.log("datevalue", value);
																return (
																	<LocalizationProvider
																		dateAdapter={AdapterDateFns}
																	>
																		<DatePicker
																			id='dobPicker'
																			// label='Birthday'
																			variant='inline'
																			inputFormat='dd MMMM yyyy'
																			value={new Date(value)}
																			//	 value={value}
																			// onChange={(newValue) => setValue(newValue)}
																			onChange={(date) => {
																				onChange(date);
																			}}
																			sx={{
																				"& fieldset": { border: "1px solid" },
																				"& .MuiInputBase-root": {
																					"& input": {
																						textAlign: "left",
																					},
																				},
																				border: "1px solid",
																				mb: 2,
																			}}
																			size='small'
																			// helperText={`${
																			// 	error?.message ? error?.message : ""
																			// }`}
																			// error={!!error}
																		/>
																	</LocalizationProvider>
																);
															}}
														/>
													</Box>
												</Stack>
											</Stack>
											<Stack>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Note
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<FieldInputTextarea
														name='note'
														// label='Note'
														control={control}
													/>
												</Box>
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

export default CustomersForm;

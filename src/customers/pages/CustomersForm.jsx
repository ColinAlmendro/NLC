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
import DeleteIcon from "@mui/icons-material/Delete";
// import { NumericFormat } from "react-number-format";
import * as Yup from "yup";
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
			.typeError("Cell no. required"),
		email: Yup.string()
			.notRequired()
			.label("Email"),
		dob: Yup.string()
			.notRequired()
			.label("Birthday"),
		address1: Yup.string()
			.required()
			.label("Address")
			.typeError("Address required"),
		address2: Yup.string()
			.required()
			.label("Area")
			.typeError("Area required"),
		// location: Yup.string()
		// 	.notRequired()
		// 	.label("Name"),
		note: Yup.string()
			.notRequired()
			.label("Name")
	})
	.required();

function CustomersForm(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const {
		customersState: { customers, selected_customer },
		dispatchCustomer,
	} = useCustomersValue();

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
			address2: "",
			// location: "",
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

	// const { fields, append, remove } = useFieldArray({
	// 	control,
	// 	name: `items`,
	// });
	//console.log("xtra record",record)

	// const [customerItem, setCustomerItem] = useState({
	// 	name: "",
	// 	cell: "",
	// 	email: "",
	// 	address1: "",
	// 	address2: "",
	// 	location: "",
	// 	note: "",
	// });
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
							address2: data.address2,
							// location: data.location,
							note: data.note,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					console.log("response error", dataEdit.message);
					return data;
				}
				console.log("UpDate", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/customers");
				alert("Customer updated");
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
							address2: data.address2,
							// location: data.location,
							note: data.note,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/customers");
				alert("New customer added");
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				console.log("SubmitNew err:", err);
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
					{isLoading && <LoadingSpinner asOverlay />}

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
														// width='100px'
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
														// width='100px'
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
												<Stack spacing={2}>
													<InputLabel sx={{ textAlign: "left" }}>
														Name
													</InputLabel>
													
														<FieldInputText
															name='name'
															control={control}
															// label='Name'
														/>
												
												</Stack>
												<Stack spacing={2} style={{ width: "100%" }}>
													<InputLabel sx={{ textAlign: "left" }}>
														Surname
													</InputLabel>
													<FieldInputText
														name='surname'
														control={control}
														// label='Surname'
													/>
												</Stack>
											</Stack>
											<Stack direction='row' spacing={2}>
												<Stack spacing={2}>
													<InputLabel sx={{ textAlign: "left" }}>
														Cell
													</InputLabel>
													<FieldInputText
														name='cell'
														control={control}
														// label='Cell'
													/>
												</Stack>
												<Stack spacing={2} style={{ width: "100%" }}>
													<InputLabel sx={{ textAlign: "left" }}>
														Email
													</InputLabel>
													<FieldInputText
														name='email'
														control={control}
														// label='Email'
													/>
												</Stack>
											</Stack>

											<InputLabel sx={{ textAlign: "left" }}>
												Address
											</InputLabel>
											<FieldInputText
												name='address1'
												control={control}
												// label='Address'
											/>
											<Stack direction='row' spacing={2}>
												<Stack spacing={2}>
													<InputLabel sx={{ textAlign: "left" }}>
														Area
													</InputLabel>
													<FieldInputText
														name='address2'
														control={control}
														// label='Area'
													/>
												</Stack>
												<Stack spacing={2}>
													<InputLabel sx={{ textAlign: "left" }}>
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
																				"& fieldset": { border: "none" },
																				"& .MuiInputBase-root": {
																					"& input": {
																						textAlign: "left",
																					},
																				},
																				border: "none",
																				mb: 2,
																			}}

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
													{/* <InputLabel sx={{ textAlign: "left" }}>
														Location
													</InputLabel>
													<FieldInputText
														name='location'
														control={control}
														// label='Location'
													/> */}
												</Stack>
											</Stack>
											<InputLabel sx={{ textAlign: "left" }}>Note</InputLabel>
											<FieldInputTextarea
												name='note'
												// label='Note'
												control={control}
											/>
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

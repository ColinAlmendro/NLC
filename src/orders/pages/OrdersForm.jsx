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
import OrderDay from "./OrderDay.jsx";
import * as Yup from "yup";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
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
// import { File } from "buffer";

const validationSchema = Yup.object()
	.shape({})
	.required();

function OrdersForm(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const {
		menuState: { menus, selected_menu },
		dispatchMenu,
	} = useMenuValue();
	const {
		customersState: { customers, selected_customer },
		dispatchCustomer,
	} = useCustomersValue();
	const {
		ordersState: { orders, selected_order },
		dispatchOrder,
	} = useOrdersValue();

	const [record, setRecord] = useState(selected_order[0]);

	// const [orderImage, setOrderImage] = useState(null);
	// const [orderImagePreview, setOrderImagePreview] = useState(null);
	// const [addItemDisabled, setAddItemDisabled] = useState(true);
	const history = useNavigate();

	const customerOptions = [...customers].sort((a, b) =>
		a.name > b.name ? -1 : 1
	);

	const menuOptions = [...menus].sort((a, b) =>
		new Date(a.date) < new Date(b.date) ? -1 : 1
	);

	let defaultOrder = {};
	if (record) {
		console.log("ISrecordY", record);
		console.log("ISrecordYselectedCustomer", selected_customer[0]);
		console.log("ISrecordYselectedMenu", selected_menu);
		defaultOrder = {
			...record,
			customer: selected_customer[0]._id,
			menu: selected_menu[0]._id,
		};
	} else {
		console.log("ISrecordN", record);
		defaultOrder = {
			date: new Date(),
			customer: "",
			menu: "",
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			item_count: 0,
			total_price: 0,
		};
	}

	const formProps = useForm({
		defaultValues: defaultOrder,
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

	const { fields, append, remove } = useFieldArray({
		control,
		name: `items`,
	});
	//console.log("xtra record",record)

	const [orderItem, setOrderItem] = useState({
		image: "",
		name: "",
		description: "",
		volume: "",
		price: "",
	});

	const onSubmit = async (data) => {
		// e.preventDefault();
		console.log("clicked", data);

		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/orders/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							order: data.order,
							items: data.items,
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
				history("/orders");
				alert("Order updated");
				return data.orders;
			} catch (err) {
				console.log("Update err:", err);
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				console.log("in new submit");

				const responseNew = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/orders/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							order: data.order,
							items: data.items,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/orders");
				alert("New order added");
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
			{/* // 55555555555555555555555555555555555555555555555555555555555555555555555555555555555 */}
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
														Order
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
										<Stack direction='row' sx={{ justifyContent: "center" }}>
											<Grid item xs={6} lg={6}>
												<Controller
													name='menu'
													control={control}
													render={({
														field: { onChange, value },
														fieldState: { error },
													}) => {
														return (
															<TextField
																select
																value={value}
																onChange={(event) => {
																	onChange(event.target.value);
																	dispatchMenu({
																		type: "SET_SELECTED_MENU",
																		id: event.target.value,
																	});
																}}
																label='Menu'
																name='menu'
																size='small'
																sx={{ width: "100%" }}
															>
																{menuOptions.map((item) => (
																	<MenuItem key={item._id} value={item._id}>
																		{new Date(item.date).toLocaleDateString()}
																	</MenuItem>
																))}
															</TextField>
														);
													}}
												/>
											</Grid>

											<Grid item xs={6} lg={6}>
												<Controller
													name='customer'
													control={control}
													render={({
														field: { onChange, value },
														fieldState: { error },
													}) => {
														return (
															<TextField
																select
																value={value}
																onChange={(event) => {
																	onChange(event.target.value);
																}}
																label='Customer'
																name='customer'
																size='small'
																sx={{ width: "100%" }}
															>
																{customerOptions.map((item) => (
																	<MenuItem key={item._id} value={item._id}>
																		{`${item.name} ${item.surname}`}
																	</MenuItem>
																))}
															</TextField>
														);
													}}
												/>
											</Grid>
										</Stack>
									</Grid>
									{/* <Divider sx={{ my: 6 }} /> */}
									{/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&              NEW ITEM INPUT */}
									{selected_menu[0] && (
										<Grid item xs={12} lg={12}>
											<OrderDay weekday='monday' />
											<OrderDay weekday='tuesday' />
											<OrderDay weekday='wednesday' />
											<OrderDay weekday='thursday' />
											<OrderDay weekday='friday' />
										</Grid>
									)}

									{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
			{/* </DialogContent>
			</Dialog> */}
		</>
	);
}

export default OrdersForm;

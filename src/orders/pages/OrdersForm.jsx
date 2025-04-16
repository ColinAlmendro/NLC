import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Box,
	Divider,
	// Dialog,
	// DialogTitle,
	// DialogContent,
	// DialogContentText,
	// DialogActions,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	//IconButton,
	MenuItem,
	// FormLabel,
	// FormControl,
	// List,
	// ListItem,
	// ListItemText,
	// ListItemButton,
	// ListSubheader,
	Tabs,
	Tab,
	Grid,
	// GridItem,
	// Card,
	// CardMedia,
	CircularProgress,
	//Collapse,
} from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
//import DeleteIcon from "@mui/icons-material/Delete";
import OrderDay from "./OrderDay.jsx";
import OrderPromotion from "./OrderPromotion.jsx";
import * as Yup from "yup";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import CartContext from "../../shared/context/cart-context";
import CartList from "./CartList";
import CartPopup from "./CartPopup.js";
// import FieldInputTextarea from "./FieldInputTextarea";

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
			color: "darkred",
		},
	},
});

const validationSchema = Yup.object()
	.shape({})
	.required();

function OrdersForm(props) {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(false);
	const [disableMenu, setDisableMenu] = useState(true);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const [openCartPopup, setOpenCartPopup] = useState(false);

	const [memo, setMemo] = useState("");

	let {
		items,
		totalCount,
		totalCost,
		totalAmount,
		addItem,
		removeItem,
		resetCart,
	} = useContext(CartContext);

	useEffect(() => {
		resetCart();
	}, []);

	const {
		menuState: { menus, selected_menu, promotions },
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

	const history = useNavigate();

	const customerOptions = [...customers].sort((a, b) =>
		a.name < b.name ? -1 : 1
	);

	const menuOptions = [...menus].sort((a, b) =>
		new Date(a.date) > new Date(b.date) ? -1 : 1
	);

	let defaultOrder = {};
	if (record) {
		defaultOrder = {
			...record,
			customer: selected_customer[0]._id,
			menu: selected_menu[0]._id,
		};
	} else {
		defaultOrder = {
			date: new Date(),
			customer: "",
			menu: "",
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			frozen: [],
			promotion: [],
			item_count: 0,
			total_cost: 0,
			total_price: 0,
			note: "",
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

	const [orderItem, setOrderItem] = useState({
		image: "",
		name: "",
		description: "",
		volume: "",
		price: "",
	});

	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const handleTabChange = (e, tabIndex) => {
		setCurrentTabIndex(tabIndex);
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
			<Container sx={{ border: "none", width: "100%" }}>
				<Paper>
					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form>
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
														New Order
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} lg={2}>
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
														onClick={() => {
															setOpenCartPopup(true);
														}}
													>
														Next
													</Button>
												</Stack>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 6 }} />
									<Grid item xs={12} lg={12} padding={2}>
										<Stack
											direction='row'
											sx={{ justifyContent: "center" }}
											spacing={2}
										>
											<Grid item xs={4} lg={4}>
												<Controller
													name='customer'
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
																	Customer
																</InputLabel>
																<Box bgcolor='primary.light' p={0}>
																	<TextField
																		select
																		value={value}
																		onChange={(event) => {
																			onChange(event.target.value);
																			dispatchCustomer({
																				type: "SET_SELECTED_CUSTOMER",
																				id: event.target.value,
																			});
																			setDisableMenu(false);
																		}}
																		name='customer'
																		size='small'
																		sx={{
																			"& fieldset": { border: "none" },
																			"& .MuiInputBase-root": {
																				"& input": {
																					textAlign: "left",
																				},
																			},
																			width: "100%",
																			border: "1px solid",
																		}}
																	>
																		{customerOptions.map((item) => (
																			<MenuItem key={item._id} value={item._id}>
																				{`${item.name} ${item.surname}`}
																			</MenuItem>
																		))}
																	</TextField>
																</Box>
															</>
														);
													}}
												/>
											</Grid>
											<Grid item xs={4} lg={4}>
												<Controller
													name='menu'
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
																	Menu
																</InputLabel>
																<Box bgcolor='primary.light' p={0}>
																	<TextField
																		disabled={disableMenu}
																		select
																		value={value}
																		onChange={(event) => {
																			onChange(event.target.value);
																			dispatchMenu({
																				type: "SET_SELECTED_MENU",
																				id: event.target.value,
																			});
																		}}
																		name='menu'
																		size='small'
																		sx={{
																			"& fieldset": { border: "none" },
																			"& .MuiInputBase-root": {
																				"& input": {
																					textAlign: "left",
																				},
																			},
																			width: "100%",
																			border: "1px solid",
																		}}
																	>
																		{menuOptions.map((item) => (
																			<MenuItem key={item._id} value={item._id}>
																				{new Date(item.date).toLocaleDateString(
																					"en-ZA"
																				)}
																			</MenuItem>
																		))}
																	</TextField>
																</Box>
															</>
														);
													}}
												/>
											</Grid>

											<Grid item xs={3} lg={3}></Grid>
											<Grid item xs={1} lg={1}>
												<Cart
													openCartPopup={openCartPopup}
													setOpenCartPopup={setOpenCartPopup}
												/>
											</Grid>
										</Stack>
										<Grid item xs={12} lg={12} padding={0}>
											<InputLabel
												sx={{ textAlign: "left" }}
												className={classes.label}
											>
												Note
											</InputLabel>
											<Box bgcolor='primary.light' p={0}>
												<Controller
													name='note'
													control={control}
													render={({
														field: { onChange, value },
														fieldState: { error },
													}) => {
														return (
															<TextField
																onChange={(event) => {
																	onChange(event.target.value);
																	setMemo(event.target.value);
																}}
																value={value}
																size='small'
																style={{ marginTop: "1px" }}
																helperText={`${
																	error?.message ? error?.message : ""
																}`}
																error={!!error}
																fullWidth
																minRows={1}
																multiline='true'
																sx={{
																	"& fieldset": { border: "none" },
																	"& .MuiInputBase-root": {
																		"& input": {
																			textAlign: "left",
																		},
																	},
																	border: "1px solid",
																}}
															/>
														);
													}}
												/>
											</Box>
										</Grid>
									</Grid>

									{/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&              NEW ITEM INPUT */}

									{selected_menu[0] && (
										<Grid item xs={12} lg={12}>
											<Tabs
												value={currentTabIndex}
												onChange={handleTabChange}
												centered
												TabIndicatorProps={{
													style: {
														backgroundColor: "#497777",
													},
												}}
											>
												<Tab label='Monday' />
												<Tab label='Tuesday' />
												<Tab label='Wednesday' />
												<Tab label='Thursday' />
												<Tab label='Friday' />
												<Tab label='Frozen Meals' />

												{selected_menu[0].promotion !== "none" && (
													<Tab label='Promotion' />
												)}
											</Tabs>

											{/* MONDAY Contents */}
											{currentTabIndex === 0 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='monday' />
												</Box>
											)}
											{/* TUESDAY Contents */}
											{currentTabIndex === 1 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='tuesday' />
												</Box>
											)}
											{/* WEDNESDAY Contents */}
											{currentTabIndex === 2 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='wednesday' />
												</Box>
											)}
											{/* THURSDAY Contents */}
											{currentTabIndex === 3 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='thursday' />
												</Box>
											)}
											{/* FRIDAY Contents */}
											{currentTabIndex === 4 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='friday' />
												</Box>
											)}

											{/* FROZEN Contents */}
											{currentTabIndex === 5 && (
												<Box sx={{ p: 3 }}>
													<OrderDay weekday='frozen' />
												</Box>
											)}
											{/* PROMO Contents */}

											{selected_menu[0].promotion !== "none" &&
												currentTabIndex === 6 && (
													<Box sx={{ p: 3 }}>
														<OrderPromotion weekday='promotion' />
													</Box>
												)}
											{/* 7777777777777777777777777777777777777777777777777777777 */}
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

			<CartPopup
				title='Order Cart'
				openCartPopup={openCartPopup}
				setOpenCartPopup={setOpenCartPopup}
			>
				<CartList
					openCartPopup={openCartPopup}
					setOpenCartPopup={setOpenCartPopup}
					menu={selected_menu[0]}
					customer={selected_customer[0]}
					note={memo}
				/>
			</CartPopup>
		</>
	);
}

export default OrdersForm;

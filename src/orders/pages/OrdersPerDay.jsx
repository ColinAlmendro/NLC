import React, { useState, useEffect, useContext, useRef } from "react";
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
	ListItemText,
	ListItemButton,
	ListSubheader,
	Tabs,
	Tab,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
	Collapse,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import DaysOrder from "./DaysOrder.jsx";
import OrderPromotion from "./OrderPromotion.jsx";
// import * as Yup from "yup";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ViewOrder.css";

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
	toggle: {
		width: 50,
		"& .Mui-checked": {
			color: "#109125",
			transform: "translateX(25px) !important",
		},
		"& .MuiSwitch-track": {
			backgroundColor: "#008000e0",
		},
	},
});
// const useStyles = makeStyles((theme) => ({
// 	toggleButtonSelected: {
// 		"&.MuiToggleButton-root": {
// 			"background-color": "red",
// 		},
// 	},
// }));

// const validationSchema = Yup.object()
// 	.shape({})
// 	.required();

function OrdersPerDay(props) {
	const classes = useStyles();
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [menuOrders, setMenuOrders] = useState([]);

	const [openMonday, setOpenMonday] = useState(false);
	const [openTuesday, setOpenTuesday] = useState(false);
	const [openWednesday, setOpenWednesday] = useState(false);
	const [openThursday, setOpenThursday] = useState(false);
	const [openFriday, setOpenFriday] = useState(false);
	const [openFrozen, setOpenFrozen] = useState(false);
	const [openPromo, setOpenPromo] = useState(false);
	const [memo, setMemo] = useState("");
	const [promoId, setPromoId] = useState("");
	const [notes, setNotes] = useState([]);

	const [display, setDisplay] = React.useState("customers");
	const pdfRef = useRef();
	let notesArr = [];

	const handleDisplay = (event, newDisplay) => {
		console.log("display", newDisplay);
		setDisplay(newDisplay);
	};


	const {
		menuState: { menus, selected_menu, promotions },
		dispatchMenu,
	} = useMenuValue();

	const {
		ordersState: { orders, selected_order },
		dispatchOrder,
	} = useOrdersValue();

	const history = useNavigate();

	const menuOptions = [...menus].sort((a, b) =>
		new Date(a.date) < new Date(b.date) ? -1 : 1
	);

	useEffect(() => {
		async function fetchMenus() {
			//console.log("fetching orders");
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/menus/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				//	console.log("Menus list :", data.menus);
				dispatchMenu({
					type: "UPDATE_MENUS",
					data,
				});
				dispatchMenu({
					type: "RESET_SELECTED_MENU",
				});
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchMenus();
	}, []);

	useEffect(() => {
		async function fetchOrders() {
			//console.log("fetching orders");
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/orders/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				//	console.log("Orders list :", data.orders);
				dispatchOrder({
					type: "UPDATE_ORDERS",
					data,
				});
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchOrders();
	}, []);

	const getOrderNotes = (event) => {
		let temp = orders;
		// let noteObj = {
		// 	customer: "",
		// 	note: "",
		// };
		temp = temp.filter((order) => order.menu.id === event.target.value);
		// console.log("temporders", temp);

		notesArr = temp.map((item, i) => {
			
			let noteObj = {
				customer: "",
				note: "",
			};
			if (item.note) {
				noteObj.customer = item.customer.name + " " + item.customer.surname;
				noteObj.note = item.note;
				notesArr.push(noteObj);
				setNotes(notesArr);
			}
		});
	};

	const [currentTabIndex, setCurrentTabIndex] = useState(0);

	const handleTabChange = (e, tabIndex) => {
		//	console.log(tabIndex);
		setCurrentTabIndex(tabIndex);
	};

	const handleMondayClick = () => {
		setOpenMonday(!openMonday);
	};
	const handleTuesdayClick = () => {
		setOpenTuesday(!openTuesday);
	};
	const handleWednesdayClick = () => {
		setOpenWednesday(!openWednesday);
	};
	const handleThursdayClick = () => {
		setOpenThursday(!openThursday);
	};
	const handleFridayClick = () => {
		setOpenFriday(!openFriday);
	};
	const handleFrozenClick = () => {
		setOpenFrozen(!openFrozen);
	};

	const handlePromoClick = () => {
		setOpenPromo(!openPromo);
	};

	const createPDF = async () => {
		const menuDate = new Date(order.menu.date).toLocaleDateString("en-ZA");
		const input = pdfRef.current;
		html2canvas(input, { useCORS: true }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 30;
			pdf.addImage(
				imgData,
				"PNG",
				imgX,
				imgY,
				imgWidth * ratio,
				imgHeight * ratio
			);
			pdf.save(
				`Orders_${menuDate}.pdf`
			);
		});
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

			<Container sx={{ border: "none", width: "100%" }}>
				<Paper>
					{/* {isLoading && <LoadingSpinner asOverlay />} */}

					<Box display='flex' p={2}>
						{/* <FormProvider {...formProps}> */}
						{/* <form onSubmit={handleSubmit(onSubmit)}> */}
						{/* <form> */}

						<div
							ref={pdfRef}
							style={{ width: "770px", margin: "0px", border: "1px solid" }}
						>
							<Grid
								container
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }} //1px solid
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
												<Typography fontWeight='700' variant='h5'>
													Orders for Menu
												</Typography>
											</Box>
										</Grid>
										<Grid item xs={12} lg={3}>
											<Stack direction='row' spacing={1}>
												<Button
													sx={{ gap: "1rem", p: 1 }}
													// width='100px'
													variant='contained'
													color='error'
													autoFocus
													onClick={() => {
														dispatchMenu({
															type: "RESET_SELECTED_MENU",
														}),
															history("/home");
													}}
												>
													Close
												</Button>
												<Button
													sx={{ display: "flex", gap: "1rem", p: 1 }}
													// width='100px'
													variant='contained'
													color='success'
													onClick={() => {
														createPDF();
													}}
												>
													Export
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
										<Grid item xs={4} lg={4}></Grid>
										<Grid item xs={4} lg={4}>
			
											<>
												<InputLabel
													sx={{ textAlign: "left" }}
													className={classes.label}
												>
													Menu
												</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														select
												
														onChange={(event) => {
													
															dispatchMenu({
																type: "SET_SELECTED_MENU",
																id: event.target.value,
															});
															getOrderNotes(event);
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
											{/* );
													}}
												/> */}
										</Grid>

										<Grid item xs={4} lg={4}>
											<ToggleButtonGroup
												value={display}
												exclusive
												onChange={handleDisplay}
												aria-label='text display'
											>
												<ToggleButton value='customers' aria-label='customers'>
													<PersonIcon />
												</ToggleButton>
												<ToggleButton value='meals' aria-label='meals'>
													<LunchDiningIcon />
												</ToggleButton>
											</ToggleButtonGroup>
										</Grid>
									</Stack>
								</Grid>

								{/* 55555555555555555555555555555555555555555555555555555555555555555555555555  NOTES */}

								{selected_menu[0] && (
									<>
										{notes && (
											<>
												<Grid item xs={12} lg={12} padding={2}>
													<Stack>
														<Grid item xs={12} lg={12} padding={0}>
															<Typography
																fontWeight='500'
																variant='h6'
																sx={{
																	// mx: "auto",
																	textAlign: "left",
																	p: 0,
																	m: 0,
																}}
															>
																Notes
															</Typography>
														</Grid>
														<Box
															bgcolor='primary.dark'
															display='flex'
															color='white'
															sx={{
																// mx: "auto",
																textAlign: "left",
																p: 1,
																m: 0,
															}}
														>
															{/* </Grid> */}
															<Grid container>
																{notes.map((item, i) => {
																	{
																		{
																			/* console.log("notesitem", item); */
																		}
																	}
																	if (item !== undefined) {
																		return (
																			<>
																				<Grid item xs={2} lg={2}>
																					<Typography fontWeight='500'>
																						{` ${item.customer}`}
																					</Typography>
																				</Grid>
																				<Grid item xs={10} lg={10}>
																					<Typography fontWeight='100'>
																						- &nbsp;&nbsp; {` ${item.note}`}
																					</Typography>
																				</Grid>
																				<Divider sx={{ my: 2 }} />
																			</>
																		);
																	}
																})}
															</Grid>
														</Box>
													</Stack>
												</Grid>
											</>
										)}
										{/* 55555555555555555555555555555555555555555555555555555555555555555555555555  DAYS */}
										<Grid item xs={12} lg={12}>
											<Tabs
												value={currentTabIndex}
												onChange={handleTabChange}
												centered
												// variant='fullWidth'
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
													<DaysOrder weekday='monday' display={display} />
												</Box>
											)}
											{/* TUESDAY Contents */}
											{currentTabIndex === 1 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='tuesday' display={display} />
												</Box>
											)}
											{/* WEDNESDAY Contents */}
											{currentTabIndex === 2 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='wednesday' display={display} />
												</Box>
											)}
											{/* THURSDAY Contents */}
											{currentTabIndex === 3 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='thursday' display={display} />
												</Box>
											)}
											{/* FRIDAY Contents */}
											{currentTabIndex === 4 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='friday' display={display} />
												</Box>
											)}
											{/* FROZEN Contents */}
											{currentTabIndex === 4 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='frozen' display={display} />
												</Box>
											)}
											{/* PROMO Contents */}

											{currentTabIndex === 5 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='promotion' display={display} />
												</Box>
											)}

											{/* 7777777777777777777777777777777777777777777777777777777 */}
										</Grid>
									</>
								)}

								{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
							</Grid>
						</div>
					</Box>
				</Paper>
			</Container>
		</>
	);
}

export default OrdersPerDay;

import React, { useState, useEffect, useContext, useRef } from "react";
import {
	Typography,
	Box,
	Divider,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	MenuItem,
	Tabs,
	Tab,
	Grid,
	CircularProgress,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";

import DaysOrder from "./DaysOrder.jsx";

import { useMenuValue } from "../../shared/context/MenuProvider.js";

import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ViewOrder.css";

import "./Listitem.css";

import { toast } from "sonner";

function OrdersPerDay(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	const [openMonday, setOpenMonday] = useState(false);
	const [openTuesday, setOpenTuesday] = useState(false);
	const [openWednesday, setOpenWednesday] = useState(false);
	const [openThursday, setOpenThursday] = useState(false);
	const [openFriday, setOpenFriday] = useState(false);
	const [openFrozen, setOpenFrozen] = useState(false);
	const [openPromo, setOpenPromo] = useState(false);

	const [notes, setNotes] = useState([]);

	const [display, setDisplay] = React.useState("customers");
	const pdfRef = useRef();
	let notesArr = [];

	const handleDisplay = (event, newDisplay) => {
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

				dispatchMenu({
					type: "UPDATE_MENUS",
					data,
				});
				dispatchMenu({
					type: "RESET_SELECTED_MENU",
				});
				setIsLoading(false);
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
		fetchMenus();
	}, []);

	useEffect(() => {
		async function fetchOrders() {
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

				dispatchOrder({
					type: "UPDATE_ORDERS",
					data,
				});
				setIsLoading(false);
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
		fetchOrders();
	}, []);

	const getOrderNotes = (event) => {
		let temp = orders;

		temp = temp.filter((order) => order.menu.id === event.target.value);

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
		setCurrentTabIndex(tabIndex);
	};

	const createPDF = async () => {
		const menuDate = new Date(selected_menu[0].date).toLocaleDateString(
			"en-ZA"
		);
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
			pdf.save(`Orders_${menuDate}.pdf`);
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

			<Container
				sx={{ border: "none", display: "flex", justifyContent: "center" }}
			>
				<Paper sx={{ width: "fit-content", p: 1 }}>
					<Box display='flex' p={2}>
						<div
							ref={pdfRef}
							style={{ width: "770px", margin: "0px", border: "1px solid" }}
						>
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
												<Typography fontWeight='700' variant='h5'>
													Orders for Menu
												</Typography>
											</Box>
										</Grid>
										<Grid item xs={12} lg={3}>
											<Stack direction='row' spacing={1}>
												<Button
													sx={{ gap: "1rem", p: 0, m: 1 }}
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
													sx={{ display: "flex", gap: "1rem", p: 0, m: 1 }}
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
												<InputLabel sx={{ textAlign: "left" }}>Menu</InputLabel>
												<Box bgcolor='primary.light' p={0}>
													<TextField
														select
														defaultValue=''
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
														{menuOptions
															.sort((a, b) =>
																new Date(a.date) > new Date(b.date) ? -1 : 1
															)
															.map((item) => (
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
																textAlign: "left",
																p: 1,
																m: 0,
															}}
														>
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
											{currentTabIndex === 5 && (
												<Box sx={{ p: 3 }}>
													<DaysOrder weekday='frozen' display={display} />
												</Box>
											)}
											{/* PROMO Contents */}

											{currentTabIndex === 6 && (
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

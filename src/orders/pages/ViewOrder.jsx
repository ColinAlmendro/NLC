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
} from "@mui/material";

import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ViewOrder.css";

function ViewOrder(props) {
	const [isLoading, setIsLoading] = useState(false);

	const pdfRef = useRef();

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
	const { openViewPopup, setOpenViewPopup } = props;
	const [open, setOpen] = useState(false);
	const [period, setPeriod] = useState(null);
	let selDate = new Date();
	if (record) {
		selDate = new Date(selected_menu[0].date);
	} else {
		selDate = new Date();
	}
	const [selectedDate, setSelectedDate] = useState(selDate);

	let order = {};
	if (record) {
		//	console.log("ISrecordY", record);
		//	console.log("ISrecordYselectedCustomer", selected_customer[0]);
		//	console.log("ISrecordYselectedMenu", selected_menu);
		order = {
			...record,
			customer: selected_customer[0],
			menu: selected_menu[0],
			// customer: selected_customer[0]._id,
			// menu: selected_menu[0]._id,
		};
		console.log("order", order);
	} else {
		//	console.log("ISrecordN", record);
		order = {
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
			totalDelivery: 0,
			total_price: 0,
			note: "",
		};
	}

	const monthName = (monthIndex) => {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let monthName = monthNames[monthIndex];
		return monthName;
	};

	useEffect(() => {
		const week = selectedDate;
		console.log("getValues_date", week);
		let endDate = new Date(week);
		// Add 5 days to the start date
		endDate.setDate(week.getDate() + 5);
		let period = `${week.getDate()} ${monthName(
			week.getMonth()
		)} - ${endDate.getDate()} ${monthName(
			endDate.getMonth()
		)} ${endDate.getFullYear()}`;
		setPeriod(period);

		// let beforeDate = new Date(week);
		// // Subtract 1 day from the start date
		// beforeDate.setDate(week.getDate() - 1);
		// let instruction = `Orders to please be in by 22h00 on Sunday, ${beforeDate.getDate()} ${monthName(
		// 	beforeDate.getMonth()
		// )} ${beforeDate.getFullYear()}`;
		// setInstruction(instruction);
	}, []);

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
				`Order_${order.customer.name}_${order.customer.surname}_${menuDate}.pdf`
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
			<Container sx={{ border: "none", width: "100%" }}>
				<Paper>
					<Stack display='flex' p={0}>
						{/* <FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}> */}
						<Grid
							container
							rowSpacing={0}
							columnSpacing={0}
							sx={{ border: "none" }} //1px solid
						>
							{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
							<Grid item xs={12} lg={12}>
								<Stack direction='row'>
									<Grid item xs={12} lg={10}></Grid>
									<Grid item xs={2} lg={2}>
										<Stack direction='row'>
											<Button
												sx={{ gap: "1rem" }}
												// width='100px'
												variant='outlined'
												color='error'
												autoFocus
												onClick={() => {
													setOpenViewPopup(false);
													setOpen(false);
												}}
											>
												Cancel
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												// width='100px'
												variant='outlined'
												color='success'
												type='button'
												onClick={() => {
													createPDF();
													setOpenViewPopup(false);
													setOpen(false);
												}}
											>
												Export
											</Button>
										</Stack>
									</Grid>
								</Stack>
							</Grid>
						</Grid>
						<br />
						{/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                         INVOICE  */}
						<div
							ref={pdfRef}
							style={{ width: "770px", margin: "0px", border: "1px solid" }}
						>
							<Grid
								container
								rowSpacing={0}
								columnSpacing={0}
								sx={{ border: "none" }} //1px solid
							>
								<Grid item xs={1} lg={1}></Grid>
								<Grid item xs={11} lg={11}>
									<Grid item xs={12} lg={12}>
										<Box
											sx={{
												mx: "auto",
												textAlign: "center",
												p: 0,
												m: 0,
											}}
										>
											<Typography fontWeight='700' variant='h5'>
												Order Invoice
											</Typography>
										</Box>
									</Grid>
									<br />
									{/* <Divider sx={{ my: 6 }} /> */}
									<Stack direction='row' sx={{ width: 1 }}>
										<Grid item xs={1} lg={1}></Grid>
										<Grid item xs={8} lg={8}>
											<Typography fontWeight='600'>Menu</Typography>
											<p>
												&nbsp;{period}
												{/* {new Date(order.menu.date).toLocaleDateString("en-ZA")} */}
											</p>
										</Grid>
										<Grid item xs={3} lg={3}>
											<Typography fontWeight='600'>Customer</Typography>
											<p>
												&nbsp;
												{`${order.customer.name} ${order.customer.surname}`}
											</p>
											<p>&nbsp;{order.customer.address1}</p>
											<p>&nbsp;{order.customer.address2}</p>
											<p>&nbsp;{order.customer.cell}</p>
										</Grid>
									</Stack>
									{order.note && (
										<Grid item xs={12} lg={12}>
											<Typography fontWeight='600'>Note</Typography>
											<Box p={1} sx={{ border: 0, width: "90%" }}>
												<p>&nbsp;{order.note}</p>
											</Box>
										</Grid>
									)}
									<Divider sx={{ mt: 2 }} />
									{/* /////////////////////////////////////////////////////////////////  MONDAY */}
									<Grid item xs={12} lg={12}>
										{order.monday.length > 0 && (
											<div>
												<Typography fontWeight='600'>Monday</Typography>
												<ul>
													{order.monday.map((item, i) => {
														console.log("item", item);
														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  TUESDAY */}
									<Grid item xs={12} lg={12}>
										{order.tuesday.length > 0 && (
											<div>
												<Typography fontWeight='600'>Tuesday</Typography>
												<ul>
													{order.tuesday.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;

														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  WEDNESDAY */}
									<Grid item xs={12} lg={12}>
										{order.wednesday.length > 0 && (
											<div>
												<Typography fontWeight='600'>Wednesday</Typography>
												<ul>
													{order.wednesday.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;

														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  THURSDAY */}
									<Grid item xs={12} lg={12}>
										{order.thursday.length > 0 && (
											<div>
												<Typography fontWeight='600'>Thursday</Typography>
												<ul>
													{order.thursday.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;

														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  FRIDAY */}
									<Grid item xs={12} lg={12}>
										{order.friday.length > 0 && (
											<div>
												<Typography fontWeight='600'>Friday</Typography>
												<ul>
													{order.friday.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;

														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  FROZEN MEALS */}
									<Grid item xs={12} lg={12}>
										{order.frozen.length > 0 && (
											<div>
												<Typography fontWeight='600'>Frozen Meals</Typography>
												<ul>
													{order.frozen.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;

														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* /////////////////////////////////////////////////////////////////  PROMOTION */}
									<Grid item xs={12} lg={12}>
										{order.promotion.length > 0 && (
											<div>
												<Typography fontWeight='600'>Promotion</Typography>
												<ul>
													{order.promotion.map((item, i) => {
														let itemTotalAmnt = (
															item.count * item.price
														).toFixed(2);
														let id = item.id;
														console.log("item".item);
														return (
															<li key={i} className='cartlist_item'>
																<Grid item xs={12} lg={12}>
																	<Stack direction='row'>
																		<Grid item xs={1} lg={1}></Grid>
																		<Grid item xs={9} lg={9}>
																			<span>
																				&nbsp;&nbsp;{item.count} &times;&nbsp;
																				{item.description}
																			</span>
																		</Grid>
																		<Grid item xs={2} lg={2}>
																			<span className='cartlist_item'>
																				<span>R{item.price}</span>
																			</span>
																		</Grid>
																	</Stack>
																</Grid>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</Grid>
									{/* 66666666666666666666666666666666666666666666666666666666666666666666666666666666666666 */}
									<Divider sx={{ mt: 5 }} />
									<Grid item xs={12} lg={12}>
										{/* <Stack direction='row'>
											<Grid item xs={6} lg={6}></Grid>
											<Grid item xs={3} lg={3}>
												<Typography fontWeight='600'>Total Items</Typography>
											</Grid>

											<Grid item xs={3} lg={3}>
												<span>{order.item_count}</span>
											</Grid>
										</Stack> */}
										<Stack direction='row'>
											<Grid item xs={6} lg={6}></Grid>
											<Grid item xs={3} lg={3}>
												<Typography fontWeight='600'>Sub Total</Typography>
											</Grid>
											<Grid item xs={3} lg={3}>
												<span>R{parseFloat(order.total_price).toFixed(2)}</span>
											</Grid>
										</Stack>
										<Stack direction='row'>
											<Grid item xs={6} lg={6}></Grid>
											<Grid item xs={3} lg={3}>
												<Typography fontWeight='600'>Incl. Delivery</Typography>
											</Grid>
											<Grid item xs={3} lg={3}>
												<span>
													R{parseFloat(order.total_delivery).toFixed(2)}
												</span>
											</Grid>
										</Stack>
										<Stack direction='row'>
											<Grid item xs={6} lg={6}></Grid>
											<Grid item xs={3} lg={3}>
												<Typography fontWeight='600'>Total Amount</Typography>
											</Grid>
											<Grid item xs={3} lg={3}>
												<span>
													R
													{parseFloat(
														order.total_price + order.total_delivery
													).toFixed(2)}
												</span>
											</Grid>
										</Stack>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Stack>
				</Paper>
			</Container>
		</>
	);
}
export default ViewOrder;

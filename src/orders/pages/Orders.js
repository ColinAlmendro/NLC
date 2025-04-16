import React, { useState, useContext, useEffect } from "react";
import OrdersForm from "./OrdersForm.jsx";
import ViewOrder from "./ViewOrder.jsx";
import { useLocation } from "react-router-dom";
import {
	Container,
	Box,
	Paper,
	Button,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	Typography,

	CircularProgress,
	InputAdornment,
	
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTable from "../../components/useTable.js";
import Controls from "../../components/controls/Controls.js";
import { Search } from "@mui/icons-material";

import Popup from "../../components/Popup.js";
import ViewPopup from "./ViewPopup.js";

import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";

import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { toast } from "sonner";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		align: "center",
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const headCells = [
	{ id: "date", label: "Order" },
	{ id: "name", label: "Name", disableSorting: true },
	{ id: "surname", label: "Surname", disableSorting: true },
	{ id: "menu", label: "Menu" },
	{ id: "item_count", label: "Items", numeric: true },
	{ id: "total_cost", label: "Cost", numeric: true },
	{ id: "total_price", label: "Amount", numeric: true },
	{ id: "actions", label: "View", disableSorting: true },
];

export default function Order() {
	
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		ordersState: { orders },
		dispatchOrder,
	} = useOrdersValue();
	const {
		menuState: { menus },
		dispatchMenu,
	} = useMenuValue();
	const {
		customersState: { customers },
		dispatchCustomer,
	} = useCustomersValue();

	const classes = useStyles();
	// const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...orders];
	

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
		
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

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
			//	console.log(err);
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
	}, [location.key]);

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
				setIsLoading(false);
			} catch (err) {
				//console.log(err);
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
		async function fetchCustomers() {
			
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/customers/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				
				dispatchCustomer({
					type: "UPDATE_CUSTOMERS",
					data,
				});
				setIsLoading(false);
			} catch (err) {
				//console.log(err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchCustomers();
	}, []);

	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Promotions
	useEffect(() => {
		async function fetchPromotions() {
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/promotions/list",
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
					type: "UPDATE_PROMOTIONS",
					data,
				});
				setIsLoading(false);
			} catch (err) {
				//console.log(err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchPromotions();
	}, []);


	

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value == "") return items;
				else
					return items.filter(
						(x) =>
							//console.log(x)
							x.customer.name.toLowerCase().includes(target.value) ||
							x.customer.surname.toLowerCase().includes(target.value)
					);
			},
		});
	};

	
	let orderDate = Date();
	let menuDate = Date();

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}
	return (
		<>
			<Container sx={{ border: "none" }}>
				<Paper
					textalign='center'
					className={classes.pageContent}
					sx={{ width: "100%", p: 1 }}
				>
					<Box
						sx={{
							mx: "auto",
							textAlign: "center",
							p: 2,
							m: 0,
						}}
					>
						<Typography fontWeight='700' variant='h6'>
							Order Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar style={{ width: "100%" }}>
						<Controls.Input
							label='Search Orders'
							className={classes.searchInput}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Search />
									</InputAdornment>
								),
							}}
							onChange={handleSearch}
						/>
						<Button
							
							variant='contained'
							
							className={classes.newButton}
							onClick={() => {
								dispatchOrder({
									type: "RESET_SELECTED_ORDER",
								}),
									dispatchMenu({
										type: "RESET_SELECTED_MENU",
									}),
									dispatchCustomer({
										type: "RESET_SELECTED_CUSTOMER",
									}),
									setOpenPopup(true);
								
							}}
						>
							{" "}
							Add Order{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								//console.log("orderitem",item);
								orderDate = new Date(item.date).toLocaleDateString("en-ZA");
								menuDate = new Date(item.menu.date).toLocaleDateString("en-ZA");
								return (
									<TableRow key={item.date}>
										<TableCell width='15%'>{orderDate}</TableCell>
										<TableCell width='20%'>{item.customer.name}</TableCell>
										<TableCell width='20%'>{item.customer.surname}</TableCell>
										<TableCell width='15%'>{menuDate}</TableCell>
										<TableCell width='10%'>{item.item_count}</TableCell>
										<TableCell width='10%'>
											{Number(item.total_cost).toFixed(2)}
										</TableCell>
										<TableCell width='10%'>
											{Number(item.total_price).toFixed(2)}
										</TableCell>
										<TableCell>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchOrder({
														type: "SET_SELECTED_ORDER",
														id: item._id,
													}),
														dispatchMenu({
															type: "SET_SELECTED_MENU",
															id: item.menu.id,
														}),
														dispatchCustomer({
															type: "SET_SELECTED_CUSTOMER",
															id: item.customer.id,
														});
													setOpenViewPopup(true);
													// openInPopup(item);
												}}
											>
												<PageviewOutlinedIcon
													fontSize='small'
													sx={{
														color: "#e65100",
													}}
												/>
											</Controls.ActionButton>
											
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</TblContainer>
					<TblPagination />
				</Paper>
			</Container>
			<Popup
				title='Loading...'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<OrdersForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
			</Popup>
			<ViewPopup
				title='Loading...'
				openViewPopup={openViewPopup}
				setOpenViewPopup={setOpenViewPopup}
			>
				<ViewOrder
					openViewPopup={openViewPopup}
					setOpenViewPopup={setOpenViewPopup}
				/>
			</ViewPopup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

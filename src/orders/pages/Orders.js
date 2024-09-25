import React, { useState, useContext, useEffect } from "react";
import OrdersForm from "./OrdersForm.jsx";
import { useLocation } from "react-router";
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
	Divider,
	CircularProgress,
	InputAdornment,
	Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTable from "../../components/useTable.js";
import Controls from "../../components/controls/Controls.js";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
// import "./OrderTable.css";

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
	//{ id: "id", label: "Id" },
	{ id: "date", label: "Order" },
	{ id: "name", label: "Name" },
	{ id: "surname", label: "Surname" },
	{ id: "menu", label: "Menu" },
	{ id: "item_count", label: "Items" },
	{ id: "total_price", label: "Total" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Order() {
	console.log("loading order");
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
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...orders];
	//console.log("records", records);

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			console.log("filteritems", items);
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
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
				console.log("Orders list :", data.orders);
				dispatchOrder({ type: "UPDATE_ORDERS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchOrders();
	}, [location.key]);

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
				console.log("Menus list :", data.menus);
				dispatchMenu({ type: "UPDATE_MENUS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchMenus();
	}, []);

	useEffect(() => {
		async function fetchCustomers() {
			//console.log("fetching orders");
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
				console.log("customers list :", data.customers);
				dispatchCustomer({ type: "UPDATE_CUSTOMERS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchCustomers();
	}, []);

	const insertOrder = (order) => {
		console.log("insertdata:", order),
			dispatchOrder({ type: "INSERT_ORDER", order });
	};

	const updateOrder = (order) => {
		console.log("updatedata:", order),
			dispatchOrder({ type: "UPDATE_ORDER", order });
	};

	const deleteOrderItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/orders/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatchOrder({ type: "DELETE_ORDER", _id });
					setIsLoading(false);
					alert("Order deleted !");
				});
		} catch (err) {
			console.log("Delete error", err);
			setIsLoading(false);
		}
	};

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

	const addOrEdit = (order, resetForm) => {
		if (order._id == 0) insertOrder(order);
		else updateOrder(order);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllOrders());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatchOrder({ type: "SET_SELECTED_ORDER", _id: item._id });
		dispatchMenu({ type: "SET_SELECTED_MENU", id: item.menu.id });
		dispatchCustomer({ type: "SET_SELECTED_CUSTOMER", id: item.customer.id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteOrderItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	let orderDate = Date();
	let menuDate = Date();

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
				<Paper
					//textAlign='center'
					className={classes.pageContent}
					sx={{ width: 700 }}
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
					<Toolbar style={{ width: 650 }}>
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
							//	text='Add New'
							variant='contained'
							//startIcon={<AddIcon />}
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
								// setRecordForEdit(null);
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
								orderDate = new Date(item.date).toLocaleDateString();
								menuDate = new Date(item.menu.date).toLocaleDateString();
								return (
									<TableRow key={item._id}>
										<TableCell width='15%'>{orderDate}</TableCell>
										<TableCell width='20%'>{item.customer.name}</TableCell>
										<TableCell width='20%'>{item.customer.surname}</TableCell>
										<TableCell width='15%'>{menuDate}</TableCell>
										<TableCell width='15%'>{item.item_count}</TableCell>
										<TableCell width='15%'>{item.total_price}</TableCell>
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
														setOpenPopup(true);
													// openInPopup(item);
												}}
											>
												<EditOutlinedIcon fontSize='small' />
											</Controls.ActionButton>
											<Controls.ActionButton
												color='secondary'
												onClick={() => {
													setConfirmDialog({
														isOpen: true,
														title: "Are you sure to delete this record?",
														subTitle: "You can't undo this operation",
														onConfirm: () => {
															onDelete(item._id);
														},
													});
												}}
											>
												<CloseIcon fontSize='small' />
											</Controls.ActionButton>
										</TableCell>
									</TableRow>
								);})}
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
				{/* <OrderForm /> */}
				<OrdersForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <OrderForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

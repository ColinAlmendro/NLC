import React, { useState, useContext, useEffect } from "react";
import CustomersForm from "./CustomersForm.jsx";
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

import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
// import "./CustomerTable.css";

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
	{ id: "name", label: "Name" },
	{ id: "surname", label: "Surname" },
	{ id: "cell", label: "Cell" },
	{ id: "email", label: "Email" },
	{ id: "address1", label: "Address" },
	{ id: "address2", label: "Area" },
	{ id: "dob", label: "Birthday" },
	// { id: "location", label: "Location" },
	{ id: "note", label: "Note" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Customer() {
	console.log("loading customer");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		customersState: { customers },
		dispatchCustomer,
	} = useCustomersValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...customers];
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
		async function fetchCustomers() {
			//console.log("fetching customers");
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
				console.log("Customers list :", data.customers);
				dispatchCustomer({ type: "UPDATE_CUSTOMERS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchCustomers();
	}, [location.key]);

	const insertCustomer = (customer) => {
		console.log("insertdata:", customer),
			dispatchCustomer({ type: "INSERT_CUSTOMER", customer });
	};

	const updateCustomer = (customer) => {
		console.log("updatedata:", customer),
			dispatchCustomer({ type: "UPDATE_CUSTOMER", customer });
	};

	const deleteCustomerItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/customers/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatchCustomer({ type: "DELETE_CUSTOMER", _id });
					setIsLoading(false);
					alert("Customer deleted !");
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
					return items.filter((x) =>
						x.name.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (customer, resetForm) => {
		if (customer._id == 0) insertCustomer(customer);
		else updateCustomer(customer);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllCustomers());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatchCustomer({ type: "SET_SELECTED_CUSTOMER", _id: item._id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteCustomerItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	let dob = Date();

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
				//	textAlign='center'
				//	className={classes.pageContent}
					 sx={{ p:1}}
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
							Customer Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar>
						<Controls.Input
							label='Search Customers'
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
							// startIcon={<AddIcon />}
							className={classes.newButton}
							onClick={() => {
								dispatchCustomer({
									type: "RESET_SELECTED_CUSTOMER",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add Customer{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								dob = new Date(item.dob).toLocaleDateString();
								return (
									<TableRow key={item._id}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.surname}</TableCell>
										<TableCell>{item.cell}</TableCell>
										<TableCell>{item.email}</TableCell>
										<TableCell>{item.address1}</TableCell>
										<TableCell>{item.address2}</TableCell>
										<TableCell>{dob}</TableCell>
										{/* <TableCell>{item.location}</TableCell> */}
										<TableCell>{item.note}</TableCell>
										<TableCell>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchCustomer({
														type: "SET_SELECTED_CUSTOMER",
														id: item._id,
													}),
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
				{/* <CustomerForm /> */}
				<CustomersForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <CustomerForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

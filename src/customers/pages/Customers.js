import React, { useState, useContext, useEffect } from "react";
import CustomersForm from "./CustomersForm.jsx";
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

import useTable from "../../components/useTable.js";
import Controls from "../../components/controls/Controls.js";
import { Search } from "@mui/icons-material";

import Popup from "../../components/Popup.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";
import { AuthContext } from "../../shared/context/auth-context.js";

import { useCustomersValue } from "../../shared/context/CustomersProvider.js";
import { useUsersValue } from "../../shared/context/UsersProvider.js";

import { toast } from "sonner";

const headCells = [
	{ id: "name", label: "Name" },
	{ id: "surname", label: "Surname" },
	{ id: "cell", label: "Cell" },
	{ id: "email", label: "Email" },
	{ id: "address1", label: "Address" },
	{ id: "area", label: "Area" },
	{ id: "dob", label: "Birthday" },
	{ id: "note", label: "Note" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Customer() {
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		customersState: { customers },
		dispatchCustomer,
	} = useCustomersValue();
	const {
		usersState: { users, selected_user },
		dispatchUser,
	} = useUsersValue();

	const records = [...customers];

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
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

				dispatchCustomer({ type: "UPDATE_CUSTOMERS", data });
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
		fetchCustomers();
	}, [location.key]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/users",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();

				dispatchUser({ type: "UPDATE_USERS", data });
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
		fetchUsers();
	}, []);

	const deleteCustomerItem = async (_id) => {
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

					toast.success("Customer deleted", {
						style: {
							background: "green",
							color: "white",
						},
					});
				});
		} catch (err) {
			toast.error(err, {
				style: {
					background: "red",
					color: "white",
				},
			});
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
							x.name.toLowerCase().includes(target.value) ||
							x.surname.toLowerCase().includes(target.value)
					);
			},
		});
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
			<Container
				id='container'
				sx={{ border: "none", display: "flex", justifyContent: "center" }}
			>
				<Paper sx={{ width: "100%", p: 0 }}>
					,
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
					<Toolbar style={{ width: "100%" }}>
						<Controls.Input
							label='Search Customers'
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
							sx={{ marginLeft: "auto" }}
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
										<TableCell width='5%'>{item.name}</TableCell>
										<TableCell width='5%'>{item.surname}</TableCell>
										<TableCell width='5%'>{item.cell}</TableCell>
										<TableCell width='15%'>{item.email}</TableCell>
										<TableCell width='15%'>{item.address1}</TableCell>
										<TableCell width='10%'>{item.area}</TableCell>
										<TableCell width='5%'>{dob}</TableCell>
										<TableCell width='20%'>{item.note}</TableCell>
										<TableCell width='20%'>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchCustomer({
														type: "SET_SELECTED_CUSTOMER",
														id: item._id,
													}),
														setOpenPopup(true);
												}}
											>
												<EditOutlinedIcon
													fontSize='small'
													sx={{
														color: "blue",
													}}
												/>
											</Controls.ActionButton>
											<Controls.ActionButton
												color='primary'
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
												<DeleteIcon
													fontSize='small'
													sx={{
														color: "red",
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
				<CustomersForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

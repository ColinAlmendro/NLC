import React, { useState, useContext, useEffect } from "react";
import UsersForm from "./UsersForm.jsx";
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
import { useValue } from "../../shared/context/SettingsProvider.js";
import { useUsersValue } from "../../shared/context/UsersProvider.js";

import { toast } from "sonner";
// import "./UserTable.css";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		align: "center",
		margin: theme.spacing(5),
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "50%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const headCells = [
	{ id: "name", label: "Username" },
	{ id: "email", label: "Email" },
	// { id: "password", label: "Password" },
	{ id: "admin", label: "Administrator" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function User() {
	//console.log("loading user");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		usersState: { users },
		dispatchUser,
	} = useUsersValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...users];
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
		async function fetchUsers() {
			//console.log("fetching users");
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
				console.log("Users list :", data.users);
				dispatchUser({ type: "UPDATE_USERS", data });
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
		fetchUsers();
	}, [location.key]);

	const insertUser = (user) => {
		console.log("insertdata:", user),
			dispatchUser({ type: "INSERT_USER", user });
	};

	const updateUser = (user) => {
		console.log("updatedata:", user),
			dispatchUser({ type: "UPDATE_USER", user });
	};

	const deleteUserItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/users/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatchUser({ type: "DELETE_USER", _id });
					setIsLoading(false);
					alert("User deleted !");
				});
		} catch (err) {
			console.log("Delete error", err);
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
					return items.filter((x) =>
						x.name.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (user, resetForm) => {
		if (user._id == 0) insertUser(user);
		else updateUser(user);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllUsers());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatchUser({ type: "SET_SELECTED_USER", _id: item._id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteUserItem(_id);
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
					textAlign='center'
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
							User Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar style={{ width: "100%" }}>
						<Controls.Input
							label='Search Users'
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
							sx={{ marginLeft: "auto" }}
							onClick={() => {
								dispatchUser({
									type: "RESET_SELECTED_USER",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add User{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								{/* dob = new Date(item.dob).toLocaleDateString(); */}
								let administrator = "No";
								item.admin ? (administrator = "Yes") : (administrator = "No");
								return (
									<TableRow key={item._id}>
										<TableCell>{item.name}</TableCell>

										<TableCell>{item.email}</TableCell>
										{/* <TableCell>{item.password}</TableCell> */}
										<TableCell>{administrator}</TableCell>
										<TableCell>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchUser({
														type: "SET_SELECTED_USER",
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
														title: "Are you sure to delete this user?",
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
				{/* <UserForm /> */}
				<UsersForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

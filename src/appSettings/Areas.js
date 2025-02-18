import React, { useState, useContext, useEffect } from "react";
// import CustomersForm from "./CustomersForm.jsx";
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

import { toast } from "sonner";
// import "./CustomerTable.css";

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
	{ id: "area", label: "Area" },
	{ id: "delivery_rate", label: "Rate" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Areas() {
	//console.log("loading area");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		areasState: { areas_list },
		dispatch,
	} = useValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...areas_list];
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
		async function fetchAreas() {
			//console.log("fetching customers");
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/areas/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				//console.log("Customers list :", data.customers);
				dispatch({ type: "UPDATE_AREA_LIST", data });
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
		fetchAreas();
	}, [location.key]);

	const insertArea = (area) => {
		console.log("insertdata:", area),
			dispatch({ type: "INSERT_AREA", area });
	};

	const updateArea = (area) => {
		console.log("updatedata:", area),
			dispatch({ type: "UPDATE_AREA", area });
	};

	const deleteAreaItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/areas/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatch({ type: "DELETE_AREA", _id });
					setIsLoading(false);
					alert("Area deleted !");
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
						x.area.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (area, resetForm) => {
		if (area._id == 0) insertArea(area);
		else updateArea(area);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllAreas());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatch({ type: "SET_SELECTED_AREA", _id: item._id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteAreaItem(_id);
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
					sx={{ p: 1 }}
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
							Area Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar>
						<Controls.Input
							label='Search Areas'
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
								dispatch({
									type: "RESET_SELECTED_AREA",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add Area{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								dob = new Date(item.dob).toLocaleDateString();
								return (
									<TableRow key={item._id}>
										<TableCell>{item.area}</TableCell>
										<TableCell>{item.delivery_rate}</TableCell>
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

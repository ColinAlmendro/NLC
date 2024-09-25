import React, { useState, useContext, useEffect } from "react";
import PromotionsForm from "./PromotionsForm.jsx";
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

import { usePromotionsValue } from "../../shared/context/PromotionsProvider.js";
// import "./PromotionTable.css";

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
	{ id: "promotion", label: "Promotion" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Promotion() {
	console.log("loading promotion");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		promotionsState: { promotions },
		dispatch,
	} = usePromotionsValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...promotions];
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
		async function fetchPromotions() {
			//console.log("fetching promotions");
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
				console.log("Promotions list :", data.promotions);
				dispatch({ type: "UPDATE_PROMOTIONS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchPromotions();
	}, [location.key]);

	const insertPromotion = (promotion) => {
		console.log("insertdata:", promotion),
			dispatch({ type: "INSERT_PROMOTION", promotion });
	};

	const updatePromotion = (promotion) => {
		console.log("updatedata:", promotion),
			dispatch({ type: "UPDATE_PROMOTION", promotion });
	};

	const deletePromotionItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/promotions/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatch({ type: "DELETE_PROMOTION", _id });
					setIsLoading(false);
					alert("Promotion deleted !");
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
						x.promotion.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (promotion, resetForm) => {
		if (promotion._id == 0) insertPromotion(promotion);
		else updatePromotion(promotion);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllPromotions());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatch({ type: "SET_SELECTED_PROMOTION", _id: item._id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deletePromotionItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	let period = "";

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
							Promotion Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar style={{ width: 650 }}>
						<Controls.Input
							label='Search Promotions'
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
								dispatch({
									type: "RESET_SELECTED_PROMOTION",
								}),
									setOpenPopup(true);
								// setRecordForEdit(null);
							}}
						>
							{" "}
							Add Promotion{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>

							{recordsAfterPagingAndSorting().map((item) => (
								<TableRow key={item._id}>
									<TableCell width="80%">{item.promotion}</TableCell>
									<TableCell>
										<Controls.ActionButton
											color='primary'
											onClick={() => {
												dispatch({
													type: "SET_SELECTED_PROMOTION",
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
							))}
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
				{/* <PromotionForm /> */}
				<PromotionsForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <PromotionForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

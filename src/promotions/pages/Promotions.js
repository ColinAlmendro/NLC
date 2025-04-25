import React, { useState, useContext, useEffect } from "react";
import PromotionsForm from "./PromotionsForm.jsx";
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

import { usePromotionsValue } from "../../shared/context/PromotionsProvider.js";

import { toast } from "sonner";

const headCells = [
	{ id: "promotion", label: "Promotion" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Promotion() {
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		promotionsState: { promotions },
		dispatch,
	} = usePromotionsValue();

	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...promotions];

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

				dispatch({ type: "UPDATE_PROMOTIONS", data });
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
		fetchPromotions();
	}, [location.key]);

	useEffect(() => {
		async function fetchRecipes() {
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/recipes/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				if (data.recipes.length > 0) {
					dispatch({ type: "UPDATE_PROMO_RECIPES", data });
				}
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
		fetchRecipes();
	}, []);

	const deletePromotionItem = async (_id) => {
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

					toast.success("Promotion deleted", {
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
					return items.filter((x) =>
						x.promotion.toLowerCase().includes(target.value)
					);
			},
		});
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
				sx={{ border: "none", display: "flex", justifyContent: "center" }}
			>
				<Paper sx={{ width: "100%", p: 0 }}>
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

					<Toolbar style={{ width: "100%" }}>
						<Controls.Input
							label='Search Promotions'
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
								dispatch({
									type: "RESET_SELECTED_PROMOTION",
								}),
									setOpenPopup(true);
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
									<TableCell width='80%'>{item.promotion}</TableCell>
									<TableCell>
										<Controls.ActionButton
											color='primary'
											onClick={() => {
												dispatch({
													type: "SET_SELECTED_PROMOTION",
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
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

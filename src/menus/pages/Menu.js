import React, { useState, useContext, useEffect } from "react";
import MenuForm from "./MenuForm.jsx";
import ViewMenu from "./ViewMenu.jsx";
import {
	Container,
	Button,
	Box,
	Paper,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	Typography,
	Divider,
	CircularProgress,
} from "@mui/material";

import useTable from "../../components/useTable";

import Controls from "../../components/controls/Controls";

import Popup from "../../components/Popup";
import ViewPopup from "./ViewPopup.js";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

import { AuthContext } from "../../shared/context/auth-context";
import { useLocation } from "react-router-dom";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import "./MenuTable.css";
// import "./Menu.css";
import { toast } from "sonner";

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

const headCells = [
	{ id: "date", label: "Date" },
	{ id: "period", label: "Period", disableSorting: true },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Menu() {
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();
	const {
		menuState: { menus },
		dispatchMenu,
	} = useMenuValue();

	// const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...menus];

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
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   Menus
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

				dispatchMenu({ type: "UPDATE_MENUS", data });
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
	}, [location.key]);
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Recipes
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
					dispatchMenu({ type: "UPDATE_MAIN_RECIPES", data });
					dispatchMenu({ type: "UPDATE_SIDE_RECIPES", data });
					dispatchMenu({ type: "UPDATE_VEGIE_RECIPES", data });
					dispatchMenu({ type: "UPDATE_SALAD_RECIPES", data });
					dispatchMenu({ type: "UPDATE_SOUP_RECIPES", data });
					dispatchMenu({ type: "UPDATE_FROZEN_RECIPES", data });
				}
				setIsLoading(false);
			} catch (err) {
				console.log("Fetch recipes error:", err);
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
				dispatchMenu({ type: "UPDATE_PROMOTIONS", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
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

	const deleteMenuItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/menus/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatchMenu({ type: "DELETE_MENU", _id });
					setIsLoading(false);

					toast.success("Menu deleted", {
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

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteMenuItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	let menuDate = Date();
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
							Menu Manager
						</Typography>
					</Box>
					<Divider />
					<Toolbar style={{ width: "100%" }}>
						<Button
							variant='contained'
							sx={{ marginLeft: "auto" }}
							onClick={() => {
								dispatchMenu({
									type: "RESET_SELECTED_MENU",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add Menu{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								menuDate = new Date(item.date).toLocaleDateString("en-ZA");
								let week = new Date(item.date);
								let endDate = new Date(item.date);
								endDate.setDate(week.getDate() + 5);
								period = `MENU FOR WEEK ${week.getDate()} ${monthName(
									week.getMonth()
								)} - ${endDate.getDate()} ${monthName(
									endDate.getMonth()
								)} ${endDate.getFullYear()}`;

								return (
									<TableRow key={item._id}>
										<TableCell>{menuDate}</TableCell>
										<TableCell>{period}</TableCell>
										<TableCell>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchMenu({
														type: "SET_SELECTED_MENU",
														id: item._id,
													});

													setOpenViewPopup(true);
												}}
											>
												<PageviewOutlinedIcon
													fontSize='small'
													sx={{
														color: "#e65100",
													}}
												/>
											</Controls.ActionButton>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchMenu({
														type: "SET_SELECTED_MENU",
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
				title='Loading ...'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				{/* <MenuForm /> */}
				<MenuForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
			</Popup>
			<ViewPopup
				title='Loading...'
				openViewPopup={openViewPopup}
				setOpenViewPopup={setOpenViewPopup}
			>
				<ViewMenu
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

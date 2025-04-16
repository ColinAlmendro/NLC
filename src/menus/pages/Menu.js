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
import { makeStyles } from "@mui/styles";
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
import "./Menu.css";
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
	//{ id: "id", label: "Id" },
	{ id: "date", label: "Date" },
	{ id: "period", label: "Period", disableSorting: true },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Menu() {
	//console.log("loading menu");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();
	const {
		menuState: { menus },
		dispatchMenu,
	} = useMenuValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...menus];
	//console.log("records", records);

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
		//	console.log("filteritems", items);
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
			//console.log("fetching menus");
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
			//	console.log("Menus list :", data.menus);
				dispatchMenu({ type: "UPDATE_MENUS", data });
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
				//	console.log("Recipes list :", data.recipes);
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
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  Prices
	// useEffect(() => {
	// 	async function fetchPrices() {
	// 		try {
	// 			setIsLoading(true);
	// 			const response = await fetch(
	// 				process.env.REACT_APP_BACKEND_URL + "/pricelist/list",
	// 				{
	// 					method: "GET",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: "Bearer " + auth.token,
	// 					},
	// 				}
	// 			);
	// 			const data = await response.json();
	// 			dispatchMenu({ type: "UPDATE_PRICES", data });
	// 			setIsLoading(false);
	// 		} catch (err) {
	// 			console.log(err);
	// 			toast.error(err, {
	// 				style: {
	// 					background: "red",
	// 					color: "white",
	// 				},
	// 			});
	// 			setIsLoading(false);
	// 		}
	// 	}
	// 	fetchPrices();
	// }, []);

	// const insertMenu = (menu) => {
	// 	console.log("insertdata:", menu),
	// 		dispatchMenu({ type: "INSERT_MENU", menu });
	// };

	// const updateMenu = (menu) => {
	// 	console.log("updatedata:", menu),
	// 		dispatchMenu({ type: "UPDATE_MENU", menu });
	// };

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
					// alert("Menu deleted !");
					toast.success("Menu deleted", {
						style: {
							background: "green",
							color: "white",
						},
					});
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
		//	let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (e.value == "") return items;
				else return items.filter((x) => +x.date === +e.value);
			},
		});
		// let target = e.target;
		// setFilterFn({
		// 	fn: (items) => {
		// 		console.log("filterItemz",items);
		// 		if (target.value == "") return items;
		// 		else
		// 			return items.filter((x) =>
		// 				x.period.toLowerCase().includes(target.value)
		// 			);
		// 	},
		// });
	};

	// const addOrEdit = (menu, resetForm) => {
	// 	if (menu._id == 0) insertMenu(menu);
	// 	else updateMenu(menu);
	// 	resetForm();
	// 	setRecordForEdit(null);
	// 	setOpenPopup(false);
	// 	// setRecords(getAllMenus());
	// 	setNotify({
	// 		isOpen: true,
	// 		message: "Submitted Successfully",
	// 		type: "success",
	// 	});
	// };

	// const openInPopup = (item) => {
	// 	// setRecordForEdit(item);
	// 	dispatchMenu({ type: "SET_SELECTED_MENU", _id: item._id });
	// 	setOpenPopup(true);
	// };

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
			<Container sx={{ border: "none" }} id='container'>
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
							Menu Manager
						</Typography>
					</Box>
					<Divider />
					<Toolbar style={{ width: "100%" }}>
						{/* <Controls.Input
						label='Search Menus'
						className={classes.searchInput}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/> */}
						{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								disableToolbar
								variant='inline'
								inputVariant='outlined'
								label="Search"
								format='dd/MM/yyyy'
								//name={name}
								value={new Date()}
								onChange={handleSearch}
								sx={{
									"& fieldset": { border: "none" },
									"& .MuiInputBase-root": {
										"& input": {
											textAlign: "left",
										},
									},
									border: "none",
									width: "300px",
								}}
							/>
						</LocalizationProvider> */}
						<Button
							variant='contained'
							// startIcon={<AddIcon />}
							className={classes.newButton}
							onClick={() => {
								dispatchMenu({
									type: "RESET_SELECTED_MENU",
								}),
									setOpenPopup(true);
								// setRecordForEdit(null);
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
								//console.log("itemDate",item.date)
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
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchMenu({
														type: "SET_SELECTED_MENU",
														id: item._id,
													}),
														setOpenPopup(true);
													// openInPopup(item);
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
				{/* <MenuForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
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

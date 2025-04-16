import React, { useState, useContext, useEffect } from "react";
import IngredientsForm from "./IngredientsForm.jsx";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
//import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";
import { AuthContext } from "../../shared/context/auth-context.js";
import { toast } from "sonner";
import { useIngredientsValue } from "../../shared/context/IngredientsProvider.js";
import "./Ingredients.css";
import "./IngredientsTable.css";

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
	{ id: "category", label: "Category" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
	{ id: "price", label: "Price/Kg" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Ingredients() {
	//console.log("loading ingredient");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();

	const {
		ingredientsState: { ingredients },
		dispatchIngredient,
	} = useIngredientsValue();

	const classes = useStyles();
	// const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...ingredients];
	//console.log("record ingredient",records);

	const [filterFn, setFilterFn] = useState({
		fn: (items) => {
			//console.log("filteritems", items);
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
		async function fetchIngredients() {
			//console.log("fetching ingredients");
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/ingredients/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				//	console.log("Ingredients list :", data.ingredients);
				dispatchIngredient({ type: "UPDATE_INGREDIENTS", data });
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
		fetchIngredients();
	}, [location.key]);

	const deleteIngredientItem = async (_id) => {
		//console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/ingredients/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatchIngredient({ type: "DELETE_INGREDIENT", _id });
					setIsLoading(false);

					toast.success("Ingredient deleted", {
						style: {
							background: "green",
							color: "white",
						},
					});
				});
		} catch (err) {
			//console.log("Delete error", err);
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

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteIngredientItem(_id);
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
			<Container id='container' sx={{ border: "none" }}>
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
							Ingredient Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar style={{ width: "100%" }}>
						<Controls.Input
							label='Search Ingredients'
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
								dispatchIngredient({
									type: "RESET_SELECTED_INGREDIENT",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add Ingredient{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								dob = new Date(item.dob).toLocaleDateString();
								return (
									<TableRow key={item._id}>
										<TableCell
											sx={{
												borderBottom: "none",
												paddingTop: 0.8,
												paddingBottom: 0,
											}}
										>
											{item.category}
										</TableCell>
										<TableCell
											sx={{
												borderBottom: "none",
												paddingTop: 0.8,
												paddingBottom: 0,
											}}
										>
											{item.name}
										</TableCell>
										<TableCell
											sx={{
												borderBottom: "none",
												paddingTop: 0.8,
												paddingBottom: 0,
											}}
										>
											{item.description}
										</TableCell>
										<TableCell
											numeric='true'
											sx={{
												borderBottom: "none",
												paddingTop: 0.8,
												paddingBottom: 0,
											}}
										>
											{Number(item.price).toFixed(2)}
										</TableCell>
										<TableCell
											sx={{
												borderBottom: "none",
												paddingTop: 0.8,
												paddingBottom: 0,
											}}
										>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchIngredient({
														type: "SET_SELECTED_INGREDIENT",
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
				title='Loading...'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				{/* <IngredientForm /> */}
				<IngredientsForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <IngredientForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

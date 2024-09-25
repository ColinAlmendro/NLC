import React, { useState, useContext, useEffect } from "react";
import RecipeForm from "./RecipeForm.jsx";

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
	InputAdornment,
	Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTable from "../../components/useTable.js";
// import * as menuController from "../controllers/menuController";
import Controls from "../../components/controls/Controls.js";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";
//import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context.js";
import { useLocation } from "react-router";
import { useRecipeValue } from "../../shared/context/RecipeProvider.js";
// import "./RecipeTable.css";

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
	// { id: "_id", label: "Id" },
	{ id: "image", label: "Image" },
	{ id: "category", label: "Category" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Recipes() {
	//console.log("loading recipe");
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();
	const {
		recipeState: { recipes },
		dispatch,
	} = useRecipeValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...recipes];
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
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   Recipes
	useEffect(() => {
		async function fetchRecipes() {
			//console.log("fetching recipes");
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
				console.log("Recipes list :", data.recipes);
				dispatch({ type: "UPDATE_RECIPES", data });
				setIsLoading(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
			}
		}
		fetchRecipes();
	}, [location.key]);
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Recipes

	const insertRecipe = (recipe) => {
		console.log("insertdata:", recipe),
			dispatch({ type: "INSERT_RECIPE", recipe });
	};

	const updateRecipe = (recipe) => {
		console.log("updatedata:", recipe),
			dispatch({ type: "UPDATE_RECIPE", recipe });
	};

	const deleteRecipeItem = async (_id) => {
		console.log("deleteitem:", _id);
		try {
			setIsLoading(true);
			fetch(process.env.REACT_APP_BACKEND_URL + `/recipes/delete/${_id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				},
			})
				.then((response) => response.json())
				.then(() => {
					dispatch({ type: "DELETE_RECIPE", _id });
					setIsLoading(false);
					alert("Recipe deleted !");
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

	const addOrEdit = (menu, resetForm) => {
		if (menu._id == 0) insertMenu(menu);
		else updateMenu(menu);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		// setRecords(getAllMenus());
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		// setRecordForEdit(item);
		dispatch({ type: "SET_SELECTED_RECIPE", _id: item._id });
		setOpenPopup(true);
	};

	const onDelete = (_id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteRecipeItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	//let period = "";

	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}
	return (
		<>
			<Container sx={{ border: "none" }} fullWidth>
				<Paper
					//textAlign='center'
					// className={classes.pageContent}
					// sx={{ width: 900 }}
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
						<Typography fontWeight='700' variant='h5'>
							Recipe Manager
						</Typography>
					</Box>
					{/* <Divider /> */}
					<Toolbar>
						<Controls.Input
							label='Search Recipes'
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
							variant='contained'
							// startIcon={<AddIcon />}
							className={classes.newButton}
							onClick={() => {
								dispatch({
									type: "RESET_SELECTED_RECIPE",
								}),
									setOpenPopup(true);
								// setRecordForEdit(null);
							}}
						>
							{" "}
							Add Recipe{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => (
								<TableRow key={item._id}>
									{/* <TableCell width="0px">{item._id}</TableCell> */}
									<TableCell>
										<img
											src={`${item.image}?w=164&fit=crop&auto=format`}
											alt={item.name}
											loading='lazy'
											height='50px'
										/>
									</TableCell>
									<TableCell>{item.category}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.description}</TableCell>

									<TableCell>
										<Controls.ActionButton
											color='primary'
											onClick={() => {
												dispatch({
													type: "SET_SELECTED_RECIPE",
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
			<Popup title='Recipe' openPopup={openPopup} setOpenPopup={setOpenPopup}>
				{/* <RecipeForm /> */}
				<RecipeForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
				{/* <RecipeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

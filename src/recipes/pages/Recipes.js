import React, { useState, useContext, useEffect } from "react";
import RecipeForm from "./RecipeForm.jsx";
import ViewRecipe from "./ViewRecipe.jsx";

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
	CircularProgress,
	InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTable from "../../components/useTable.js";

import Controls from "../../components/controls/Controls.js";
import { Search } from "@mui/icons-material";

import Popup from "../../components/Popup.js";
import ViewPopup from "./ViewPopup.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Notification from "../../components/Notification.js";
import ConfirmDialog from "../../components/ConfirmDialog.js";

import { AuthContext } from "../../shared/context/auth-context.js";
import { useLocation } from "react-router-dom";
import { useRecipeValue } from "../../shared/context/RecipeProvider.js";
import "./Recipe.css";
import "./RecipeTable.css";
import { toast } from "sonner";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		align: "center",
		margin: theme.spacing(5),
		padding: theme.spacing(1),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
	img: {
		height: "50px",
		width: "50px",
		borderRadius: "50%",
	},
}));

const headCells = [
	{ id: "image", label: "Image", disableSorting: true },
	{ id: "category", label: "Type" },
	{ id: "freezable", label: "Freeze" },
	{ id: "name", label: "Name" },
	{ id: "description", label: "Description" },
	{ id: "cost", label: "Unit Cost" },
	{ id: "totalcost", label: "Total Cost" },
	{ id: "price", label: "Unit Price" },
	{ id: "orders", label: "Orders" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Recipes() {
	const [isLoading, setIsLoading] = useState(true);
	const auth = useContext(AuthContext);
	const location = useLocation();
	const {
		recipeState: { recipes },
		dispatchRecipe,
	} = useRecipeValue();

	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);

	const records = [...recipes];

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
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   Recipes
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

				dispatchRecipe({ type: "UPDATE_RECIPES", data });
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
		fetchRecipes();
	}, [location.key]);
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Recipes

	
	const deleteRecipeItem = async (_id) => {
	//	console.log("deleteitem:", _id);
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
					dispatchRecipe({ type: "DELETE_RECIPE", _id });
					setIsLoading(false);

					toast.success("Recipe deleted", {
						style: {
							background: "green",
							color: "white",
						},
					});
				});
		} catch (err) {
		//	console.log("Delete error", err);
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
		deleteRecipeItem(_id);
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};
	let orderCount = 0;
	let ingredientsPrice = 0;

	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}
	return (
		<>
			<Container sx={{ border: "none" }} fullwidth='true'>
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
						<Typography fontWeight='900' variant='h5'>
							Recipe Manager
						</Typography>
					</Box>

					<Toolbar style={{ width: "100%" }}>
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
							className={classes.newButton}
							onClick={() => {
								dispatchRecipe({
									type: "RESET_SELECTED_RECIPE",
								}),
									setOpenPopup(true);
							}}
						>
							{" "}
							Add Recipe{" "}
						</Button>
					</Toolbar>
					<TblContainer>
						<TblHead />
						<TableBody>
							{recordsAfterPagingAndSorting().map((item) => {
								{
									
									ingredientsPrice = item.ingredients.reduce(
										(accumulator, item) => {
											return (accumulator += item.ingredient.price * item.qty);
										},
										0
									);
								}
								item.orders ? (orderCount = item.orders) : (orderCount = 0);
								return (
									<TableRow key={item._id}>
										<TableCell width='5%'>
											<img
												src={`${item.image}?w=164&fit=crop&auto=format`}
												alt={item.name}
												loading='lazy'
												className={classes.img}
											/>
										</TableCell>
										<TableCell width='5%'>{item.category}</TableCell>
										<TableCell width='5%'>{item.freezable}</TableCell>
										<TableCell width='10%'>{item.name}</TableCell>
										<TableCell width='15%'>{item.description}</TableCell>
										<TableCell width='10%'>
											{Number(ingredientsPrice / item.feeds).toFixed(2)}
										</TableCell>
										<TableCell width='10%'>
											{Number(ingredientsPrice).toFixed(2)}
										</TableCell>
										<TableCell width='10%'>
											{Number(item.price).toFixed(2)}
										</TableCell>
										<TableCell width='5%'>{item.orders}</TableCell>

										<TableCell width='25%'>
											<Controls.ActionButton
												color='primary'
												onClick={() => {
													dispatchRecipe({
														type: "SET_SELECTED_RECIPE",
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
													dispatchRecipe({
														type: "SET_SELECTED_RECIPE",
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
			<Popup title='Recipe' openPopup={openPopup} setOpenPopup={setOpenPopup}>
				{/* <RecipeForm /> */}
				<RecipeForm openPopup={openPopup} setOpenPopup={setOpenPopup} />
			</Popup>
			<ViewPopup
				title='Loading...'
				openViewPopup={openViewPopup}
				setOpenViewPopup={setOpenViewPopup}
			>
				<ViewRecipe
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

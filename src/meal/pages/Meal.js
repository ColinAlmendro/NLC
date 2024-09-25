import React, { useState } from "react";
import MealForm from "./MealForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import {
	Paper,
	TableBody,
	TableRow,
	TableCell,
	Toolbar,
	InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTable from "../../components/useTable";
//import * as mealController from "../controllers/mealController";
import Controls from "../../components/controls/Controls";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/Popup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
	pageContent: {
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
	{ id: "main", label: "Main" },
	{ id: "mainDescription", label: "Description" },
	{ id: "side", label: "Side" },
	{ id: "sideDescription", label: "Description" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export default function Meal() {
	const classes = useStyles();
	const [recordForEdit, setRecordForEdit] = useState(null);
	// const [records, setRecords] = useState(mealController.getAllMeals());
	const [loadedMeals, setLoadedMeals] = useState([
		{ main: "", mainDescription: "", side: "", sideDescription: "" },
	]);
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

	// useEffect(() => {
	// 	const fetchMeals = async () => {
	// 		try {
	// 			const responseData = await sendRequest(
	// 				process.env.REACT_APP_BACKEND_URL + "/meals/list"
	// 			);
	// 			if (responseData.items.length === 0) {
	// 				setLoadedMeals(responseData.meals);
	// 			} else {
	// 				setLoadedMeals(JSON.parse({ id: "", mealDate: "" }));
	// 			}
	// 		} catch (err) {}
	// 	};
	// 	fetchMeals();
	// 	console.log("loadedMeals", loadedMeals);
	// }, [sendRequest, !!loadedMeals.length]);

	const insertMeal = (meal) => {
		setLoadedMeals(...loadedMeals, meal);
		console.log("insertmealdata:", meal);
	};

	const updateMeal = (meal) => {
		setLoadedMeals(
			loadedMeals.map((a) => {
				if (a.id === id) {
					return { ...loadedMeals, meal };
				}
			})
		);
		console.log("updatedata:", meal);
	};

	const deleteMealItem = (id) => {
		setLoadedMeals(loadedMeals.filter((a) => a.id !== id));
		console.log("deleteitem:", id);
	};

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	} = useTable(loadedMeals, headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (items) => {
				if (target.value == "") return items;
				else
					return items.filter((x) =>
						x.fullName.toLowerCase().includes(target.value)
					);
			},
		});
	};

	const addOrEdit = (meal, resetForm) => {
		if (meal.id == 0) insertMeal(meal);
		else updateMeal(meal);
		resetForm();
		setRecordForEdit(null);
		setOpenPopup(false);
		setLoadedMeals(...loadedMeals);
		setNotify({
			isOpen: true,
			message: "Submitted Successfully",
			type: "success",
		});
	};

	const openInPopup = (item) => {
		setRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		deleteMeal(id);
		setRecords(mealController.getAllMeals());
		setNotify({
			isOpen: true,
			message: "Deleted Successfully",
			type: "error",
		});
	};

	return (
		<>
			<PageHeader
				title='New Meal'
				subTitle='Form design with validation'
				icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
			/>
			<Paper className={classes.pageContent}>
				<Toolbar>
					{/* <Controls.Input
						label='Search Meal'
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
					<Controls.Button
						text='Add New'
						variant='outlined'
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => {
							setOpenPopup(true);
							setRecordForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TableBody>
						{recordsAfterPagingAndSorting.length ? (
							recordsAfterPagingAndSorting().map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.main}</TableCell>
									<TableCell>{item.mainDescription}</TableCell>
									<TableCell>{item.side}</TableCell>
									<TableCell>{item.sideDescription}</TableCell>

									<TableCell>
										<Controls.ActionButton
											color='primary'
											onClick={() => {
												openInPopup(item);
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
														onDelete(item.id);
													},
												});
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>No Meals created</TableCell>
							</TableRow>
						)}
					</TableBody>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Popup
				title='Meal Form'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<MealForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

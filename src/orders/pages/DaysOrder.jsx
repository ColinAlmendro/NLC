import React, { useState, useEffect } from "react";
import {
	Typography,
	//Box,
	Stack,
	//TextField,
	//Button,
	List,
	// ListItem,
	// ListItemText,
	// ListItemButton,
	// ListSubheader,
	Grid,
	// GridItem,
	// Card,
	// CardMedia,
	// CircularProgress,
	// Collapse,
} from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";
// import {
// 	FormProvider,
// 	useFormContext,
// 	useForm,
// 	useFieldArray,
// 	Controller,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { DevTool } from "@hookform/devtools";
//import MenuItem from "./MenuItem.js";
import "./Listitem.css";

const DaysOrder = ({ weekday, display }) => {
	// const { control } = useFormContext();
	const {
		menuState: {
			menus,
			prices,
			selected_menu,
			main_recipes,
			side_recipes,
			vegie_recipes,
			salad_recipes,
			soup_recipes,
			frozen_recipes,
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
			frozen,
		},
		dispatch,
	} = useMenuValue();
	const {
		ordersState: { orders, selected_order },
		dispatchOrder,
	} = useOrdersValue();

	const [record, setRecord] = useState(selected_menu[0]);

	const [menuOrders, setMenuOrders] = useState([]);

	// const [openVegies, setOpenVegies] = React.useState(false);
	// const [openSalads, setOpenSalads] = React.useState(false);
	// const [openSoups, setOpenSoups] = React.useState(false);
	// const [openSides, setOpenSides] = React.useState(false);
	// const [openPromo, setOpenPromo] = React.useState(false);

	// const [dayMenu, setDayMenu] = useState([null]);
	//console.log("selectedmenu", record);
	//console.log("daydisplay", display);

	// let notesArr = [];
	useEffect(() => {
		const CollectMenuOrders = () => {
			let temp = orders;
			temp = temp.filter((order) => order.menu.id === selected_menu[0]._id);

			// collect notes into notes array
			// notesArr = temp.flatMap(
			// 	(order) => [
			// 		// order.monday.map((item) => ({
			// 		order.customer.name,
			// 		order.customer.surname,
			// 		order.note,
			// 	]
			// 	// }))
			// );
			// console.log("ordersnotes", notesArr);
			setMenuOrders(temp);

			//	console.log("menuorders", menuOrders);
		};
		CollectMenuOrders();
	}, [selected_menu]);

	let dayMeals = [];
	let dayItems = [];
	//const [dayItems,setDayItems] = useState([])

	// let mondayArr = [];
	// let tuesdayArr = [];
	// let wednesdayArr = [];
	// let thursdayArr = [];
	// let fridayArr = [];
	// let promoArr = [];

	const sort_by = (field, reverse, primer) => {
		const key = primer
			? function(x) {
					return primer(x[field]);
			  }
			: function(x) {
					return x[field];
			  };

		reverse = !reverse ? 1 : -1;

		return function(a, b) {
			return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
		};
	};

	function getCount(total, item) {
		console.log("getitem in counter", item);
		return total + item.count;
	}

	switch (weekday) {
		case "monday":
			//fields = [...record.vegies];
			//	console.log("selected_menu[0].monday", selected_menu[0].monday);
			// const newArr = menuOrders.flatMap(x=>[x.customer.name,x.monday.description,x.monday.count]);
			console.log("MondaymenuOrders", menuOrders);

			dayMeals = menuOrders.flatMap((order) =>
				order.monday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			console.log("mondayMeals", dayMeals);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

			dayItems = menuOrders.flatMap((order) =>
				order.monday.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));

			//	console.log("dayMeals", dayMeals.reduce(getCount,0));

			// const groupByItem = Map.groupBy(dayMeals, (item) => {
			// 	console.log("groupItemc", item.count);
			// 	return item.description;
			// });

			// console.log("groupByItem", groupByItem);
			// console.log("dayMeals", dayMeals);

			// const groupedByMeal = dayMeals.groupBy(
			// 	item => item.description,
			// 	item => item.count
			// );

			// const groupedByMeal = dayMeals.reduce((acc, entry) => {
			// 	const key = entry.description;

			// 	if (!acc[key]) {
			// 		acc[key] = [];
			// 	}

			// 	acc[key].push(entry);
			// 	//console.log("acc", acc);
			// 	return acc;
			// }, {});

			//	console.log("groupedByMeal", groupedByMeal);
			//console.log("ordersmonday", mondayArr);

			//	menuOptions = [...selected_menu[0].monday];
			break;
		case "tuesday":
			dayMeals = menuOrders.flatMap((order) =>
				order.tuesday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

			dayItems = menuOrders.flatMap((order) =>
				order.tuesday.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			//console.log("orderstuesday", tuesdayArr);

			//	menuOptions = [...selected_menu[0].tuesday];
			break;
		case "wednesday":
			dayMeals = menuOrders.flatMap((order) =>
				order.wednesday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));
			dayItems = menuOrders.flatMap((order) =>
				order.wednesday.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			//console.log("orderswednesday", wednesdayArr);
			// console.log(
			// 	dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()))
			// );

			//  console.log("wednesdayMeals", dayMeals);
			//	menuOptions = [...selected_menu[0].wednesday];
			break;
		case "thursday":
			dayMeals = menuOrders.flatMap((order) =>
				order.thursday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

			dayItems = menuOrders.flatMap((order) =>
				order.thursday.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			//	console.log("ordersthursday", thursdayArr);

			//	menuOptions = [...selected_menu[0].thursday];
			break;
		case "friday":
			dayMeals = menuOrders.flatMap((order) =>
				order.friday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

			dayItems = menuOrders.flatMap((order) =>
				order.friday.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			break;
		case "frozen":
			dayMeals = menuOrders.flatMap((order) =>
				order.frozen.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);
			dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

			dayItems = menuOrders.flatMap((order) =>
				order.frozen.map((item) => ({
					name: order.customer.name,
					surname: order.customer.surname,
					description: item.description,
					count: item.count,
				}))
			);
			dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			break;
		case "promotion":
			if (menuOrders.promotion) {
				dayMeals = menuOrders.flatMap((order) =>
					order.promotion.map((item) => ({
						description: item.description,
						count: item.count,
						name: order.customer.name,
						surname: order.customer.surname,
					}))
				);
				dayMeals.sort(sort_by("description", false, (a) => a.toUpperCase()));

				dayItems = menuOrders.flatMap((order) =>
					order.promo.map((item) => ({
						name: order.customer.name,
						surname: order.customer.surname,
						description: item.description,
						count: item.count,
					}))
				);
				dayItems.sort(sort_by("name", false, (a) => a.toUpperCase()));
			} else {
				dayMeals = [];
				dayItems = [];
			}
			//	console.log("orderspromo", promoArr);

			//	menuOptions = [...selected_menu[0].friday];
			break;
		default:
			dayMeals = [];
			dayItems = [];
	}
	let lastItem = "";
	let lastMeal = "";
	let mealCount = 0;
	let lastName = "";
	let lastSurname = "";
	let lastCustomer = "";
	let rowColour = "#FFF";

	return (
		<Grid
			container
			rowSpacing={0}
			columnSpacing={0}
			sx={{ border: "none" }} //1px solid
		>
			<Grid item xs={1} lg={1}></Grid>
			<Grid item xs={10} lg={10}>
				{dayItems.length !== 0 ? (
					<Stack>
						<>
							{display === "customers" ? (
								<List label='Customers'>
									{dayItems.map((item, i) => {
										{
											/* console.log("lastnmae", lastName, lastSurname); */
										}
										{
											/* console.log("lastItem", item); */
										}
										{
											/* let lastName = "";
								let lastSurname = "";
								let lastCustomer = ""; */
										}
										if (
											lastName === item.name &&
											lastSurname === item.surname
										) {
											lastCustomer = "";
										} else {
											lastCustomer = `${item.name} ${item.surname}`;
											rowColour === "#FD9"
												? (rowColour = "#CDF")
												: (rowColour = "#FD9");
										}
										lastName = item.name;
										lastSurname = item.surname;

										console.log("lastCustomer", lastCustomer);
										{
											/* let lastRowColour = "#000";
								let rowColour = "#000" */
										}
										return (
											<Stack
												direction='row'
												bgcolor={rowColour}
												// sx={{ bgColor: {rowColour}, border: "1px solid" }}
											>
												<Grid item xs={3} lg={3}>
													<Typography
														fontWeight='700'
														sx={{
															// mx: "auto",
															textAlign: "left",
															p: 0,
															m: 0,
														}}
													>
														{lastCustomer}
														{/* {`${item.name} ${item.surname}`} */}
													</Typography>
												</Grid>
												<Grid item xs={7} lg={7}>
													<Typography
														fontWeight='500'
														sx={{
															// mx: "auto",
															textAlign: "left",
															p: 0,
															m: 0,
														}}
													>
														-&nbsp;{` ${item.description}`}
													</Typography>
												</Grid>
												<Grid item xs={2} lg={2}>
													<Typography fontWeight='500'>{` ${item.count}`}</Typography>
												</Grid>
											</Stack>
										);
									})}
								</List>
							) : (
								<List label='Meals'>
									{dayMeals.map((item, i) => {
										{
											{
												/* console.log("dayMeals", dayMeals.reduce(getCount, 0), dayMeals); */
											}
										}
										{
											console.log("lastItem", item);
										}
										{
											/* let lastName = "";
								let lastSurname = "";
								let lastCustomer = ""; */
										}
										if (lastItem === item.description) {
											lastMeal = "";
											{
												/* mealCount = mealCount + item.count; */
											}
										} else {
											let filteredItems = dayMeals;
											filteredItems = filteredItems.filter(
												(mealItem) => mealItem.description === item.description
											);
											console.log("Filtered", filteredItems);
											mealCount = filteredItems.reduce(getCount, 0);
											lastMeal = `${mealCount} * ${item.description}`;
											//lastMeal = item.description;

											rowColour === "#FD9"
												? (rowColour = "#CDF")
												: (rowColour = "#FD9");
											mealCount = item.count;
										}
										lastItem = item.description;

										//	console.log("lastMeal", lastMeal);
										{
											/* let lastRowColour = "#000";
								let rowColour = "#000" */
										}
										return (
											<Stack
												direction='row'
												bgcolor={rowColour}
												// sx={{ bgColor: {rowColour}, border: "1px solid" }}
											>
												<Grid item xs={6} lg={6}>
													<Typography
														fontWeight='600'
														sx={{
															// mx: "auto",
															textAlign: "left",
															p: 0,
															m: 0,
														}}
													>
														{lastMeal}
													</Typography>
												</Grid>
												<Grid item xs={4} lg={4}>
													<Typography
														fontWeight='500'
														sx={{
															// mx: "auto",
															textAlign: "left",
															p: 0,
															m: 0,
														}}
													>
														-&nbsp;{` ${item.name} ${item.surname}`}
													</Typography>
												</Grid>
												<Grid item xs={2} lg={2}>
													<Typography fontWeight='500'>{` ${item.count}`}</Typography>
												</Grid>
											</Stack>
										);
									})}
								</List>
							)}
						</>
					</Stack>
				) : (
					<Grid item xs={12} lg={12}>
						<Typography fontWeight='500'>No Orders</Typography>
					</Grid>
				)}
			</Grid>
			<Grid item xs={1} lg={1}></Grid>
		</Grid>
	);
};

export default DaysOrder;

import React, { useState, useEffect } from "react";
import { Typography, Stack, List, ListItem, Grid } from "@mui/material";

import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useOrdersValue } from "../../shared/context/OrdersProvider.js";

import "./Listitem.css";

const DaysOrder = ({ weekday, display }) => {
	const {
		menuState: { selected_menu },
		dispatch,
	} = useMenuValue();
	const {
		ordersState: { orders, selected_order },
		dispatchOrder,
	} = useOrdersValue();

	const [menuOrders, setMenuOrders] = useState([]);

	useEffect(() => {
		const CollectMenuOrders = () => {
			let temp = orders;
			temp = temp.filter((order) => order.menu.id === selected_menu[0]._id);

			setMenuOrders(temp);
		};
		CollectMenuOrders();
	}, [selected_menu]);

	let dayMeals = [];
	let dayItems = [];

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
		//console.log("getitem in counter", item);
		return total + item.count;
	}

	switch (weekday) {
		case "monday":
			dayMeals = menuOrders.flatMap((order) =>
				order.monday.map((item) => ({
					description: item.description,
					count: item.count,
					name: order.customer.name,
					surname: order.customer.surname,
				}))
			);

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

										return (
											<ListItem key={i}>
												<Stack direction='row' bgcolor={rowColour}>
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
											</ListItem>
										);
									})}
								</List>
							) : (
								<List label='Meals'>
									{dayMeals.map((item, i) => {
										if (lastItem === item.description) {
											lastMeal = "";
										} else {
											let filteredItems = dayMeals;
											filteredItems = filteredItems.filter(
												(mealItem) => mealItem.description === item.description
											);
											//	console.log("Filtered", filteredItems);
											mealCount = filteredItems.reduce(getCount, 0);
											lastMeal = `${mealCount} * ${item.description}`;

											rowColour === "#FD9"
												? (rowColour = "#CDF")
												: (rowColour = "#FD9");
											mealCount = item.count;
										}
										lastItem = item.description;

										return (
											<ListItem key={i}>
												<Stack direction='row' bgcolor={rowColour}>
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
											</ListItem>
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

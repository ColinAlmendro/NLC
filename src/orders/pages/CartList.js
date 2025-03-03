import { useContext, useState, useEffect } from "react";

// import Modal from "./Modal";
import CartContext from "../../shared/context/cart-context";
import CartCount from "./CartCount";
import { toast } from "sonner";
import "./CartList.css";
import {
	Typography,
	Box,
	Divider,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Container,
	Paper,
	Stack,
	TextField,
	InputLabel,
	Button,
	MenuItem,
	FormLabel,
	FormControl,
	List,
	ListItem,
	Grid,
	GridItem,
	Card,
	CardMedia,
	CircularProgress,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useValue } from "../../shared/context/SettingsProvider.js";
import { useNavigate } from "react-router-dom";
// import {
// 	FormProvider,
// 	useFormContext,
// 	useForm,
// 	useFieldArray,
// 	Controller,
// } from "react-hook-form";

// import { DevTool } from "@hookform/devtools";

import "./Listitem.css";

const CartList = (props) => {
	const auth = useContext(AuthContext);
	const { state, dispatch } = useValue();
	const [isLoading, setIsLoading] = useState(false);

	const history = useNavigate();

	let {
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		frozen,
		promotion,
		totalCount,
		totalCost,
		totalDelivery,
		totalAmount,
		setDeliveryRate,
		setTotalDelivery,
		addItem,
		removeItem,
		resetCart,
	} = useContext(CartContext);

	const [open, setOpen] = useState(false);
	const { openCartPopup, setOpenCartPopup, menu, customer, note } = props;
	const [openCart, setCartOpen] = useState(false);
	const [AArate, setAArate] = useState(state.aa_rate);
	const [areaKM, setAreaKM] = useState(0);
	const [customerArea, setCustomerArea] = useState(customer.area);
	const [areaList, setAreaList] = useState(state.area_list);

	//console.log("AreaList", areaList);
	//console.log("customerArea", customerArea);

	// let filteredArea = areaList;
	// filteredArea = filteredArea.filter((a) => a.area === customerArea);
	// console.log("filteredArea", filteredArea);
	// setAreaKM(filteredArea[0].delivery_km);

	const order = {
		date: new Date(),
		customer: customer._id,
		menu: menu._id,
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		frozen: [],
		promotion: [],
		item_count: totalCount,
		total_cost: totalCost,
		total_delivery: totalDelivery,
		total_price: totalAmount,
		note: note,
	};

	let orderItem = {
		item: "",
		category: "",
		description: "",
		premium: 0,
		count: 0,
		cost: 0,
		price: 0,
	};

	useEffect(() => {
		//console.log("resetcart");
		const calcDeliveryCost = () => {
			//  console.log("AADeliveryCost", AArate,areaKM);
			let filteredArea = areaList;
			filteredArea = filteredArea.filter((a) => a.area === customerArea);
			//console.log("filteredArea", filteredArea);
			setAreaKM(filteredArea[0].delivery_km);
			let singleDeliveryCost = AArate * filteredArea[0].delivery_km;
			console.log("AADeliveryCost", AArate, filteredArea[0].delivery_km);
			setDeliveryRate(singleDeliveryCost);
			let deliveryCount = 0;
			if (monday.length > 0) {
				deliveryCount++;
				//console.log("monday", deliveryCount);
			}
			if (tuesday.length > 0) {
				deliveryCount++;
				//console.log("tuesday", deliveryCount);
			}
			if (wednesday.length > 0) {
				deliveryCount++;
				//console.log("wednesday", deliveryCount);
			}
			if (thursday.length > 0) {
				deliveryCount++;
				//console.log("thursday", deliveryCount);
			}
			if (friday.length > 0) {
				deliveryCount++;
				//console.log("friday", deliveryCount);
			}
			if (deliveryCount === 0 && (frozen.length > 0 || promotion.length > 0)) {
				deliveryCount = 1;
			}
			setTotalDelivery(singleDeliveryCost * deliveryCount);
			//console.log("totaldelivery", singleDeliveryCost * deliveryCount);
		};
		calcDeliveryCost();
	}, [monday, tuesday, wednesday, thursday, friday, frozen, promotion]);

	const onSubmit = async () => {
		// e.preventDefault();
		// console.log("clicked", monday);
		//console.log("clicked", promotion);

		if (monday.length > 0) {
			monday.map((item) => {
				const new_monday = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_monday", new_monday);
				order.monday.push(new_monday);
			});
		}
		if (tuesday.length > 0) {
			tuesday.map((item) => {
				const new_tuesday = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_tuesday", new_tuesday);
				order.tuesday.push(new_tuesday);
			});
		}
		if (wednesday.length > 0) {
			wednesday.map((item) => {
				const new_wednesday = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_wednesday", new_wednesday);
				order.wednesday.push(new_wednesday);
			});
		}
		if (thursday.length > 0) {
			thursday.map((item) => {
				const new_thursday = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_thursday", new_thursday);
				order.thursday.push(new_thursday);
			});
		}
		if (friday.length > 0) {
			friday.map((item) => {
				const new_friday = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_friday", new_friday);
				order.friday.push(new_friday);
			});
		}
		if (frozen.length > 0) {
			frozen.map((item) => {
				const new_frozen = {
					...orderItem,
					item: item.main._id,
					category: item.main.category,
					description: item.main.name,
					premium: item.main.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				//	console.log("new_frozen", new_frozen);
				order.frozen.push(new_frozen);
			});
		}
		if (promotion.length > 0) {
			promotion.map((item) => {
				const new_promotion = {
					...orderItem,
					item: item.recipe._id,
					category: item.recipe.category,
					description: item.recipe.name,
					premium: item.recipe.premium,
					count: item.count,
					cost: item.cost,
					price: item.price,
				};
				console.log("new_promotion", new_promotion);
				order.promotion.push(new_promotion);
			});
		}
		console.log("order", order);
		try {
			setIsLoading(true);

			const responseNew = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/orders/new",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},
					body: JSON.stringify(order),
				}
			);
			const dataNew = await responseNew.json();
			//		console.log("ret data", dataNew);

			setIsLoading(false);
			history("/orders");
			// alert("New order added");
			toast.success("New order added", {
				style: {
					background: "green",
					color: "white",
				},
			});
			setOpen(false);
			//	setOpenPopup(false);
			return dataNew;
		} catch (err) {
			console.log("SubmitNew err:", err);
			toast.error(err, {
				style: {
					background: "red",
					color: "white",
				},
			});
			setIsLoading(false);
		}
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
			<Container sx={{ border: "none" }}>
				<Paper>
					<Box display='flex' p={2}>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={0}
							sx={{ border: "none" }} //1px solid
						>
							{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
							<Grid item xs={12} lg={12}>
								<Stack direction='row'>
									<Grid item xs={12} lg={10}>
										<Box
											sx={{
												mx: "auto",
												textAlign: "center",
												p: 2,
												m: 0,
											}}
										>
											<Typography fontWeight='700' variant='h5'>
												Order Basket
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} lg={2}>
										<Stack direction='row' spacing={1}>
											<Button
												sx={{ gap: "1rem" }}
												// width='100px'
												variant='contained'
												color='error'
												autoFocus
												onClick={() => {
													setOpenCartPopup(false);
													setOpen(false); // ,
												}}
											>
												Back
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												// width='100px'
												variant='contained'
												color='success'
												type='submit'
												onClick={() => {
													onSubmit();
													setOpenCartPopup(false);
													setOpen(false); // ,
												}}
											>
												Save
											</Button>
										</Stack>
									</Grid>
								</Stack>
							</Grid>
							<Divider sx={{ my: 6 }} />
							<Stack direction='row' sx={{ width: 1 }}>
								<Grid item xs={1} lg={1}></Grid>
								<Grid item xs={8} lg={8}>
									<Typography fontWeight='700'>Menu</Typography>
									<p>&nbsp;{new Date(menu.date).toLocaleDateString("en-ZA")}</p>
								</Grid>
								<Grid item xs={3} lg={3}>
									<Typography fontWeight='700'>Customer</Typography>
									<p>&nbsp;{`${customer.name} ${customer.surname}`}</p>
									<p>&nbsp;{customer.address1}</p>
									<p>&nbsp;{customer.address2}</p>
									<p>&nbsp;{customer.cell}</p>
								</Grid>
							</Stack>
							{note && (
								<Grid item xs={12} lg={12}>
									<Typography fontWeight='700'>Note</Typography>
									<p>&nbsp;{note}</p>
								</Grid>
							)}
							{/* /////////////////////////////////////////////////////////////////  MONDAY */}
							<Grid item xs={12} lg={12}>
								{monday.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Monday</Typography>
										<ul>
											{monday.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addMonday = () => {
													addItem(item, "monday");
												};

												const rmvMonday = () => {
													removeItem(id, "monday");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															{/* <br /> */}
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addMonday}
																onRemoveFromCart={rmvMonday}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  TUESDAY */}
							<Grid item xs={12} lg={12}>
								{tuesday.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Tuesday</Typography>
										<ul>
											{tuesday.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addTuesday = () => {
													addItem(item, "tuesday");
												};

												const rmvTuesday = () => {
													removeItem(id, "tuesday");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addTuesday}
																onRemoveFromCart={rmvTuesday}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  WEDNESDAY */}
							<Grid item xs={12} lg={12}>
								{wednesday.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Wednesday</Typography>
										<ul>
											{wednesday.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addWednesday = () => {
													addItem(item, "wednesday");
												};

												const rmvWednesday = () => {
													removeItem(id, "wednesday");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addWednesday}
																onRemoveFromCart={rmvWednesday}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  THURSDAY */}
							<Grid item xs={12} lg={12}>
								{thursday.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Thursday</Typography>
										<ul>
											{thursday.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addThursday = () => {
													addItem(item, "thursday");
												};

												const rmvThursday = () => {
													removeItem(id, "thursday");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addThursday}
																onRemoveFromCart={rmvThursday}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  FRIDAY */}
							<Grid item xs={12} lg={12}>
								{friday.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Friday</Typography>
										<ul>
											{friday.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addFriday = () => {
													addItem(item, "friday");
												};

												const rmvFriday = () => {
													removeItem(id, "friday");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addFriday}
																onRemoveFromCart={rmvFriday}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  FROZEN MEALS */}
							<Grid item xs={12} lg={12}>
								{frozen.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Frozen</Typography>
										<ul>
											{frozen.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addFrozen = () => {
													addItem(item, "frozen");
												};

												const rmvFrozen = () => {
													removeItem(id, "frozen");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.mainname} />
														</span>
														<span className='cartlist_content'>
															<span>{item.mainname}</span>
															<span>&nbsp;&nbsp;{item.maindescription}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addFrozen}
																onRemoveFromCart={rmvFrozen}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* /////////////////////////////////////////////////////////////////  PROMOTION */}
							<Grid item xs={12} lg={12}>
								{promotion.length > 0 && (
									<div className='items_wrapper'>
										<Typography fontWeight='700'>Promotion</Typography>
										<ul>
											{promotion.map((item, i) => {
												let itemTotalAmnt = (item.count * item.price).toFixed(
													2
												);
												let id = item.id;

												const addPromotion = () => {
													addItem(item, "promotion");
												};

												const rmvPromotion = () => {
													removeItem(id, "promotion");
												};

												return (
													<li key={i} className='cartlist_item'>
														<span className='cartlist_img'>
															<img src={item.image} alt={item.name} />
														</span>
														<span className='cartlist_content'>
															<span>{item.name}</span>
															<span>&nbsp;&nbsp;{item.description}</span>
															<br />
															<span>
																{item.count} &times; R{item.price}
															</span>
														</span>
														<span className='cartlist_action'>
															<span>R{itemTotalAmnt}</span>
															<br />
															<CartCount
																count={item.count}
																onAddToCart={addPromotion}
																onRemoveFromCart={rmvPromotion}
																showCount='true'
															/>
														</span>
													</li>
												);
											})}
										</ul>
									</div>
								)}
							</Grid>
							{/* 77777777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}
							<Grid item xs={12} lg={12}>
								{/* <div className='total_wrapper'>
									<span>Total Items</span>
									<span>{totalCount}</span>
								</div> */}
								<div className='total_wrapper'>
									<span>Sub Total</span>
									<span>R{parseFloat(totalAmount).toFixed(2)}</span>
								</div>
								<div className='total_wrapper'>
									<span>Incl. Delivery</span>
									<span>R{parseFloat(totalDelivery).toFixed(2)}</span>
								</div>
								<div className='total_wrapper'>
									<span>Total Amount</span>
									<span>
										R{parseFloat(totalAmount + totalDelivery).toFixed(2)}
									</span>
								</div>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Container>
		</>
	);
};

export default CartList;

import React, { useState, useEffect, useRef } from "react";
import {
	Typography,
	Box,
	Container,
	Paper,
	Stack,
	Button,
	List,
	ListItem,
	Grid,
	Card,
	CardMedia,
	CircularProgress,
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useValue } from "../../shared/context/SettingsProvider.js";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./ViewMenu.css";
import "./CartList.css";
import "./MenuItem.css";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	imageList: {
		// width: 500,
		height: 200,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

function ViewMenu(props) {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);

	const pdfRef = useRef();

	const { state } = useValue(); //app state
	const {
		menuState: {
			selected_menu,

			promotions,
		},
		dispatchMenu,
	} = useMenuValue();
	const [record, setRecord] = useState(selected_menu[0]);
	const [open, setOpen] = useState(false);
	const { openViewPopup, setOpenViewPopup } = props;
	const [prices, setPrices] = useState(state.price_list);

	let defaultMenu = {};
	if (record) {
		defaultMenu = {
			...record,
			logo: state.logo,
			image: state.image,
			contact: state.contact,
		};
	} else {
		defaultMenu = {
			date: new Date(),
			logo: state.logo,
			image: state.image,
			contact: state.contact,
			introduction: "",
			instruction: "",
			promotion: "",
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			frozen: [],
			vegies: [],
			salads: [],
			soups: [],
			sides: [],
			note: "",
		};
	}
	const [promotionsList, setPromotionsList] = useState(promotions);
	const [selectedPromotion, setSelectedPromotion] = useState(
		record
			? () => {
					if (record.promotion !== "none") {
						let promo = promotionsList.find(
							(obj) => obj._id === record.promotion
						);

						return promo.items;
					} else {
						return [];
					}
			  }
			: []
	);

	let selDate = new Date();
	if (record) {
		selDate = new Date(selected_menu[0].date);
	} else {
		selDate = new Date();
	}
	const [selectedDate, setSelectedDate] = useState(selDate);
	const [period, setPeriod] = useState(null);
	const [instruction, setInstruction] = useState(null);

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

	useEffect(() => {
		const week = selectedDate;
		//console.log("getValues_date", week);
		let endDate = new Date(week);
		// Add 5 days to the start date
		endDate.setDate(week.getDate() + 5);
		let period = `MENU FOR WEEK ${week.getDate()} ${monthName(
			week.getMonth()
		)} - ${endDate.getDate()} ${monthName(
			endDate.getMonth()
		)} ${endDate.getFullYear()}`;
		setPeriod(period);

		let beforeDate = new Date(week);
		// Subtract 1 day from the start date
		beforeDate.setDate(week.getDate() - 1);
		let instruction = `Orders to please be in by 22h00 on Sunday, ${beforeDate.getDate()} ${monthName(
			beforeDate.getMonth()
		)} ${beforeDate.getFullYear()}`;
		setInstruction(instruction);
	}, [selectedDate]);

	const createPDF = async () => {
		//const menuDate = new Date(order.menu.date).toLocaleDateString("en-ZA");
		const input = pdfRef.current;
		html2canvas(input, { useCORS: true }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width + 800;
			const imgHeight = canvas.height + 800;

			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
			//console.log("kkk", pdfWidth, imgWidth, pdfHeight, imgHeight, ratio);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = 0;
			pdf.addImage(
				imgData,
				"PNG",
				imgX,
				imgY,
				imgWidth * ratio,
				imgHeight * ratio
			);
			pdf.save(`Menu_${period}.pdf`);
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
			<Container sx={{ border: "none", width: "100%" }}>
				<Paper>
					<Stack display='flex' p={0}>
						<Grid
							container
							rowSpacing={0}
							columnSpacing={0}
							sx={{ border: "none" }} //1px solid
						>
							{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
							<Grid item xs={12} lg={12}>
								<Stack direction='row'>
									<Grid item xs={12} lg={10}></Grid>
									<Grid item xs={2} lg={2}>
										<Stack direction='row' spacing={1}>
											<Button
												sx={{ gap: "1rem" }}
												variant='contained'
												color='error'
												autoFocus
												onClick={() => {
													setOpenViewPopup(false);
													setOpen(false);
												}}
											>
												Cancel
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												variant='contained'
												color='success'
												type='button'
												onClick={() => {
													createPDF();
													setOpenViewPopup(false);
													setOpen(false);
												}}
											>
												Export
											</Button>
										</Stack>
									</Grid>
								</Stack>
							</Grid>
						</Grid>
						<br />
						{/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                         MENU  */}
						<div
							ref={pdfRef}
							style={{
								width: "1050px",
								margin: "0px",
								padding: "15px",
								border: "0px solid",
							}}
						>
							<Grid
								container
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								
								{/* 7777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}
								<Grid item xs={4} lg={4}></Grid>
								<Grid item xs={4} lg={4}>
									{state.menu_logo && (
										<Box
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 200 }}>
												<CardMedia
													component='img'
													image={state.menu_logo}
													alt='Menu Logo'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={4} lg={4}></Grid>
								{/* ************************************************ CONTACT */}
								<Grid item xs={12} lg={12}>
									<Typography variant='caption' component='div'>
										<Box
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{`${state.contact_name} ~ ${state.contact_cellphone} ~ WhatsApp`}
										</Box>
									</Typography>
								</Grid>
								{/* ***********************************************  IMAGE & INTRO */}
								<Grid item xs={2} lg={2} sx={{ border: "none" }}>
									{state.menu_image && (
										<Box
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "none",
												width: "100%",
											}}
										>
											<Card sx={{ maxWidth: 300 }}>
												<CardMedia
													component='img'
													image={state.menu_image}
													alt='Menu Image'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={10} lg={10}>
									<Box
										p={2}
										border='none'
										sx={{
											"& fieldset": { border: "none" },
											"& .MuiBox-root": {
												width: 100,
												border: "none",
											},
										}}
									>
										<Typography fontWeight='500' variant='caption'>
											{defaultMenu.introduction}
										</Typography>
									</Box>
								</Grid>
								{/* ***********************************************    PROMOTION**** */}
								{selectedPromotion.length > 0 ? (
									<Grid item xs={12} lg={12}>
										<>
											<Grid item xs={12} lg={12}>
												<Box
													sx={{
														mx: "auto",
														textAlign: "center",
														p: 1,
														m: 0,
													}}
												>
													<Typography fontWeight='700' variant='caption'>
														* PROMOTION *
													</Typography>
												</Box>
											</Grid>

											<Grid item xs={12} lg={12} mt={2}>
												{/* Promotion Items */}
												<Box className={classes.root}>
													<ImageList
														className={classes.imageList}
														cols={6}
														rowHeight={50}
														gap={5}
													>
														{selectedPromotion.map((item) => (
															<ImageListItem key={item.id}>
																<img
																	srcSet={`${item.image}?w=164&fit=crop&auto=format&dpr=2 2x`}
																	src={`${item.image}?w=164&fit=crop&auto=format`}
																	alt={item.name}
																	loading='lazy'
																	height='50px'
																/>
																<ImageListItemBar
																	style={{
																		backgroundColor: "gray",
																		color: "white",
																		fontWeight: "bold",
																		textAlign: "center",
																	}}
																	title={<span>{item.name}</span>}
																	subtitle={`${item.volume}${"\xa0".repeat(
																		25
																	)} R${item.price}`}
																	position='below'
																/>
															</ImageListItem>
														))}
													</ImageList>
												</Box>
											</Grid>
										</>
									</Grid>
								) : null}
								{/* ************************************************      PERIOD */}
								<Grid item xs={2} lg={2}></Grid>
								<Grid item xs={8} lg={8}>
									<Stack spacing={0}>
										<Typography variant='caption' component='div'>
											<Box
												sx={{
													mx: "auto",
													fontWeight: "700",
													textAlign: "center",
													p: 0,
													m: 1,
												}}
											>
												{period}
											</Box>
										</Typography>
										<Typography variant='caption' component='div'>
											<Box
												sx={{
													mx: "auto",
													fontWeight: "700",
													textAlign: "center",
													p: 0,
													m: 1,
												}}
											>
												{instruction}
											</Box>
										</Typography>
									</Stack>
								</Grid>
								<Grid item xs={2} lg={2}></Grid>
								{/* ************************************************      PRICELIST */}
								<Grid item xs={12} lg={12}>
									<List>
										{prices.map((price, i) => (
											<ListItem key={i}>
												<Typography variant='caption' component='div'>
													<Box sx={{ fontWeight: "bold", height: "25%" }}>
														{price.value}
													</Box>
												</Typography>
											</ListItem>
										))}
									</List>
								</Grid>
								{/* ############################################################################################################################################################ */}
								{/* <Day weekday='monday' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.monday && (
										<div>
											<Typography fontWeight='600'>Monday</Typography>
											<ul>
												{defaultMenu.monday.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>
																		<br />
																		<span lineheight='0.5rem'>
																			&nbsp;&nbsp;
																			<Typography
																				variant='caption'
																				lineheight='0.5rem'
																			>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Day weekday='tuesday' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.tuesday && (
										<div>
											<Typography fontWeight='600'>Tuesday</Typography>
											<ul>
												{defaultMenu.tuesday.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Day weekday='wednesday' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.wednesday && (
										<div>
											<Typography fontWeight='600'>Wednesday</Typography>
											<ul>
												{defaultMenu.wednesday.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Day weekday='thursday' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.thursday && (
										<div>
											<Typography fontWeight='600'>Thursday</Typography>
											<ul>
												{defaultMenu.thursday.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Day weekday='friday' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.friday && (
										<div>
											<Typography fontWeight='600'>Friday</Typography>
											<ul>
												{defaultMenu.friday.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* ############################################################################################################################################################ */}
								{/* <Extra extra='vegies' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.vegies && (
										<div>
											<Typography fontWeight='600'>Vegies</Typography>
											<ul>
												{defaultMenu.vegies.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Extra extra='salads' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.salads && (
										<div>
											<Typography fontWeight='600'>Salads</Typography>
											<ul>
												{defaultMenu.salads.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Extra extra='soups' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.soups && (
										<div>
											<Typography fontWeight='600'>Soups</Typography>
											<ul>
												{defaultMenu.soups.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* <Extra extra='sides' /> */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.sides && (
										<div>
											<Typography fontWeight='600'>Sides</Typography>
											<ul>
												{defaultMenu.sides.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
								{/* Frozen meals */}
								<Grid item xs={12} lg={12}>
									{defaultMenu.frozen && (
										<div>
											<Typography fontWeight='600'>Frozen Meals</Typography>
											<ul>
												{defaultMenu.frozen.map((item, i) => {
													{
														/* console.log("item", item); */
													}
													return (
														<li key={i} className='cartlist_item'>
															<Stack direction='row' spacing={2}>
																<Grid item xs={1} lg={1}>
																	<span className='cartlist_img'>
																		<img src={item.image} alt={item.mainname} />
																	</span>
																</Grid>
																<Grid item xs={9} lg={9}>
																	<span className='cartlist_content'>
																		<span>{item.mainname}</span>

																		<span>
																			&nbsp;~&nbsp;
																			<Typography variant='caption'>
																				{item.maindescription}
																			</Typography>
																		</span>
																	</span>
																</Grid>
																<Grid item xs={2} lg={2}>
																	<span>R{item.price}</span>
																</Grid>
															</Stack>
														</li>
													);
												})}
											</ul>
										</div>
									)}
								</Grid>
							</Grid>

							{/* ################################################################################################# */}
							{/* ################################################################################################# */}
						</div>
					</Stack>
				</Paper>
			</Container>
		</>
	);
}
export default ViewMenu;

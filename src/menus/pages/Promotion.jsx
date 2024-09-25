import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

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
	ImageList,
	ImageListItem,
	ImageListItemBar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMenuValue } from "../../shared/context/MenuProvider.js";

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
		height: 300,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

const Promotion = () => {
	const classes = useStyles();
	const { control } = useFormContext();
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
			week,
			//period,
			introduction,
			promotions,
			//instruction,
		},
		dispatch,
	} = useMenuValue();
	const [promotionsList, setPromotionsList] = useState(promotions);
	const [record, setRecord] = useState(selected_menu[0]);
	const [togglePromotionInput, setTogglePromotionInput] = useState(
		record ? (record.promotion ? true : false) : false
	);
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

	// const handleAddPromotion = () => {
	// 	setTogglePromotionInput(true);
	// };
	// const handleRemovePromotion = () => {
	// 	setTogglePromotionInput(false);
	// 	setSelectedPromotion([]);
	// 	document.getElementById("promotionInput").value = "none";
	// 	//setRecord({...record,promotion:""})
	// };

	// let itemArray = []
	const handelPromotionChange = (value) => {
		//	console.log("promovalue:", value.target.value);
		if (value.target.value !== "none") {
			let promo = promotionsList.find((obj) => obj._id === value.target.value);
			//	console.log("arr:", promo.items);
			setSelectedPromotion(promo.items);
			//	console.log("SelectedPromo:", selectedPromotion);
		} else {
			setSelectedPromotion([]);
		}
	};

	return (
		<div>
			<Grid>
				<Grid item xs={12} lg={12}>
					{/* {!togglePromotionInput ? (
						<Grid item xs={12} lg={12}>
							<Button onClick={handleAddPromotion}>Add Promotion</Button>
						</Grid>
					) : ( */}
					<>
						<Grid item xs={12} lg={12} mt={2}>
							{/* <Stack direction='row'> */}
							{/* <Button onClick={handleRemovePromotion}>
										Remove Promotion
									</Button> */}

							<Controller
								name={`promotion`}
								control={control}
								defaultValue=''
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<TextField
										select
										// {...field}
										name={`promotion`}
										id='promotionInput'
										value={value}
										//defaultValue="none"
										label='Promotion'
										//onChange={onChange}
										onChange={(value) => {
											onChange(value), handelPromotionChange(value);
										}}
										size='small'
										sx={{ width: "75%" }}
										error={!!error}
										required
									>
										<MenuItem value='none'>None</MenuItem>

										{promotionsList.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.promotion}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
							{/* </Stack> */}
						</Grid>
						{selectedPromotion.length > 0 ? (
							<Grid item xs={12} lg={12} mt={2}>
								{/* Promotion Items */}
								<Box
									// alignItems='center'
									// justifyContent='center'
									className={classes.root}
								>
									<ImageList
										className={classes.imageList}
										// sx={{ height: 300 }}
										// sx={{
										// 	height: 200,
										// 	columnCount: {
										// 		xs: "1 !important",
										// 		sm: "2 !important",
										// 		md: "4 !important",
										// 		lg: "6 !important",
										// 		xl: "8 !important",
										// 	},
										// }}
										cols={6}
										rowHeight={100}
										gap={10}
										fullWidth
									>
										{selectedPromotion.map((item) => (
											<ImageListItem key={item.id}>
												<img
													srcSet={`${item.image}?w=164&fit=crop&auto=format&dpr=2 2x`}
													src={`${item.image}?w=164&fit=crop&auto=format`}
													alt={item.name}
													loading='lazy'
													//width="100px"
													height='100px'
												/>
												<ImageListItemBar
													style={{
														backgroundColor: "gray",
														color: "white",
														fontWeight: "bold",
														textAlign: "center",
													}}
													title={<span>{item.name}</span>}
													subtitle={`${item.volume}${"\xa0".repeat(25)} R${
														item.price
													}`}
													position='below'
												/>
											</ImageListItem>
										))}
									</ImageList>
								</Box>
							</Grid>
						) : null}
					</>

					{/* )} */}
				</Grid>
			</Grid>
		</div>
	);
};

export default Promotion;

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import {
	Box,
	TextField,
	MenuItem,
	Grid,
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
		menuState: { selected_menu, promotions },
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

	const handelPromotionChange = (value) => {
		if (value.target.value !== "none") {
			let promo = promotionsList.find((obj) => obj._id === value.target.value);

			setSelectedPromotion(promo.items);
		} else {
			setSelectedPromotion([]);
		}
	};

	return (
		<div>
			<Grid>
				<Grid item xs={12} lg={12}>
					<>
						<Grid item xs={12} lg={12} mt={2}>
							<Controller
								name={`promotion`}
								control={control}
								defaultValue=''
								render={({
									field: { onChange, value },
									fieldState: { error },
								}) => (
									<Box bgcolor='primary.light' p={0} sx={{ width: "25%" }}>
										<TextField
											select
											name={`promotion`}
											id='promotionInput'
											value={value}
											label='Promotion'
											onChange={(value) => {
												console.log("promo", value);
												onChange(value), handelPromotionChange(value);
											}}
											size='small'
											error={!!error}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												width: "100%",
												border: "1px solid",
											}}
										>
											<MenuItem value='none'>None</MenuItem>

											{promotionsList.map((item) => (
												<MenuItem key={item._id} value={item._id}>
													{item.promotion}
												</MenuItem>
											))}
										</TextField>
									</Box>
								)}
							/>
						</Grid>
						{selectedPromotion.length > 0 ? (
							<Grid item xs={12} lg={12} mt={2}>
								{/* Promotion Items */}
								<Box className={classes.root}>
									<ImageList
										className={classes.imageList}
										cols={6}
										rowHeight={100}
										gap={10}
										fullwidth="true"
									>
										{selectedPromotion.map((item) => (
											<ImageListItem key={item.id}>
												<img
													srcSet={`${item.image}?w=164&fit=crop&auto=format&dpr=2 2x`}
													src={`${item.image}?w=164&fit=crop&auto=format`}
													alt={item.name}
													loading='lazy'
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
				</Grid>
			</Grid>
		</div>
	);
};

export default Promotion;

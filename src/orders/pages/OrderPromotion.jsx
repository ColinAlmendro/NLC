import React, { useState, useEffect } from "react";
import {
	//Typography,
	//Box,
	Stack,
	//TextField,
	//Button,
	List,
	//ListItem,
	//ListItemText,
	//ListItemButton,
	//ListSubheader,
	Grid,
	//GridItem,
	//Card,
	//CardMedia,
	//CircularProgress,
	//Collapse,
} from "@mui/material";
//import ExpandLess from "@mui/icons-material/ExpandLess";
//import ExpandMore from "@mui/icons-material/ExpandMore";
import { useMenuValue } from "../../shared/context/MenuProvider.js";

import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { DevTool } from "@hookform/devtools";
import MenuItem from "./MenuItem.js";
import "./Listitem.css";

const OrderPromotion = ({weekday}) => {
	const { control } = useFormContext();
	const {
		menuState: {
			menus,
			promotions,
			selected_menu,
		},
		dispatch,
	} = useMenuValue();
const [promotionsList, setPromotionsList] = useState(promotions);
	const [record, setRecord] = useState(selected_menu[0]);
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


	// console.log("selectedrecord", record);
	// console.log("selectedpromo", selectedPromotion);


	return (
		<Grid item xs={12} lg={12}>
			<Stack>
				<Grid item xs={12} lg={12}>
					<Controller
						name={weekday}
						control={control}
						render={({ fieldState: { error } }) => (
							<>
								<List label='Promotion Items'>
									{selectedPromotion.map((item, i) => {
										return (
											<MenuItem data={item} id={i} key={i} day={weekday} />
										);
									})}
								</List>				
							</>
						)}
					/>
				</Grid>
			</Stack>
		</Grid>
	);
};

export default OrderPromotion;

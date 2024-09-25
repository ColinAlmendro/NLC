import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Promotion from "./Promotion.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
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
} from "@mui/material";

//import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useValue } from "../../shared/context/SettingsProvider.js";

const Intro = (isEdit) => {
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

	const { state } = useValue(); //app state
	const [record, setRecord] = useState(selected_menu[0]);

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
		console.log("getValues_date", week);
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
	return (
		<>
			<Grid item xs={3} lg={3}></Grid>
			<Grid item xs={6} lg={6}>
				<Stack direction='row' spacing={2}>
					<Box
						sx={{
							mx: "auto",
							my: "auto",
							fontWeight: "700",
							textAlign: "center",
							pt: 2,
							mt: 2,
						}}
					>
						<Typography>
							<Box sx={{ fontWeight: "bold" }}>Menu Date</Box>
						</Typography>
					</Box>
					<Box
						sx={{
							"& .MuiTextField-root": {
								width: 200,
							},
							mx: "auto",
							mb: 2,
						}}
					>
						<Controller
							name='date'
							control={control}
							render={({
								field: { onChange, value },
								fieldState: { error },
							}) => {
								console.log("datevalue", value);
								return (
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											variant='inline'
											format='dd MMMM yyyy'
											minDate={new Date()}
											value={new Date(value)}
											onChange={(date) => {
												onChange(date);
												setSelectedDate(date);
											}}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "none",
												mb: 2,
											}}
											InputProps={{
												inputProps: {
													style: {
														backgroundColor: "#E4E4F6",
													},
												},
											}}
											// helperText={`${error?.message ? error?.message : ""}`}
											// error={!!error}
										/>
										{/* )}
							/> */}
									</LocalizationProvider>
								);
							}}
						/>
					</Box>
				</Stack>
			</Grid>
			<Grid item xs={3} lg={3}></Grid>

			{/* 7777777777777777777777777777777777777777777777777777777777777777777777777777777777 */}
			<Grid item xs={4} lg={4}></Grid>
			<Grid item xs={4} lg={4}>
				{state.menu_logo && (
					<Box
						sx={{
							"& fieldset": { border: "none" },
							"& .MuiInputBase-root": {
								"& input": {
									textAlign: "left",
								},
							},
							border: "none",
							// width: "100px",
						}}
					>
						<Card sx={{ maxWidth: 300 }}>
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
			<Grid item xs={4} lg={4}></Grid>
			<Grid item xs={4} lg={4}>
				<Typography>
					<Box sx={{ fontWeight: "bold" }}>
						{`${state.contact_name} ~ ${state.contact_cellphone} ~ WhatsApp`}
					</Box>
				</Typography>
			</Grid>
			<Grid item xs={4} lg={4}></Grid>

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
							width: "80%",
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
					bgcolor='primary.light'
					p={0}
					border='none'
					sx={{
						"& fieldset": { border: "none" },
						"& .MuiBox-root": {
							width: 100,
							border: "none",
						},
					}}
				>
					<Controller
						name='introduction'
						control={control}
						render={({ field: { onChange, value }, fieldState: { error } }) => {
							return (
								<TextField
									type='text'
									onChange={onChange}
									value={value}
									defaultValue={value ? value : ""}
									label='Introduction'
									size='small'
									// helperText={`${error?.message ? error?.message : ""}`}
									// error={!!error}
									fullWidth
									minRows={9}
									multiline='true'
									required
								/>
							);
						}}
					/>
				</Box>
			</Grid>

			{/* ***********************************************    PROMOTION**** */}
			<Grid item xs={12} lg={12}>
				{/* <Box
					sx={{
						mx: "auto",
						fontWeight: "700",
						textAlign: "center",
						p: 1,
						m: 1,
					}}
				>
					~ PROMOTION ~
				</Box> */}
				<Promotion />
			</Grid>

			{/* ************************************************      PERIOD */}
			<Grid item xs={3} lg={3}></Grid>
			<Grid item xs={6} lg={6}>
				<Stack spacing={2}>
					<Box
						sx={{
							mx: "auto",
							fontWeight: "700",
							textAlign: "center",
							p: 1,
							m: 1,
						}}
					>
						{period}
					</Box>
					<Box
						sx={{
							mx: "auto",
							fontWeight: "700",
							textAlign: "center",
							p: 1,
							m: 1,
						}}
					>
						{instruction}
					</Box>
				</Stack>
			</Grid>
			<Grid item xs={3} lg={3}></Grid>
		</>
	);
};

export default Intro;

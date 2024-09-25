import React, { useState, useEffect, useContext } from "react";
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

import Intro from "./Intro.jsx";
import Day from "./Day.jsx";
import Extra from "./Extra.jsx";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

import * as Yup from "yup";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useValue } from "../../shared/context/SettingsProvider.js";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";
import {
	FormProvider,
	useFormContext,
	useForm,
	useFieldArray,
	Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

import "./Listitem.css";

const validationSchema = Yup.object()
	.shape({})
	.required();

function MenuForm(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const history = useNavigate();
	const { openPopup, setOpenPopup } = props;
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
			period,
			introduction,
			promotions,
		},
		dispatchMenu,
	} = useMenuValue();

	const { state } = useValue(); //app state
	const [record, setRecord] = useState(selected_menu[0]);
	const [open, setOpen] = useState(false);

	let defaultMenu = {};
	if (record) {
		console.log("ISrecordY", record);
		defaultMenu = {
			...record,
			logo: state.logo,
			image: state.image,
			contact: state.contact,
		};
	} else {
		console.log("ISrecordN", record);
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
			vegies: [],
			salads: [],
			soups: [],
			sides: [],
			note: "",
		};
	}
	// console.log("defaultmenu",defaultMenu)
	const formProps = useForm({
		defaultValues: defaultMenu,
		resolver: yupResolver(validationSchema),
		mode: "all",
	});
	const {
		register,
		handleSubmit,
		formState,
		control,
		reset,
		watch,
		setValue,
		getValues,
	} = formProps;

	const {
		errors,
		touchedFields,
		dirtyFields,
		isDirty,
		isValid,
		isSubmitting,
		isSubmitted,
		isSubmitSuccessful,
		submitCount,
	} = formState;

	const onSubmit = async (data) => {
		console.log("clicked", data);

		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/menus/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",

							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify({
							date: data.date,
							introduction: data.introduction,
							promotion: data.promotion,
							monday: data.monday,
							tuesday: data.tuesday,
							wednesday: data.wednesday,
							thursday: data.thursday,
							friday: data.friday,
							vegies: data.vegies,
							salads: data.salads,
							soups: data.soups,
							sides: data.sides,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
					console.log("response error", dataEdit.message);
					return data;
				}
				console.log("UpDate", data);

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/menus");
				alert("Menu updated");
				return data.menus;
			} catch (err) {
				console.log("Update err:", err);
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				console.log("in new submit");

				const responseNew = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/menus/new",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
						body: JSON.stringify({
							date: data.date,
							introduction: data.introduction,
							promotion: data.promotion,
							monday: data.monday,
							tuesday: data.tuesday,
							wednesday: data.wednesday,
							thursday: data.thursday,
							friday: data.friday,
							vegies: data.vegies,
							salads: data.salads,
							soups: data.soups,
							sides: data.sides,
						}),
					}
				);
				const dataNew = await responseNew.json();
				console.log("ret data", dataNew);

				setIsLoading(false);
				history("/menus");
				alert("New menu added");
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				console.log("SubmitNew err:", err);
				setIsLoading(false);
			}
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
			{/* <Dialog
				open={open}
				onClose={() => {
					setOpen(false), setOpenPopup(false);
				}}
				aria-labelledby='dialog-title'
				aria-describedby='dialog-description'
				fullWidth
				maxWidth='lg'
			>
				<DialogContent>
					<DialogActions></DialogActions> */}

			{/* // 55555555555555555555555555555555555555555555555555555555555555555555555555555555555 */}
			<Container sx={{ border: "none" }}>
				<Paper>
					{isLoading && <LoadingSpinner asOverlay />}

					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={0}
									sx={{ border: "none" }} //1px solid
								>
									<Grid item xs={12} lg={12}>
										<Stack direction='row' sx={{ justifyContent: "right" }}>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												variant='outlined'
												color='error'
												autoFocus
												onClick={() => {
													setOpen(false), setOpenPopup(false);
												}}
											>
												Cancel
											</Button>
											<Button
												// form='menuForm'
												sx={{ display: "flex", gap: "1rem" }}
												variant='outlined'
												color='success'
												type='submit'
												// onClick={() => {
												// 	onSubmit();
												// }}
											>
												Save
											</Button>
										</Stack>
									</Grid>
									<Intro />

									{/* ************************************************      PRICELIST */}
									<Grid item xs={12} lg={12}>
										<List>
											{prices.map((price, i) => (
												<ListItem key={i}>
													<Typography>
														<Box sx={{ fontWeight: "bold", height: "25%" }}>
															{price.item}
														</Box>
													</Typography>
												</ListItem>
											))}
										</List>
									</Grid>

									{/* ############################################################################################################################################################ */}
									<Day weekday='monday' />
									<Day weekday='tuesday' />
									<Day weekday='wednesday' />
									<Day weekday='thursday' />
									<Day weekday='friday' />
									{/* ############################################################################################################################################################ */}
									<Extra extra='vegies' />
									<Extra extra='salads' />
									<Extra extra='soups' />
									<Extra extra='sides' />
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
			{/* </DialogContent>
			</Dialog> */}
		</>
	);
}

export default MenuForm;

import React, { useState, useEffect, useContext } from "react";
import {
	Typography,
	Box,
	Container,
	Paper,
	Stack,
	Button,
	FormLabel,
	FormControl,
	FormGroup,
	FormControlLabel,
	Checkbox,
	List,
	ListItem,
	Grid,
	CircularProgress,
} from "@mui/material";

import Intro from "./Intro.jsx";
import Day from "./Day.jsx";
import Frozen from "./Frozen.jsx";
import Extra from "./Extra.jsx";

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

import { toast } from "sonner";

const validationSchema = Yup.object()
	.shape({})
	.required();

function MenuForm(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const history = useNavigate();
	const { openPopup, setOpenPopup } = props;
	const {
		menuState: { selected_menu },
		dispatchMenu,
	} = useMenuValue();

	const { state } = useValue(); //app state

	const [record, setRecord] = useState(selected_menu[0]);
	const [open, setOpen] = useState(false);
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

	const [chkFrozen, setChkFrozen] = useState(
		record && record.frozen.length > 0 ? true : false
	);
	const [chkFresh, setChkFresh] = useState(
		record &&
			(record.monday.length > 0 ||
				record.tuesday.length > 0 ||
				record.wednesday.length > 0 ||
				record.thursday.length > 0 ||
				record.friday.length > 0)
			? true
			: false
	);
	const [chkSide, setChkSide] = useState(
		record && record.sides.length > 0 ? true : false
	);
	const [chkVegie, setChkVegie] = useState(
		record && record.vegies.length > 0 ? true : false
	);
	const [chkSalad, setChkSalad] = useState(
		record && record.salads.length > 0 ? true : false
	);
	const [chkSoup, setChkSoup] = useState(
		record && record.soups.length > 0 ? true : false
	);

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

	const handleChkFrozen = () => {
		setChkFrozen(!chkFrozen);
	};
	const handleChkFresh = () => {
		setChkFresh(!chkFresh);
	};
	const handleChkVegie = () => {
		setChkVegie(!chkVegie);
	};
	const handleChkSalad = () => {
		setChkSalad(!chkSalad);
	};
	const handleChkSoup = () => {
		setChkSoup(!chkSoup);
	};
	const handleChkSide = () => {
		setChkSide(!chkSide);
	};

	const onSubmit = async (data) => {
		

		if (record) {
			try {
				setIsLoading(true);
				
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
							frozen: data.frozen,
							vegies: data.vegies,
							salads: data.salads,
							soups: data.soups,
							sides: data.sides,
						}),
					}
				);
				const dataEdit = await responseEdit.json();
				if (!responseEdit.ok) {
				
					toast.error(dataEdit.message, {
						style: {
							background: "red",
							color: "white",
						},
					});
					return data;
				}
			

				setIsLoading(false);

				setOpen(false);
				setOpenPopup(false);
				history("/menus");

				toast.success("Menu updated", {
					style: {
						background: "green",
						color: "white",
					},
				});
				return data.menus;
			} catch (err) {
				
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		} else {
			try {
				setIsLoading(true);
				

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
							frozen: data.frozen,
							vegies: data.vegies,
							salads: data.salads,
							soups: data.soups,
							sides: data.sides,
						}),
					}
				);
				const dataNew = await responseNew.json();
				

				setIsLoading(false);
				history("/menus");

				toast.success("New menu added", {
					style: {
						background: "green",
						color: "white",
					},
				});
				setOpen(false);
				setOpenPopup(false);
				return dataNew;
			} catch (err) {
				
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
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
			<Container sx={{ border: "none" }} >
				<Paper>
					<Box display='flex' p={2}>
						<FormProvider {...formProps}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid
									container
									rowSpacing={1}
									columnSpacing={0}
									sx={{ border: "none" }}
								>
									<Grid item xs={12} lg={12}>
										<Stack
											direction='row'
											sx={{ justifyContent: "right" }}
											spacing={1}
										>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												variant='contained'
												color='error'
												autoFocus
												onClick={() => {
													setOpen(false), setOpenPopup(false);
												}}
											>
												Cancel
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												variant='contained'
												color='success'
												type='submit'
											>
												Save
											</Button>
										</Stack>
									</Grid>
									{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&7     INTRO */}
									<Grid item xs={12} lg={12}>
										<Intro />
									</Grid>
									{/* ************************************************      PRICELIST */}
									<Grid item xs={12} lg={12}>
										<List>
											{prices.map((price, i) => (
												<ListItem key={i}>
													<Typography component='div'>
														<Box sx={{ fontWeight: "bold", height: "25%" }}>
															{price.value}
														</Box>
													</Typography>
												</ListItem>
											))}
										</List>
									</Grid>

									{/* ############################################################################################################################################################ */}
									<Box>
										<FormControl
											component='fieldset'
											sx={{ m: 3 }}
											variant='standard'
										>
											<FormLabel>
												<Typography fontWeight='500' variant='h6'>
													Display Options
												</Typography>
											</FormLabel>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															checked={chkFrozen}
															onChange={handleChkFrozen}
															name='chkFrozen'
														/>
													}
													label='Frozen Meals'
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={chkFresh}
															onChange={handleChkFresh}
															name='chkFresh'
														/>
													}
													label='Fresh Meals'
												/>

												<FormControlLabel
													control={
														<Checkbox
															checked={chkVegie}
															onChange={handleChkVegie}
															name='chkVegie'
														/>
													}
													label='Vegetables'
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={chkSalad}
															onChange={handleChkSalad}
															name='chkSalad'
														/>
													}
													label='Salads'
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={chkSoup}
															onChange={handleChkSoup}
															name='chkSoup'
														/>
													}
													label='Soups'
												/>
												<FormControlLabel
													control={
														<Checkbox
															checked={chkSide}
															onChange={handleChkSide}
															name='chkSide'
														/>
													}
													label='Side Dishes'
												/>
											</FormGroup>
										</FormControl>
									</Box>

									{/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5 */}
									{chkFrozen && (
										<>
											<Frozen weekday='frozen' />
										</>
									)}
									{chkFresh && (
										<>
											<Day weekday='monday' />
											<Day weekday='tuesday' />
											<Day weekday='wednesday' />
											<Day weekday='thursday' />
											<Day weekday='friday' />
										</>
									)}
									{/* ############################################################################################################################################################ */}
									{chkVegie && (
										<>
											<Extra extra='vegies' />
										</>
									)}
									{chkSalad && (
										<>
											<Extra extra='salads' />
										</>
									)}
									{chkSoup && (
										<>
											<Extra extra='soups' />
										</>
									)}
									{chkSide && (
										<>
											<Extra extra='sides' />
										</>
									)}
								</Grid>
							</form>
						</FormProvider>
					</Box>
					{control && <DevTool control={control} />}
				</Paper>
			</Container>
		</>
	);
}

export default MenuForm;

import React, { useState, useEffect } from "react";
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

import Intro from "./Intro";
import Week from "./Week";
import Day from "./Day";
import Extra from "./Extra";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner.js";

import * as Yup from "yup";
import { useMenuValue } from "../../shared/context/MenuProvider.js";
import { useValue } from "../../shared/context/SettingsProvider.js";

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

function MenuForm() {
	console.log("loading form");

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
			instruction,
		},
		dispatch,
	} = useMenuValue();

	// useEffect(()=>{

	// dispatch({ type: "UPDATE_MONDAY", payload:selected_menu[0].monday });
	// dispatch({ type: "UPDATE_TUESDAY", payload: selected_menu[0].tuesday });
	// dispatch({ type: "UPDATE_WEDNESDAY", payload: selected_menu[0].wednesday });
	// dispatch({ type: "UPDATE_THURSDAY", payload: selected_menu[0].thursday });
	// dispatch({ type: "UPDATE_FRIDAY", payload: selected_menu[0].friday });
	// dispatch({ type: "UPDATE_INTRODUCTION", payload: selected_menu[0].introduction });
	// dispatch({ type: "UPDATE_INSTRUCTION", payload: selected_menu[0].instruction });

	// },[])

	const { state } = useValue(); //app state
	console.log("form menus", menus);

	const [record, setRecord] = useState(selected_menu[0]);
	const [open, setOpen] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// const defaultMenu: {
	// 		date: record.date,
	// 		logo: record.logo,
	// 		image: record.image,
	// 		contact: record.contact,
	// 		introduction: "",
	// 		instruction: "",
	// 		monday: [
	// 			// {
	// 			// 	image: "",
	// 			// 	main: "",
	// 			// 	mainname: "",
	// 			// 	maindescription: "",
	// 			// 	side: "",
	// 			// 	sidename: "",
	// 			// 	sidedescription: "",
	// 			// },
	// 		],
	// 		tuesday: [],
	// 		wednesday: [],
	// 		thursday: [],
	// 		friday: [],
	// 		vegies: [],
	// 		salads: [],
	// 		soups: [],
	// 		note: "",
	// 	},

	const {
		register,
		handleSubmit,
		formState,
		control,
		reset,
		watch,
		setValue,
		getValues,
	} = useForm({
		defaultValues: record,
		resolver: yupResolver(validationSchema),
		mode: "all",
	});

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
		// e.preventDefault();
		console.log("clicked", data);

		try {
			const formData = new FormData();

			// formData.append("category", data.category);
			// formData.append("name", data.name);
			// formData.append("description", data.description);
			// formData.append("ingredients", JSON.stringify(data.ingredients));
			// formData.append("instructions", data.instructions);
			// formData.append("feeds", data.feeds);
			// formData.append("url", data.url);
			// formData.append("image", data.image);
			// formData.append("cost", data.cost);
			// formData.append("price", data.price);

			// for (var [key, value] of formData.entries()) {
			// 	console.log("formData »", key, value);
			// }

			const responseData = await sendRequest(
				process.env.REACT_APP_BACKEND_URL + "/menus/new",
				"POST",
				formData
			);

			alert("New menu added");
			// history("/menus/list");
		} catch (err) {}
	};

	return (
		<>
			{/* <Button onClick={() => setOpen(true)}>Edit App Settings</Button> */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='dialog-title'
				aria-describedby='dialog-description'
				fullWidth
				maxWidth='lg'
			>
				<DialogContent>
					<DialogActions>
						<Button
							sx={{ display: "flex", gap: "1rem" }}
							variant='contained'
							color='error'
							autoFocus
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button
							sx={{ display: "flex", gap: "1rem" }}
							variant='contained'
							color='success'
							onClick={() => {
								handleSubmit(), setOpen(false);
							}}
						>
							Save
						</Button>
					</DialogActions>

					{/* // 55555555555555555555555555555555555555555555555555555555555555555555555555555555555 */}
					<Container sx={{ border: "none" }}>
						<Paper>
							{isLoading && <LoadingSpinner asOverlay />}

							<Box display='flex' p={2}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Grid
										container
										rowSpacing={1}
										columnSpacing={0}
										sx={{ border: "none" }} //1px solid
									>
										<Week />
										<Intro />

										{/* ************************************************      PRICELIST */}
										<Grid item xs={12} lg={12}>
											<List dense='true'>
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

										{/* <Grid item xs={9}>
								<div>
										<Controls.Button type='submit' text='Submit' />
										<Controls.Button
											text='Reset'
											color='primary'
											onClick={resetForm}
										/>
									</div>
								</Grid> */}
									</Grid>
								</form>
							</Box>
							{control && <DevTool control={control} />}
						</Paper>
					</Container>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default MenuForm;

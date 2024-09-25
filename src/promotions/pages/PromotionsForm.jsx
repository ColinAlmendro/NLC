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
	IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
// import { NumericFormat } from "react-number-format";
import * as Yup from "yup";
import { usePromotionsValue } from "../../shared/context/PromotionsProvider.js";
import { AuthContext } from "../../shared/context/auth-context.js";
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
import { File } from "buffer";

const validationSchema = Yup.object()
	.shape({})
	.required();

function PromotionsForm(props) {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const { openPopup, setOpenPopup } = props;
	const [open, setOpen] = useState(false);
	const {
		promotionsState: { promotions, selected_promotion },
		dispatch,
	} = usePromotionsValue();

	const [record, setRecord] = useState(selected_promotion[0]);

	const [promoImage, setPromoImage] = useState(null);
	const [promoImagePreview, setPromoImagePreview] = useState(null);
	const [addItemDisabled, setAddItemDisabled] = useState(true);
	const history = useNavigate();

	let defaultPromotion = {};
	if (record) {
		console.log("ISrecordY", record);
		defaultPromotion = {
			...record,
		};
	} else {
		console.log("ISrecordN", record);
		defaultPromotion = {
			promotion: "",
			items: [],
		};
	}
	// console.log("defaultPromotion",defaultPromotion)
	const formProps = useForm({
		defaultValues: defaultPromotion,
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

	const { fields, append, remove } = useFieldArray({
		control,
		name: `items`,
	});
	//console.log("xtra record",record)

	const [promoItem, setPromoItem] = useState({
		image: "",
		name: "",
		description: "",
		volume: "",
		price: "",
	});
	//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	const handelImageChange = (event) => {
		let file = event.target.files[0];
	//	console.log("handlechangefile:", file);
		if (file) {
			let reader = new FileReader();
			reader.onloadend = () => {
				setPromoImage(reader.result), setPromoImagePreview(file),
				uploadFile(file);

				setPromoItem({
					...promoItem,
					image: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setPromoImagePreview(null),
				setPromoItem({
					...promoItem,
					image: null,
				});
		}
	};

	
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	const uploadFile = async (file) => {
		setIsLoading(true);
		try {
			let imageUrl;
			// console.log("file:", file);
			const imgFile = new FormData();
			imgFile.append("file", file);
			imgFile.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
			imgFile.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

			for (var [key, value] of imgFile.entries()) {
				console.log("imgFile »", key, value);
			}

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
				{
					method: "post",
					body: imgFile,
				}
			);
			const imgData = await response.json();

			imageUrl = imgData.url.toString();
			console.log("cloudinary url:", imageUrl);
			setPromoItem({
				...promoItem,
				image: imageUrl,
			});
			setIsLoading(false);
			return imageUrl;
		} catch (error) {
			console.log("cloudinary upload error:", error);
			setIsLoading(false);
		}
	};

	const onSubmit = async (data) => {
		// e.preventDefault();
		console.log("clicked", data);


		if (record) {
			try {
				setIsLoading(true);
				console.log("in edit submit");
				const responseEdit = await fetch(
					process.env.REACT_APP_BACKEND_URL + `/promotions/edit/${record._id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},

						body: JSON.stringify({
							promotion: data.promotion,
							items: data.items,
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
				history("/promotions");
				alert("Promotion updated");
				return data.promotions;
			} catch (err) {
				console.log("Update err:", err);
				setIsLoading(false);
			}
		} else {
			try {
						setIsLoading(true);
						console.log("in new submit");

						const responseNew = await fetch(
							process.env.REACT_APP_BACKEND_URL + "/promotions/new",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									Authorization: "Bearer " + auth.token,
								},
							
								body: JSON.stringify({
									promotion: data.promotion,
									items: data.items,
								}),
							}
						);
						const dataNew = await responseNew.json();
						console.log("ret data", dataNew);

						setIsLoading(false);
						history("/promotions");
						alert("New promotion added");
						setOpen(false);
						setOpenPopup(false);
						return dataNew;
					} catch (err) {
				console.log("SubmitNew err:", err);
				setIsLoading(false);
			}
		}

		// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
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
														Promotion
													</Typography>
												</Box>
											</Grid>
											<Grid item xs={12} lg={2}>
												<Stack direction='row'>
													<Button
														sx={{ gap: "1rem" }}
														// width='100px'
														variant='outlined'
														color='error'
														autoFocus
														onClick={() => {
															setOpenPopup(false);
															setOpen(false); // ,
														}}
													>
														Cancel
													</Button>
													<Button
														sx={{ display: "flex", gap: "1rem" }}
														// width='100px'
														variant='outlined'
														color='success'
														type='submit'
													>
														Save
													</Button>
												</Stack>
											</Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 6 }} />
									<Grid item xs={12} lg={12}>
										<Stack direction='row' sx={{ justifyContent: "center" }}>
											<Grid item xs={12} lg={2}></Grid>
											<Grid item xs={12} lg={8}>
												<Controller
													name='promotion'
													control={control}
													render={({
														field: { onChange, value },
														fieldState: { error },
													}) => {
														return (
															<TextField
																type='text'
																onChange={onChange}
																value={value}
																//	defaultValue={value ? value : ""}
																label='Promotion Name'
																size='small'
																// helperText={`${error?.message ? error?.message : ""}`}
																// error={!!error}
																fullWidth
																required
															/>
														);
													}}
												/>
												{/* </Box> */}
											</Grid>
											<Grid item xs={12} lg={2}></Grid>
										</Stack>
									</Grid>
									<Divider sx={{ my: 6 }} />
									{/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&              NEW ITEM INPUT */}
									<Grid item xs={12} lg={12}>
										<Stack direction='row'>
											<Grid item xs={12} lg={2}>
												<Stack>
													<Grid item xs={12} lg={12}>
														{promoImage && (
															<Box
																sx={{
																	"& fieldset": { border: "none" },
																	"& .MuiInputBase-root": {
																		"& input": {
																			textAlign: "left",
																		},
																	},
																	border: "none",
																	width: "100px",
																}}
															>
																<Card sx={{ maxWidth: 150 }}>
																	<CardMedia
																		component='img'
																		image={promoImage}
																		alt='Image'
																	/>
																</Card>
															</Box>
														)}
													</Grid>
													<Grid item xs={12} lg={12}>
														<div class='custom-file-upload'>
															<label for='inputPromoImage'>Choose Image</label>
															<TextField
																id='inputPromoImage'
																class='hidden-file-input'
																sx={{
																	"& fieldset": { border: "none" },
																	"& .MuiInputBase-root": {
																		"& input": {
																			textAlign: "left",
																		},
																	},
																	border: "none",
																}}
																onChange={(event) => {
																	handelImageChange(event);
																	//	toggleAddItemButton();
																}}
																type='file'
															/>
														</div>
													</Grid>
												</Stack>
											</Grid>
											<Grid item xs={12} lg={8}>
												<Stack>
													<TextField
														name='name'
														control={control}
														label='Name'
														value={promoItem.name}
														onChange={(e) => {
															setPromoItem({
																...promoItem,
																name: e.target.value,
															});
															//toggleAddItemButton();
														}}
														size='small'
														fullWidth
													/>
													<TextField
														name='description'
														control={control}
														label='Description'
														value={promoItem.description}
														onChange={(e) => {
															setPromoItem({
																...promoItem,
																description: e.target.value,
															});
															//toggleAddItemButton();
														}}
														size='small'
														fullWidth
														minRows={3}
														multiline
													/>
													<Stack direction='row'>
														<TextField
															name='volume'
															control={control}
															label='Volume'
															value={promoItem.volume}
															onChange={(e) => {
																setPromoItem({
																	...promoItem,
																	volume: e.target.value,
																});
																//toggleAddItemButton();
															}}
															size='small'
															fullWidth
														/>
														<TextField
															name='price'
															control={control}
															label='Price'
															value={promoItem.price}
															onChange={(e) => {
																setPromoItem({
																	...promoItem,
																	price: e.target.value,
																});
																//toggleAddItemButton();
															}}
															size='small'
															fullWidth
														/>
													</Stack>
												</Stack>
											</Grid>

											<Grid item xs={12} lg={2}>
												<Box
													sx={{ padding: 2 }}
													display='flex'
													justifyContent='right'
													alignItems='right'
												>
													<Button
														sx={{
															gap: "2rem",
															align: "right",
														}}
														variant='contained'
														color='primary'
														type='button'
														onClick={() => {
															append({
																...promoItem,
															}),
																//  uploadFile(promoItem.image),
																setPromoImage(null),
																setPromoItem({
																	image: "",
																	name: "",
																	description: "",
																	volume: "",
																	price: "",
																});
															//	setAddItemDisabled(true),
															//	console.log("appendeditem", promoItem);
														}}
														disabled={
															promoItem.image === "" ||
															promoItem.name === "" ||
															promoItem.description === "" ||
															promoItem.volume === "" ||
															promoItem.price === ""
														}
													>
														Add Item
													</Button>
												</Box>
											</Grid>
										</Stack>

										{/* // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       LIST */}

										<Divider sx={{ my: 2 }} />

										<Grid item xs={12} lg={12}>
											<InputLabel>Promotion Items</InputLabel>
										</Grid>

										<Box border='1px solid'>
											<Controller
												name={`items`}
												control={control}
												render={({ fieldState: { error } }) => (
													<List>
														{fields.map(
															(
																{ image, name, description, volume, price },
																index
															) => {
																{
																	/* console.log("List", extraFields); */
																}
																return (
																	<ListItem key={index}>
																		<Grid width='95%'>
																			<Stack direction='row' width='100%'>
																				<Grid item xs={9} lg={9}>
																					<Stack>
																						<Grid item xs={9} lg={9}>
																							<Typography fontWeight='700'>
																								{name}
																							</Typography>
																						</Grid>
																						<Stack direction='row'>
																							<Grid item xs={7} lg={7}>
																								<Typography>
																									{description}
																								</Typography>
																							</Grid>
																							<Grid item xs={1} lg={1}>
																								<Typography fontWeight='300'>
																									{volume}
																								</Typography>
																							</Grid>
																							<Grid item xs={1} lg={1}>
																								<Typography fontWeight='300'>
																									{`R ${price}`}
																								</Typography>
																							</Grid>
																						</Stack>
																					</Stack>
																				</Grid>
																				<Grid item xs={3} lg={3}>
																					<Stack direction='row'>
																						<Card sx={{ width: 50, p: 0.5 }}>
																							<CardMedia
																								component='img'
																								image={image}
																								alt='Meal image'
																								height='50px'
																							/>
																						</Card>
																						<IconButton
																							sx={{
																								height: 10,
																								m: 2,
																								p: 2,
																							}}
																							size='small'
																							variant='outlined'
																							color='error'
																							type='button'
																							onClick={() => {
																								remove(index),
																									setPromoItem({
																										image: "",
																										name: "",
																										description: "",
																										volume: "",
																										price: "",
																									});
																							}}
																						>
																							<DeleteIcon />
																						</IconButton>
																					</Stack>
																				</Grid>
																			</Stack>
																		</Grid>
																	</ListItem>
																);
															}
														)}
													</List>
												)}
											/>
										</Box>
									</Grid>
									{/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
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

export default PromotionsForm;

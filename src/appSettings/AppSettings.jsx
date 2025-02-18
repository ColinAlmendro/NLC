import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../src/shared/components/UIElements/LoadingSpinner.js";

// import FieldInputSelect from "./FieldInputSelect";
import { AuthContext } from "../shared/context/auth-context";
import { useValue } from "../shared/context/SettingsProvider.js";
import Controls from "../components/controls/Controls.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../components/Notification.js";
import ConfirmDialog from "../components/ConfirmDialog.js";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

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
import { toast } from "sonner";

function AppSettings() {
	const [open, setOpen] = useState(true);
	const auth = useContext(AuthContext);
	const { state, dispatch } = useValue();
	const [appTitle, setAppTitle] = useState(state.app_title);
	const [appLogo, setAppLogo] = useState(state.app_logo);
	const [homeBgImage, setHomeBgImage] = useState(state.home_bg_image);
	const [homeLogo, setHomeLogo] = useState(state.home_logo);
	const [footerAbout, setFooterAbout] = useState(state.footer_about);
	const [contactLocation, setContactLocation] = useState(
		state.contact_location
	);
	const [contactName, setContactName] = useState(state.contact_name);
	const [contactEmail, setContactEmail] = useState(state.contact_email);
	const [contactCellphone, setContactCellphone] = useState(
		state.contact_cellphone
	);
	const [facebook, setFacebook] = useState(state.facebook);
	const [instagram, setInstagram] = useState(state.instagram);
	const [menuLogo, setMenuLogo] = useState(state.menu_logo);
	const [menuImage, setMenuImage] = useState(state.menu_image);
	const [aboutIntro, setAboutIntro] = useState(state.about_intro);
	const [aboutText, setAboutText] = useState(state.about_text);
	const [aboutImage, setAboutImage] = useState(state.about_image);

	const [appLogoPreview, setAppLogoPreview] = useState(state.app_logo);
	const [homeBgImagePreview, setHomeBgImagePreview] = useState(
		state.home_bg_image
	);
	const [homeLogoPreview, setHomeLogoPreview] = useState(state.home_logo);
	const [menuLogoPreview, setMenuLogoPreview] = useState(state.menu_logo);
	const [menuImagePreview, setMenuImagePreview] = useState(state.menu_image);
	const [aboutImagePreview, setAboutImagePreview] = useState(state.about_image);

	const [areaList, setAreaList] = useState(state.area_list);
	const [areaName, setAreaName] = useState(null);
	const [areaKM, setAreaKM] = useState(null);
	const [selectedArea, setSelectedArea] = useState("");
	const [areaRate, setAreaRate] = useState(null);

	const [recipeTypeList, setRecipeTypeList] = useState(state.recipe_type_list);
	const [recipeType, setRecipeType] = useState(null);

	const [selectedRecipeType, setSelectedRecipeType] = useState("");

	const [ingredientCategoryList, setIngredientCategoryList] = useState(
		state.ingredient_category_list
	);
	const [ingredientCategory, setIngredientCategory] = useState(null);
	const [selectedIngredientCategory, setSelectedIngredientCategory] = useState(
		""
	);
	const [aaRate, setAARate] = useState(state.aa_rate);

	const [priceList, setPriceList] = useState(state.price_list);
	const [price, setPrice] = useState(null);
	const [selectedPrice, setSelectedPrice] = useState("");

	const [disableAppTitle, setDisableAppTitle] = useState(true);
	const [disableAppLogo, setDisableAppLogo] = useState(true);
	const [disableHomeBgImage, setDisableHomeBgImage] = useState(true);
	const [disableHomeLogo, setDisableHomeLogo] = useState(true);
	const [disableContactLocation, setDisableContactLocation] = useState(true);
	const [disableContactName, setDisableContactName] = useState(true);
	const [disableContactEmail, setDisableContactEmail] = useState(true);
	const [disableContactCellphone, setDisableContactCellphone] = useState(true);
	const [disableAboutImage, setDisableAboutImage] = useState(true);
	const [disableAboutIntro, setDisableAboutIntro] = useState(true);
	const [disableAboutText, setDisableAboutText] = useState(true);
	const [disableFooterAbout, setDisableFooterAbout] = useState(true);
	const [disableMenuImage, setDisableMenuImage] = useState(true);
	const [disableMenuLogo, setDisableMenuLogo] = useState(true);
	const [disableFacebook, setDisableFacebook] = useState(true);
	const [disableInstagram, setDisableInstagram] = useState(true);
	const [disableAreaList, setDisableAreaList] = useState(true);
	const [disableRecipeTypeList, setDisableRecipeTypeList] = useState(true);
	const [
		disableIngredientCategoryList,
		setDisableIngredientCategoryList,
	] = useState(true);
	const [disablePriceList, setDisablePriceList] = useState(true);
	const [disableAARate, setDisableAARate] = useState(true);

	const [isLoading, setIsLoading] = useState(false);

	const history = useNavigate();

	const handleSubmit = async () => {
		// e.preventDefault();
		console.log("clicked", state);
		setIsLoading(true);
		const setting_id = "66b751c915895762e0718369";

		try {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + `/appsettings/edit/${setting_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},

					body: JSON.stringify({
						app_title: state.app_title,
						app_logo: state.app_logo,
						home_logo: state.home_logo,
						home_bg_image: state.home_bg_image,
						footer_about: state.footer_about,
						contact_location: state.contact_location,
						contact_name: state.contact_name,
						contact_email: state.contact_email,
						contact_cellphone: state.contact_cellphone,
						facebook: state.facebook,
						instagram: state.instagram,
						menu_logo: state.menu_logo,
						menu_image: state.menu_image,
						about_intro: state.about_intro,
						about_text: state.about_text,
						about_image: state.about_image,
						area_list: state.area_list,
						recipe_type_list: state.recipe_type_list,
						ingredient_category_list: state.ingredient_category_list,
						price_list: state.price_list,
						aa_rate: state.aa_rate,
					}),
				}
			);
			const data = await response.json();
			setIsLoading(false);
			// alert("Settings updated successfully");
			toast.success("Settings updated", {
				style: {
					background: "green",
					color: "white",
				},
			});
			return data.appSettings;
		} catch (err) {
			console.log("updateErr:", err);
			toast.error(err, {
				style: {
					background: "red",
					color: "white",
				},
			});
			setIsLoading(false);
		}
	};

	const uploadFile = async (inputName, file) => {
		setIsLoading(true);
		try {
			let imageUrl;
			console.log("file:", file);
			const imgFile = new FormData();
			imgFile.append("file", file);
			imgFile.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
			imgFile.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

			// for (var [key, value] of imgFile.entries()) {
			// 	console.log("imgFile »", key, value);
			// }

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
				{
					method: "post",
					body: imgFile,
				}
			);
			const imgData = await response.json();

			imageUrl = imgData.url.toString();

			switch (inputName) {
				case "inputAppLogo":
					setAppLogoPreview(null),
						dispatch({
							type: "UPDATE_APP_LOGO",
							payload: {
								app_logo: imageUrl,
							},
						});
					break;
				case "inputHomeBgImage":
					setAppLogoPreview(null),
						dispatch({
							type: "UPDATE_HOME_BG_IMAGE",
							payload: {
								home_bg_image: imageUrl,
							},
						});
					break;
				case "inputHomeLogo":
					setHomeLogoPreview(null),
						dispatch({
							type: "UPDATE_HOME_LOGO",
							payload: {
								home_logo: imageUrl,
							},
						});
					break;
				case "inputMenuLogo":
					setMenuLogoPreview(null),
						dispatch({
							type: "UPDATE_MENU_LOGO",
							payload: {
								menu_logo: imageUrl,
							},
						});
					break;
				case "inputMenuImage":
					setMenuImagePreview(null),
						dispatch({
							type: "UPDATE_MENU_IMAGE",
							payload: {
								menu_image: imageUrl,
							},
						});
					break;
				case "inputAboutImage":
					setAboutImagePreview(null),
						dispatch({
							type: "UPDATE_ABOUT_IMAGE",
							payload: {
								about_image: imageUrl,
							},
						});
					break;

				default:
					break;
			}
			setIsLoading(false);
			return imageUrl;
		} catch (error) {
			console.log("cloudinary upload error:", error);
			toast.error(error, {
				style: {
					background: "red",
					color: "white",
				},
			});
			setIsLoading(false);
		}
	};

	const handelImageChange = (event) => {
		let file = event.target.files[0];
		//	console.log("handlechangefile:", file);
		if (file) {
			let reader = new FileReader();
			reader.onloadend = () => {
				switch (event.target.name) {
					case "inputAppLogo":
						setAppLogo(reader.result),
							setAppLogoPreview(file),
							dispatch({
								type: "UPDATE_APP_LOGO",
								payload: {
									app_logo: reader.result,
								},
							});
						break;
					case "inputHomeBgImage":
						setHomeBgImage(reader.result),
							setHomeBgImagePreview(file),
							dispatch({
								type: "UPDATE_HOME_BG_IMAGE",
								payload: {
									home_bg_image: reader.result,
								},
							});
						break;
					case "inputHomeLogo":
						setHomeLogo(reader.result),
							setHomeLogoPreview(file),
							dispatch({
								type: "UPDATE_HOME_LOGO",
								payload: {
									home_logo: reader.result,
								},
							});
						break;
					case "inputMenuLogo":
						setMenuLogo(reader.result),
							setMenuLogoPreview(file),
							dispatch({
								type: "UPDATE_MENU_LOGO",
								payload: {
									menu_logo: reader.result,
								},
							});
						break;
					case "inputMenuImage":
						setMenuImage(reader.result),
							setMenuImagePreview(file),
							dispatch({
								type: "UPDATE_MENU_IMAGE",
								payload: {
									menu_image: reader.result,
								},
							});
						break;
					case "inputAboutImage":
						setAboutImage(reader.result),
							setAboutImagePreview(file),
							dispatch({
								type: "UPDATE_ABOUT_IMAGE",
								payload: {
									about_image: reader.result,
								},
							});
						break;
					default:
						break;
				}
			};
			reader.readAsDataURL(file);
		} else {
			switch (event.target.name) {
				case "inputAppLogo":
					setAppLogoPreview(null);
					break;
				case "inputHomeBgImage":
					setHomeBgImagePreview(null);
					break;
				case "inputHomeLogo":
					setHomeLogoPreview(null);
					break;
				case "inputMenuLogo":
					setMenuLogoPreview(null);
					break;
				case "inputMenuImage":
					setMenuImagePreview(null);
					break;
				case "inputAboutImage":
					setAboutImagePreview(null);
					break;
				default:
					break;
			}
		}
	};

	const handleAreaEdit = (e) => {
		//console.log("area ta", e.target);
		setSelectedArea(e.target.value);
		if (e.target.value === "") {
			setAreaName("");
			setAreaKM(0);
		} else {
			console.log("arealist", areaList);
			console.log("area t", e.target);

			let filteredArea = areaList;
			filteredArea = filteredArea.filter((a) => a.id === e.target.value);
			console.log("filteredArea", filteredArea);
			setAreaName(filteredArea[0].area);
			setAreaKM(filteredArea[0].delivery_km);
		}
	};

	const updateAreaList = () => {
		let arrayCopy = [];

		if (selectedArea === "") {
			const newArea = {
				area: areaName,
				delivery_km: areaKM,
				id: Math.round(Math.random() * 10),
			};
			arrayCopy = [...areaList, newArea];
		} else {
			arrayCopy = [...areaList];
			arrayCopy.map((area) => {
				if (area.id === selectedArea) {
					area.area = areaName;
					area.delivery_km = areaKM;
				}
			});
		}
		setAreaList(arrayCopy);

		dispatch({
			type: "UPDATE_AREA_LIST",
			payload: { area_list: arrayCopy },
		});
	};

	const removeArea = () => {
		const newArray = areaList.filter((item) => item.id !== selectedArea);
		setAreaList(newArray);

		dispatch({
			type: "DELETE_AREA",
			payload: { id: selectedArea },
		});

		dispatch({
			type: "UPDATE_AREA_LIST",
			payload: { area_list: newArray },
		});
	};
	// //////////////////////////////////////////////////////////////////////////

	const handleRecipeTypeEdit = (e) => {
		console.log("recipeTypelist", recipeTypeList);
		console.log("area ta", e.target);
		setSelectedRecipeType(e.target.value);
		if (e.target.value === "") {
			setRecipeType("");
		} else {
			console.log("recipeType t", e.target);

			let filteredRecipeType = recipeTypeList;
			filteredRecipeType = filteredRecipeType.filter(
				(a) => a.value === e.target.value
			);
			console.log("filteredRecipeType", filteredRecipeType);
			setRecipeType(filteredRecipeType[0].value);
		}
	};

	const updateRecipeTypeList = () => {
		//console.log("recipeType sel", recipeType, selectedRecipeType);
		let arrayCopy = [];
		if (selectedRecipeType === "") {
			const newRecipeType = {
				value: recipeType,
				id: Math.round(Math.random() * 10),
			};
			arrayCopy = [...recipeTypeList, newRecipeType];
		} else {
			arrayCopy = [...recipeTypeList];
			arrayCopy.map((type) => {
				if (type.value === selectedRecipeType) {
					type.value = recipeType;
				}
			});
		}
		setRecipeTypeList(arrayCopy);

		dispatch({
			type: "UPDATE_RECIPE_TYPE_LIST",
			payload: { recipe_type_list: arrayCopy },
		});
	};

	const removeRecipeType = () => {
		//	console.log("selectedRecipeType", selectedRecipeType);
		const newArray = recipeTypeList.filter(
			(item) => item.value !== selectedRecipeType
		);
		setRecipeTypeList(newArray);

		dispatch({
			type: "DELETE_RECIPE_TYPE",
			payload: { id: selectedRecipeType },
		});

		dispatch({
			type: "UPDATE_RECIPE_TYPE_LIST",
			payload: { recipe_type_list: newArray },
		});
	};

	// //////////////////////////////////////////////////////////////////////////

	const handleIngredientCategoryEdit = (e) => {
		console.log("ingredientCategorylist", ingredientCategoryList);
		console.log("selectedcategory", e.target);
		setSelectedIngredientCategory(e.target.value);
		if (e.target.value === "") {
			setIngredientCategory("");
		} else {
			console.log("ingredientCategory t", e.target);

			let filteredIngredientCategory = ingredientCategoryList;
			filteredIngredientCategory = filteredIngredientCategory.filter(
				(a) => a.value === e.target.value
			);
			console.log("filteredIngredientCategory", filteredIngredientCategory);
			setIngredientCategory(filteredIngredientCategory[0].value);
		}
	};

	const updateIngredientCategoryList = () => {
		let arrayCopy = [];
		if (selectedIngredientCategory === "") {
			const newIngredientCategory = {
				value: ingredientCategory,
				id: Math.round(Math.random() * 10),
			};
			arrayCopy = [...ingredientCategoryList, newIngredientCategory];
		} else {
			arrayCopy = [...ingredientCategoryList];
			arrayCopy.map((category) => {
				if (category.value === selectedIngredientCategory) {
					category.value = ingredientCategory;
				}
			});
		}
		setIngredientCategoryList(arrayCopy);

		dispatch({
			type: "UPDATE_INGREDIENT_CATEGORY_LIST",
			payload: { ingredient_category_list: arrayCopy },
		});
	};

	const removeIngredientCategory = () => {
		//	console.log("selectedIngredientCategory", selectedIngredientCategory);
		const newArray = ingredientCategoryList.filter(
			(item) => item.value !== selectedIngredientCategory
		);
		setIngredientCategoryList(newArray);

		dispatch({
			type: "DELETE_INGREDIENT_CATEGORY",
			payload: { id: selectedIngredientCategory },
		});

		dispatch({
			type: "UPDATE_INGREDIENT_CATEGORY_LIST",
			payload: { ingredient_category_list: newArray },
		});
	};
	// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	const handlePriceEdit = (e) => {
		console.log("price val", e.target.value);
		setSelectedPrice(e.target.value);
		if (e.target.value === "") {
			setPrice("");
		} else {
			console.log("pricelist", priceList);
			console.log("price t", e.target);

			let filteredPrice = priceList;
			filteredPrice = filteredPrice.filter((a) => a.value === e.target.value);
			console.log("filteredPrice", filteredPrice);
			setPrice(filteredPrice[0].value);
		}
	};

	const updatePriceList = () => {
		let arrayCopy = [];
		console.log("UselectedPrice", selectedPrice);
		if (selectedPrice === "") {
			const newPrice = {
				value: price,
				id: Math.round(Math.random() * 10),
			};
			arrayCopy = [...priceList, newPrice];
		} else {
			arrayCopy = [...priceList];
			arrayCopy.map((price) => {
				if (price.value === selectedPrice) {
					price.value = price;
				}
			});
		}
		setPriceList(arrayCopy);

		dispatch({
			type: "UPDATE_PRICE_LIST",
			payload: { price_list: arrayCopy },
		});
	};

	const removePrice = () => {
		const newArray = priceList.filter((item) => item.value !== selectedPrice);
		setPriceList(newArray);

		dispatch({
			type: "DELETE_PRICE",
			payload: { id: selectedPrice },
		});

		dispatch({
			type: "UPDATE_PRICE_LIST",
			payload: { price_list: newArray },
		});
	};
	// //////////////////////////////////////////////////////////////////////////

	return (
		<>
			<Container sx={{ border: "none" }}>
				<Paper>
					{isLoading && <LoadingSpinner asOverlay />}
					<Box display='flex' p={2}>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={0}
							sx={{ border: "none" }} //1px solid
						>
							{/************************************************************** APPLICATION */}

							{/* 55555555555555555555555555555555555555555555555555555 */}
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
												App Settings
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={12} lg={2}>
										<Stack direction='row'>
											<Button
												sx={{ gap: "1rem" }}
												variant='outlined'
												color='error'
												autoFocus
												onClick={() => {
													history("/home");
												}}
											>
												Cancel
											</Button>
											<Button
												sx={{ display: "flex", gap: "1rem" }}
												// width='100px'
												variant='outlined'
												color='success'
												// type='submit'
												onClick={() => {
													handleSubmit();
												}}
											>
												Save
											</Button>
										</Stack>
									</Grid>
								</Stack>
							</Grid>

							{/* 55555555555555555555555555555555555555555555555555555 */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Application
								</Typography>
							</FormLabel>

							<Grid
								container
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Title</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableAppTitle}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='app_title'
											value={appTitle}
											onChange={(e) => setAppTitle(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableAppTitle ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableAppTitle(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableAppTitle}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableAppTitle(true),
													setAppTitle(state.app_title),
													setIsLoading(false);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableAppTitle}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												// setIsLoading(true),
												dispatch({
													type: "UPDATE_APP_TITLE",
													payload: { app_title: appTitle },
												}),
													setDisableAppTitle(true);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>Logo</InputLabel>
									{appLogo && (
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
													image={appLogo}
													alt='App Logo'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputAppLogo'
										disabled={disableAppLogo}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableAppLogo ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableAppLogo(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableAppLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableAppLogo(true), setAppLogo(state.app_logo);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableAppLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputAppLogo", appLogoPreview),
													setDisableAppLogo(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>
							<Divider sx={{ mt: 2 }} />
							{/************************************************************** CONTACT DETAILS  */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Contact Details
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Location</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableContactLocation}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='contact_location'
											value={contactLocation}
											onChange={(e) => setContactLocation(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableContactLocation ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableContactLocation(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableContactLocation}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableContactLocation(true),
													setContactLocation(state.contact_location);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableContactLocation}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												setIsLoading(true),
													dispatch({
														type: "UPDATE_CONTACT_LOCATION",
														payload: { contact_location: contactLocation },
													}),
													setDisableContactLocation(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Name</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableContactName}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='contact_name'
											value={contactName}
											onChange={(e) => setContactName(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableContactName ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableContactName(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableContactName}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableContactName(true),
													setContactName(state.contact_name);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableContactName}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												setIsLoading(true),
													dispatch({
														type: "UPDATE_CONTACT_NAME",
														payload: { contact_name: contactName },
													}),
													setDisableContactName(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Email</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableContactEmail}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='contact_email'
											value={contactEmail}
											onChange={(e) => setContactEmail(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableContactEmail ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableContactEmail(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableContactEmail}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableContactEmail(true),
													setContactEmail(state.contact_email);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableContactEmail}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												setIsLoading(true),
													dispatch({
														type: "UPDATE_CONTACT_EMAIL",
														payload: { contact_email: contactEmail },
													}),
													setDisableContactEmail(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Cellphone</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableContactCellphone}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='contact_cellphone'
											value={contactCellphone}
											onChange={(e) => setContactCellphone(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableContactCellphone ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableContactCellphone(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableContactCellphone}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableContactCellphone(true),
													setContactCellphone(state.contact_cellphone);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableContactCellphone}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												setIsLoading(true),
													dispatch({
														type: "UPDATE_CONTACT_CELLPHONE",
														payload: { contact_cellphone: contactCellphone },
													}),
													setDisableContactCellphone(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>
							<Divider sx={{ mt: 2 }} />
							{/************************************************************* HOME PAGE  */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									HomePage
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>
										Background Image
									</InputLabel>
									{homeBgImage && (
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
													image={homeBgImage}
													alt='Background Image'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputHomeBgImage'
										disabled={disableHomeBgImage}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableHomeBgImage ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableHomeBgImage(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableHomeBgImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableHomeBgImage(true),
													setHomeBgImage(state.home_bg_image);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableHomeBgImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputHomeBgImage", homeBgImagePreview),
													setDisableHomeBgImage(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>Logo</InputLabel>
									{homeLogo && (
										<Box
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
												width: "none",
											}}
										>
											<Card sx={{ maxWidth: 150 }}>
												<CardMedia
													component='img'
													image={homeLogo}
													alt='Home Logo'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputHomeLogo'
										disabled={disableHomeLogo}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableHomeLogo ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableHomeLogo(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableHomeLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableHomeLogo(true), setHomeLogo(state.home_logo);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableHomeLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputHomeLogo", homeLogoPreview),
													setDisableHomeLogo(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Divider sx={{ mt: 2 }} />
							{/*********************************************************** ABOUT PAGE  */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									About Page
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>Image</InputLabel>
									{aboutImage && (
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
													image={aboutImage}
													alt='About Image'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputAboutImage'
										disabled={disableAboutImage}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableAboutImage ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableAboutImage(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableAboutImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableAboutImage(true),
													setAboutImage(state.about_image);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableAboutImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputAboutImage", aboutImagePreview),
													setDisableAboutImage(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>
										Introduction
									</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableAboutIntro}
											multiline
											maxRows={5}
											minRows={5}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='about_intro'
											value={aboutIntro}
											onChange={(e) => setAboutIntro(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableAboutIntro ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableAboutIntro(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableAboutIntro}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableAboutIntro(true),
													setAboutIntro(state.about_intro);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableAboutIntro}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												// setIsLoading(true),
												dispatch({
													type: "UPDATE_ABOUT_INTRO",
													payload: { about_intro: aboutIntro },
												}),
													setDisableAboutIntro(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Content</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableAboutText}
											multiline
											maxRows={5}
											minRows={5}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='about_text'
											value={aboutText}
											onChange={(e) => setAboutText(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableAboutText ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableAboutText(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableAboutText}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableAboutText(true),
													setAboutText(state.about_text);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableAboutText}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												// setIsLoading(true),
												dispatch({
													type: "UPDATE_ABOUT_TEXT",
													payload: { about_text: aboutText },
												}),
													setDisableAboutText(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>
							<Divider sx={{ mt: 2 }} />
							{/************************************************************** HOME PAGE  */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Menu Layout
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>Image</InputLabel>
									{menuImage && (
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
													image={menuImage}
													alt='Menu Image'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputMenuImage'
										disabled={disableMenuImage}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableMenuImage ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableMenuImage(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableMenuImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableMenuImage(true),
													setMenuImage(state.menu_image);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableMenuImage}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputMenuImage", menuImagePreview),
													setDisableMenuImage(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={4} lg={2}>
									<InputLabel sx={{ textAlign: "left" }}>Logo</InputLabel>
									{menuLogo && (
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
													image={menuLogo}
													alt='Menu Logo'
												/>
											</Card>
										</Box>
									)}
								</Grid>
								<Grid item xs={8} lg={7}>
									<TextField
										name='inputMenuLogo'
										disabled={disableMenuLogo}
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
										}}
										type='file'
									/>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableMenuLogo ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableMenuLogo(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableMenuLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableMenuLogo(true), setMenuLogo(state.menu_logo);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableMenuLogo}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												uploadFile("inputMenuLogo", menuLogoPreview),
													setDisableMenuLogo(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Divider sx={{ mt: 2 }} />
							{/***************************************************************** FOOTER */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Footer
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>About</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableFooterAbout}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='footer_about'
											value={footerAbout}
											onChange={(e) => setFooterAbout(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableFooterAbout ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableFooterAbout(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableFooterAbout}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableFooterAbout(true),
													setFooterAbout(state.footer_about);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableFooterAbout}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												setIsLoading(true),
													dispatch({
														type: "UPDATE_FOOTER_ABOUT",
														payload: { footer_about: footerAbout },
													}),
													setDisableFooterAbout(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Divider sx={{ mt: 2 }} />
							{/************************************************************** MEDIA LINKS  */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Media Links
								</Typography>
							</FormLabel>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Facebook</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableFacebook}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='facebook'
											value={facebook}
											onChange={(e) => setFacebook(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableFacebook ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableFacebook(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableFacebook}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableFacebook(true), setFacebook(state.facebook);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableFacebook}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												// setIsLoading(true),
												dispatch({
													type: "UPDATE_FACEBOOK",
													payload: { facebook: facebook },
												}),
													setDisableFacebook(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>Instagram</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableInstagram}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='instagram'
											value={instagram}
											onChange={(e) => setInstagram(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Button
											disabled={disableInstagram ? false : true}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											onClick={() => {
												setDisableInstagram(false);
											}}
											size='small'
										>
											Edit
										</Button>
										<Button
											disabled={disableInstagram}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='error'
											onClick={() => {
												setDisableInstagram(true),
													setInstagram(state.instagram);
											}}
											size='small'
										>
											Cancel
										</Button>
										<Button
											disabled={disableInstagram}
											sx={{ display: "flex", gap: "1rem" }}
											variant='contained'
											color='success'
											onClick={() => {
												// setIsLoading(true),
												dispatch({
													type: "UPDATE_INSTAGRAM",
													payload: { instagram: instagram },
												}),
													setDisableInstagram(true),
													setIsLoading(false);
											}}
											size='small'
										>
											Save
										</Button>
									</Stack>
								</Grid>
							</Grid>

							<Divider sx={{ mt: 2 }} />

							{/* 888888888888888888888888888888888888888888888888888888888888888888888888888888 AA Rate */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									AA Rate
								</Typography>
							</FormLabel>
							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={12} lg={9}>
									<InputLabel sx={{ textAlign: "left" }}>AA Rate</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											disabled={disableAARate}
											type='number'
											inputProps={{ step: "0.1", lang: "en-US" }}
											sx={{
												"& fieldset": { border: "none" },
												"& .MuiInputBase-root": {
													"& input": {
														textAlign: "left",
													},
												},
												border: "1px solid",
											}}
											name='aa_rate'
											value={aaRate}
											onChange={(e) => setAARate(e.target.value)}
											fullWidth
										/>
									</Box>
								</Grid>

								<Grid item xs={12} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Controls.ActionButton
											disabled={disableAARate ? false : true}
											color='primary'
											onClick={() => {
												setDisableAARate(false);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableAARate}
											color='primary'
											onClick={() => {
												    setDisableAARate(true),
													setAARate(state.aa_rate);
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableAARate}
											color='primary'
											onClick={() => {
												dispatch({
													type: "UPDATE_AA_RATE",
													payload: { aa_rate: aaRate },
												}),
													setDisableAARate(true),
													setIsLoading(false);
											}}
											
										>
											<SaveIcon fontSize='small' />
										</Controls.ActionButton>
										
									</Stack>
								</Grid>
							</Grid>

							<Divider sx={{ mt: 2 }} />

							{/* ##################################################################################   LISTS   ################# */}
							<FormLabel>
								<Typography fontWeight='700' variant='h6'>
									Lists
								</Typography>
							</FormLabel>
							{/************************************************************** AREA LIST  */}

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={3} lg={3}>
									<InputLabel sx={{ textAlign: "left" }}>
										Delivery Areas
									</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={selectedArea}
											//disabled={disableAreaList}
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
											size='small'
											onChange={(e) => {
												handleAreaEdit(e);
											}}
											width='200px'
										>
											<MenuItem value=''>
												<em>Add New</em>
											</MenuItem>
											{areaList.map((option, id) => (
												<MenuItem key={id} value={option.id}>
													{option.area} - {option.delivery_km}
												</MenuItem>
											))}
										</TextField>
									</Box>
								</Grid>
								<Grid item xs={6} lg={6}>
									<Stack direction='row' spacing={2} ml={5}>
										<Grid
											item
											xs={9}
											lg={9}
											sx={
												disableAreaList
													? { display: "none" }
													: { display: "inline" }
											}
										>
											<InputLabel sx={{ textAlign: "left" }}>
												Area Name
											</InputLabel>
											<Box
												bgcolor='primary.light'
												p={0}
												sx={
													disableAreaList
														? { display: "none" }
														: { display: "inline" }
												}
											>
												<TextField
													disabled={disableAreaList}
													sx={{
														"& fieldset": { border: "none" },
														"& .MuiInputBase-root": {
															"& input": {
																textAlign: "left",
															},
														},
														border: "1px solid",
													}}
													name='areaName'
													value={areaName}
													onChange={(e) => setAreaName(e.target.value)}
													size='small'
													fullWidth
												/>
											</Box>
										</Grid>
										<Grid
											item
											xs={3}
											lg={3}
											sx={
												disableAreaList
													? { display: "none" }
													: { display: "inline" }
											}
										>
											<InputLabel sx={{ textAlign: "left" }}>
												Delivery KM
											</InputLabel>
											<Box
												bgcolor='primary.light'
												p={0}
												sx={
													disableAreaList
														? { display: "none" }
														: { display: "inline" }
												}
											>
												<TextField
													disabled={disableAreaList}
													type='number'
													inputProps={{ step: "0.1", lang: "en-US" }}
													sx={{
														"& fieldset": { border: "none" },
														"& .MuiInputBase-root": {
															"& input": {
																textAlign: "left",
															},
														},
														border: "1px solid",
													}}
													name='areaKM'
													value={areaKM}
													onChange={(e) => setAreaKM(e.target.value)}
													size='small'
													fullWidth
												/>
											</Box>
										</Grid>
									</Stack>
								</Grid>
								{/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
								<Grid item xs={3} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Controls.ActionButton
											disabled={disableAreaList ? false : true}
											color='primary'
											onClick={() => {
												setDisableAreaList(false);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableAreaList}
											color='primary'
											onClick={() => {
												removeArea(),
													// updateAreaList(),
													setDisableAreaList(true),
													setSelectedArea(""),
													setAreaName(""),
													setAreaKM(""),
													setIsLoading(false);
											}}
										>
											<DeleteIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableAreaList}
											color='primary'
											onClick={() => {
												setDisableAreaList(true),
													setAreaList(state.area_list),
													setSelectedArea(""),
													setAreaName(""),
													setAreaKM("");
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableAreaList}
											color='primary'
											onClick={() => {
												updateAreaList(),
													setDisableAreaList(true),
													setSelectedArea(""),
													setAreaName(""),
													setAreaKM(""),
													setIsLoading(false);
											}}
										>
											<SaveIcon fontSize='small' />
										</Controls.ActionButton>
									</Stack>
								</Grid>
							</Grid>
							{/* 88888888888888888888888888888888888888888888888888888888888    Recipe Types                888888 */}

							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={3} lg={3}>
									<InputLabel sx={{ textAlign: "left" }}>
										Recipe Types
									</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={selectedRecipeType}
											//disabled={disableRecipeType}
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
											size='small'
											onChange={(e) => {
												handleRecipeTypeEdit(e);
											}}
											width='200px'
										>
											<MenuItem value=''>
												<em>Add New</em>
											</MenuItem>
											{recipeTypeList.map((option, id) => (
												<MenuItem key={id} value={option.value}>
													{option.value}
												</MenuItem>
											))}
										</TextField>
									</Box>
								</Grid>
								<Grid item xs={6} lg={6}>
									<Stack direction='row' spacing={2} ml={5}>
										<Grid
											item
											xs={9}
											lg={9}
											sx={
												disableRecipeTypeList
													? { display: "none" }
													: { display: "inline" }
											}
										>
											<InputLabel sx={{ textAlign: "left" }}>
												Recipe Type
											</InputLabel>
											<Box
												bgcolor='primary.light'
												p={0}
												sx={
													disableRecipeTypeList
														? { display: "none" }
														: { display: "inline" }
												}
											>
												<TextField
													disabled={disableRecipeTypeList}
													sx={{
														"& fieldset": { border: "none" },
														"& .MuiInputBase-root": {
															"& input": {
																textAlign: "left",
															},
														},
														border: "1px solid",
													}}
													name='recipeType'
													value={recipeType}
													onChange={(e) => setRecipeType(e.target.value)}
													size='small'
													fullWidth
												/>
											</Box>
										</Grid>
										<Grid item xs={3} lg={3}></Grid>
									</Stack>
								</Grid>
								{/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
								<Grid item xs={3} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Controls.ActionButton
											disabled={disableRecipeTypeList ? false : true}
											color='primary'
											onClick={() => {
												setDisableRecipeTypeList(false);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableRecipeTypeList}
											color='primary'
											onClick={() => {
												removeRecipeType(),
													// updateRecipeTypeList(),
													setDisableRecipeTypeList(true),
													setSelectedRecipeType(""),
													setRecipeType("");

												//setIsLoading(false);
											}}
										>
											<DeleteIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableRecipeTypeList}
											color='primary'
											onClick={() => {
												setDisableRecipeTypeList(true),
													setRecipeTypeList(state.recipe_type_list),
													setSelectedRecipeType(""),
													setRecipeType("");
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableRecipeTypeList}
											color='primary'
											onClick={() => {
												updateRecipeTypeList(),
													setDisableRecipeTypeList(true),
													setSelectedRecipeType(""),
													setRecipeType("");
												//setIsLoading(false);
											}}
										>
											<SaveIcon fontSize='small' />
										</Controls.ActionButton>
									</Stack>
								</Grid>
							</Grid>

							{/* #########################################################     IngredientCategories   ######### */}
							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={3} lg={3}>
									<InputLabel sx={{ textAlign: "left" }}>
										Ingredient Categories
									</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={selectedIngredientCategory}
											//disabled={disableIngredientCategoryList}
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
											size='small'
											onChange={(e) => {
												handleIngredientCategoryEdit(e);
											}}
											width='200px'
										>
											<MenuItem value=''>
												<em>Add New</em>
											</MenuItem>
											{ingredientCategoryList.map((option, id) => (
												<MenuItem key={id} value={option.value}>
													{option.value}
												</MenuItem>
											))}
										</TextField>
									</Box>
								</Grid>
								<Grid item xs={6} lg={6}>
									<Stack direction='row' spacing={2} ml={5}>
										<Grid
											item
											xs={9}
											lg={9}
											sx={
												disableIngredientCategoryList
													? { display: "none" }
													: { display: "inline" }
											}
										>
											<InputLabel sx={{ textAlign: "left" }}>
												Ingredient Category
											</InputLabel>
											<Box
												bgcolor='primary.light'
												p={0}
												sx={
													disableIngredientCategoryList
														? { display: "none" }
														: { display: "inline" }
												}
											>
												<TextField
													disabled={disableIngredientCategoryList}
													sx={{
														"& fieldset": { border: "none" },
														"& .MuiInputBase-root": {
															"& input": {
																textAlign: "left",
															},
														},
														border: "1px solid",
													}}
													name='ingredientCategory'
													value={ingredientCategory}
													onChange={(e) =>
														setIngredientCategory(e.target.value)
													}
													size='small'
													fullWidth
												/>
											</Box>
										</Grid>
										<Grid item xs={3} lg={3}></Grid>
									</Stack>
								</Grid>
								{/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
								<Grid item xs={3} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Controls.ActionButton
											disabled={disableIngredientCategoryList ? false : true}
											color='primary'
											onClick={() => {
												setDisableIngredientCategoryList(false);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableIngredientCategoryList}
											color='primary'
											onClick={() => {
												removeIngredientCategory(),
													// updateIngredientCategoryList(),
													setDisableIngredientCategoryList(true),
													setSelectedIngredientCategory(""),
													setIngredientCategory("");

												//setIsLoading(false);
											}}
										>
											<DeleteIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableIngredientCategoryList}
											color='primary'
											onClick={() => {
												setDisableIngredientCategoryList(true),
													setIngredientCategoryList(
														state.ingredient_category_list
													),
													setSelectedIngredientCategory(""),
													setIngredientCategory("");
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disableIngredientCategoryList}
											color='primary'
											onClick={() => {
												updateIngredientCategoryList(),
													setDisableIngredientCategoryList(true),
													setSelectedIngredientCategory(""),
													setIngredientCategory("");
												//setIsLoading(false);
											}}
										>
											<SaveIcon fontSize='small' />
										</Controls.ActionButton>
									</Stack>
								</Grid>
							</Grid>

							{/* #########################################################     Price List   ######### */}
							<Grid
								container
								// my={4}
								rowSpacing={1}
								columnSpacing={0}
								sx={{ border: "none" }}
							>
								<Grid item xs={3} lg={3}>
									<InputLabel sx={{ textAlign: "left" }}>Prices</InputLabel>
									<Box bgcolor='primary.light' p={0}>
										<TextField
											select
											value={selectedPrice}
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
											size='small'
											onChange={(e) => {
												handlePriceEdit(e);
											}}
											width='200px'
										>
											<MenuItem value=''>
												<em>Add New</em>
											</MenuItem>
											{priceList.map((option, id) => (
												<MenuItem key={id} value={option.value}>
													{option.value}
												</MenuItem>
											))}
										</TextField>
									</Box>
								</Grid>
								<Grid item xs={6} lg={6}>
									<Stack direction='row' spacing={2} ml={5}>
										<Grid
											item
											xs={9}
											lg={9}
											sx={
												disablePriceList
													? { display: "none" }
													: { display: "inline" }
											}
										>
											<InputLabel sx={{ textAlign: "left" }}>Price</InputLabel>
											<Box
												bgcolor='primary.light'
												p={0}
												sx={
													disablePriceList
														? { display: "none" }
														: { display: "inline" }
												}
											>
												<TextField
													disabled={disablePriceList}
													sx={{
														"& fieldset": { border: "none" },
														"& .MuiInputBase-root": {
															"& input": {
																textAlign: "left",
															},
														},
														border: "1px solid",
													}}
													name='price'
													value={price}
													onChange={(e) => setPrice(e.target.value)}
													size='small'
													fullWidth
												/>
											</Box>
										</Grid>
										<Grid item xs={3} lg={3}></Grid>
									</Stack>
								</Grid>
								{/* bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
								<Grid item xs={3} lg={3}>
									<Stack direction='row' p={2} spacing={2}>
										<Controls.ActionButton
											disabled={disablePriceList ? false : true}
											color='primary'
											onClick={() => {
												setDisablePriceList(false);
											}}
										>
											<EditOutlinedIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disablePriceList}
											color='primary'
											onClick={() => {
												removePrice(),
													// updatePriceList(),
													setDisablePriceList(true),
													setSelectedPrice(""),
													setPrice("");

												//setIsLoading(false);
											}}
										>
											<DeleteIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disablePriceList}
											color='primary'
											onClick={() => {
												setDisablePriceList(true),
													setPriceList(state.price_list),
													setSelectedPrice(""),
													setPrice("");
											}}
										>
											<CloseIcon fontSize='small' />
										</Controls.ActionButton>
										<Controls.ActionButton
											disabled={disablePriceList}
											color='primary'
											onClick={() => {
												updatePriceList(),
													setDisablePriceList(true),
													setSelectedPrice(""),
													setPrice("");
												//setIsLoading(false);
											}}
										>
											<SaveIcon fontSize='small' />
										</Controls.ActionButton>
									</Stack>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Container>
		</>
	);
}

export default AppSettings;

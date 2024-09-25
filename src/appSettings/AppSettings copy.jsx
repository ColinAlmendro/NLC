import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Divider } from "@mui/material";
// import * as Yup from "yup";
// import {
// 	FormProvider,
// 	useFormContext,
// 	useForm,
// 	useFieldArray,
// 	Controller,
// } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { DevTool } from "@hookform/devtools";

import { AuthContext } from "../shared/context/auth-context";
import { useValue } from "../shared/context/ContextProvider";
// import { useHttpClient } from "../shared/hooks/http-hook";

import {
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

// import { categoryOptions } from "../utils/constants";
// import { unitOptions } from "../utils/constants";
// import FieldInputSelect from "../atoms/FieldInputSelect";
// import TextField from "../atoms/TextField";
// import TextFieldarea from "../atoms/TextFieldarea";

function AppSettings() {
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
	const [isLoading, setIsLoading] = useState(false);

	// useEffect(() => {
	// 	const setInitImage = () => {
	// 		setImagePreview(state.about_image);
	// 	};
	// 	setInitImage();
	// }, []);

	const history = useNavigate();
	// const { isLoading, error, sendRequest, clearError } = useHttpClient();

	// const handleAppTitleChange = (e) => {
	//     console.log("changed", e.target.value);
	// 		dispatch({ type: "UPDATE_APP_TITLE", payload: { app_title: e.target.value } });
	// 	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("clicked", state);

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
					}),
				}
			);
			const data = await response.json();
			alert("Settings updated successfully")
			return data.appSettings;
		} catch (err) {
			console.log("updateErr:", err);
		}
	};

	const uploadFile = async (inputName, file) => {
		try {
			let imageUrl;
			console.log("file:", file);
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

			return imageUrl;
		} catch (error) {
			console.log("cloudinary upload error:", error);
			setIsLoading(false);
		}
	};

	const handelImageChange = (event) => {
		let file = event.target.files[0];
		console.log("handlechangefile:", file);
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

	console.log("appsettings.state", state);
	return (
		<>
			<Grid container my={4} rowSpacing={2} columnSpacing={1}>
				<Grid item xs={12} sm={6}>
					<Box bgcolor='primary.light' p={2}>
						Item 1
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box bgcolor='primary.light' p={2}>
						Item 2
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box bgcolor='primary.light' p={2}>
						Item 3
					</Box>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Box bgcolor='primary.light' p={2}>
						Item 4
					</Box>
				</Grid>
			</Grid>
			<Container maxWidth='md' sx={{ border: "1px solid" }}>
	{/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */}
				<Typography variant='h4'>App Settings</Typography>
				<Divider sx={{ mt: 2 }} />
				<Paper sx={{ height: "flex" }}>
					{/* <Box display='flex' p={2}> */}
					{/* <form onSubmit={handleSubmit}> */}
					<form onSubmit={handleSubmit}>
						{/* ############################################################# */}
						<Stack gap={1}>
							<FormLabel>
								<Typography variant='h6'>Application</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='app_title'
									value={appTitle}
									onChange={(e) => setAppTitle(e.target.value)}
									label='Application Title'
								/>
								{isLoading ? (
									"Uploading ..."
								) : (
									<Button
										sx={{ mx: "auto" }}
										variant='contained'
										onClick={() => {
											setIsLoading(true),
												dispatch({
													type: "UPDATE_APP_TITLE",
													payload: { app_title: appTitle },
												});
										}}
										size='small'
									>
										Edit
									</Button>
								)}
							</Stack>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>App Logo</InputLabel>
									<TextField
										name='inputAppLogo'
										sx={{ border: "none", width: "80%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
										label='App Logo'
									/>

									{appLogo && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={appLogo}
													alt='App Logo'
												/>
											</Card>
										</Box>
									)}
								</FormControl>

								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputAppLogo", appLogoPreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* CONTACT                           ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>
								<Typography variant='h6'>Contact Details</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='contact_location'
									value={contactLocation}
									onChange={(e) => setContactLocation(e.target.value)}
									label='Location'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_CONTACT_LOCATION",
											payload: { contact_location: contactLocation },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='contact_name'
									value={contactName}
									onChange={(e) => setContactName(e.target.value)}
									label='Name'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_CONTACT_NAME",
											payload: { contact_name: contactName },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='contact_email'
									value={contactEmail}
									onChange={(e) => setContactEmail(e.target.value)}
									label='Email'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_CONTACT_EMAIL",
											payload: { contact_email: contactEmail },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='contact_cellphone'
									value={contactCellphone}
									onChange={(e) => setContactCellphone(e.target.value)}
									label='Cellphone'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_CONTACT_CELLPHONE",
											payload: { contact_cellphone: contactCellphone },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* HOME                                    ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>
								<Typography variant='h6'>Home Page</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>Home Background Image</InputLabel>
									<TextField
										name='inputHomeBgImage'
										sx={{ border: "none", width: "40%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
									/>
									{homeBgImage && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={homeBgImage}
													alt='Background Image'
												/>
											</Card>
										</Box>
									)}
								</FormControl>

								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputHomeBgImage", homeBgImagePreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>Home Logo</InputLabel>
									<TextField
										name='inputHomeLogo'
										sx={{ border: "none", width: "80%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
										label='Home Logo'
									/>

									{homeLogo && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={homeLogo}
													alt='Home Logo'
												/>
											</Card>
										</Box>
									)}
								</FormControl>

								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputHomeLogo", homeLogoPreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* ABOUT                                 ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>
								<Typography variant='h6'>About Page</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>About Image</InputLabel>
									<TextField
										name='inputAboutImage'
										sx={{ border: "none", width: "80%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
										label='About Image'
									/>

									{aboutImage && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={aboutImage}
													alt='About Image'
												/>
											</Card>
										</Box>
									)}
								</FormControl>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputAboutImage", aboutImagePreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='about_intro'
									value={aboutIntro}
									onChange={(e) => setAboutIntro(e.target.value)}
									label='About Intro'
									multiline
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_ABOUT_INTRO",
											payload: { about_intro: aboutIntro },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='about_text'
									value={aboutText}
									onChange={(e) => setAboutText(e.target.value)}
									label='About Text'
									multiline
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_ABOUT_TEXT",
											payload: { about_text: aboutText },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* MENU                               ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>
								<Typography variant='h6'>Menu Layout</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>Menu Image</InputLabel>
									<TextField
										name='inputMenuImage'
										sx={{ border: "none", width: "80%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
										label='Menu Image'
									/>

									{menuImage && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={menuImage}
													alt='Menu Image'
												/>
											</Card>
										</Box>
									)}
								</FormControl>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputMenuImage", menuImagePreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<FormControl>
									<InputLabel shrink>Menu Logo</InputLabel>
									<TextField
										name='inputMenuLogo'
										sx={{ border: "none", width: "80%" }}
										onChange={(event) => {
											handelImageChange(event);
										}}
										type='file'
										label='Menu Logo'
									/>

									{menuLogoPreview && (
										<Box
											sx={{
												my: 2,
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Card sx={{ maxWidth: 100 }}>
												<CardMedia
													component='img'
													image={menuLogo}
													alt='Menu Logo'
												/>
											</Card>
										</Box>
									)}
								</FormControl>

								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										uploadFile("inputMenuLogo", menuLogoPreview);
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* FOOTER                         ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>Footer</FormLabel>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='footer_about'
									value={footerAbout}
									onChange={(e) => setFooterAbout(e.target.value)}
									label='Footer About'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_FOOTER_ABOUT",
											payload: { footer_about: footerAbout },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* MEDIA LINKS                         ############################################################# */}
							<Divider sx={{ mt: 2 }} />
							<FormLabel>
								<Typography variant='h6'>Media Links</Typography>
							</FormLabel>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='facebook'
									value={facebook}
									onChange={(e) => setFacebook(e.target.value)}
									label='Facebook'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_FACEBOOK",
											payload: { facebook: facebook },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							<Stack display='block' direction='row'>
								<TextField
									sx={{ border: "none", width: "80%" }}
									name='instagram'
									value={instagram}
									onChange={(e) => setInstagram(e.target.value)}
									label='Instagram'
								/>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => {
										dispatch({
											type: "UPDATE_INSTAGRAM",
											payload: { instagram: instagram },
										});
									}}
									size='small'
								>
									Edit
								</Button>
							</Stack>
							{/* BUTTONS       ######################################################################### */}
							<Stack display='block' spacing={2} direction='row'>
								<Button type='submit' sx={{ mx: "auto" }} variant='contained'>
									Save
								</Button>
								<Button
									sx={{ mx: "auto" }}
									variant='contained'
									onClick={() => history("/")}
								>
									Cancel
								</Button>
							</Stack>
							{/* ############################################################# */}
						</Stack>
					</form>
					{/* </Box> */}
				</Paper>
			</Container>
		</>
	);
}

export default AppSettings;

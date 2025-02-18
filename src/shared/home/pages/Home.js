import React, { useContext, useState, useEffect } from "react";
import { useValue } from "../../context/SettingsProvider";
import { AuthContext } from "../../../shared/context/auth-context.js";
import Footer from "../../components/Navigation/footer/Footer";
//import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
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
	Grid,
	InputLabel,
	Button,
	MenuItem,
	List,
	ListItem,
	Card,
	CardMedia,
	CircularProgress,
} from "@mui/material";
import "./Home.css";
import { toast } from "sonner";

// SwiperCore.use([EffectCoverflow, Pagination]);

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { state, dispatch } = useValue();
	const [recipeList, setRecipeList] = useState([]);
	const auth = useContext(AuthContext);

	useEffect(() => {
		async function fetchRecipes() {
			//console.log("fetching recipes");
			try {
				setIsLoading(true);
				const response = await fetch(
					process.env.REACT_APP_BACKEND_URL + "/recipes/list",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + auth.token,
						},
					}
				);
				const data = await response.json();
				//console.log("Recipes list :", data.recipes);
				let mainRecipes = data.recipes;
				mainRecipes = mainRecipes.filter(
					(recipe) => recipe.category === "main"
				);
				setRecipeList(data.recipes);

				setIsLoading(false);
			} catch (err) {
				console.log(err);
				toast.error(err, {
					style: {
						background: "red",
						color: "white",
					},
				});
				setIsLoading(false);
			}
		}
		fetchRecipes();
	}, []);

	// return (
	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<React.Fragment>
			<div >
				<div>
					<Swiper
						className='swiper'
						modules={[Navigation, Pagination, Scrollbar, A11y]}
						//autoHeight={true}
						// width="100%"
						// height="50%"
						spaceBetween={50}
						// slidesPerView={3}
						breakpoints={{
							0: {
								slidesPerView: 1,
							},
							400: {
								slidesPerView: 1,
							},
							639: {
								slidesPerView: 3,
							},
							865: {
								slidesPerView: 3,
							},
							1000: {
								slidesPerView: 3,
							},
							1500: {
								slidesPerView: 3,
							},
							1700: {
								slidesPerView: 3,
							},
						}}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
						onSwiper={(swiper) => console.log(swiper)}
						onSlideChange={() => console.log("slide change")}
					>
						{recipeList.map((recipe, i) => {
							return (
								<SwiperSlide key={i} className='swiper_slide'>
									<div>
										<img
											// style={{ width: "50%", height: "80%" }}
											//className="img"
											src={recipe.image}
											alt={recipe.name}
										/>
										<p>
											<Typography variant='h6'>{recipe.name}</Typography>
										</p>
										<p>
											<Typography variant='caption'>
												{recipe.description}
											</Typography>
										</p>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
					{/* <div
					className='banner-container'
					style={{ backgroundImage: `url(${state.home_bg_image})` }}
				>
					{/* <img src={state.home_logo} className='logo' alt='logo' /> */}
					<div className='banner-footer' />
				</div>{" "}
				{/* */}
				<Footer classname='footer' />
			</div>
		</React.Fragment>
	);
};

export default Home;

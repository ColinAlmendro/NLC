import React, { useContext, useState, useEffect } from "react";
import { useValue } from "../../context/SettingsProvider";
import { AuthContext } from "../../../shared/context/auth-context.js";
import Footer from "../../components/Navigation/footer/Footer";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
	Typography,
	Box,
	
	CircularProgress,
} from "@mui/material";
import "./Home.css";
import { toast } from "sonner";



const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { state, dispatch } = useValue();
	const [recipeList, setRecipeList] = useState([]);
	const auth = useContext(AuthContext);

	useEffect(() => {
		async function fetchRecipes() {
			
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
				
				let mainRecipes = data.recipes;
				mainRecipes = mainRecipes.filter(
					(recipe) => recipe.category === "main"
				);
				setRecipeList(data.recipes);

				setIsLoading(false);
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
		fetchRecipes();
	}, []);

	
	if (isLoading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<React.Fragment>
			<div>
				<Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
					<Typography variant='h5' fontWeight='700' >{state.app_subtitle}</Typography>
					
				</Box>
				<div
					className='swiper-div'

				>
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
								slidesPerView: 4,
							},
							865: {
								slidesPerView: 4,
							},
							1000: {
								slidesPerView: 4,
							},
							1500: {
								slidesPerView: 4,
							},
							1700: {
								slidesPerView: 4,
							},
						}}
						navigation
						pagination={{ clickable: true }}
						scrollbar={{ draggable: true }}
					
					>
						{recipeList.map((recipe, i) => {
							return (
								<SwiperSlide key={i} className='swiper_slide'>
									<div>
										<Box sx={{ display: "flex", justifyContent: "center" }}>
											<img
												style={{ border: "1px solid" }}
												
												src={recipe.image}
												alt={recipe.name}
											/>
										</Box>
										<Box sx={{ display: "flex", justifyContent: "center" }}>
											<Typography variant='h6'>{recipe.name}</Typography>
										</Box>
										<Box sx={{ display: "flex", justifyContent: "center" }}>
											<Typography variant='caption'>
												{recipe.description}
											</Typography>
										</Box>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
					
				</div>{" "}
				
				<Footer classname='footer' />
			</div>
		</React.Fragment>
	);
};

export default Home;

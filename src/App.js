import React, { Suspense, useRef, useEffect, useContext } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

//import Navbar from "./shared/components/NavigationX/MainNavigation.js";
//import Navbar from "./shared/components/Navigation/Navbar/Header.jsx";
//import Navbar from "./shared/components/Navigation/Navbar/Nav";

//import Navbar from "./shared/components/Navigation/Navbar/Navbarmenu";
import Navbar from "./shared/components/Navigation/Navbar/Navbar.jsx";

import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { useValue } from "./shared/context/SettingsProvider.js";

import { makeStyles } from "@mui/styles";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
//import { AppProvider } from "./shared/context/app-context";

// import ContextProvider from "./shared/context/ContextProvider";
// import { Recipe } from "./recipes/recipeForms/Steps/Recipe.js";
// import { IngredientsList } from "./recipes/recipeForms/Steps/Ingredients.js";
// import { Instructions } from "./recipes/recipeForms/Steps/Instructions.js";
// import { Details } from "./recipes/recipeForms/Steps/Details.js";
// import { Confirm } from "./recipes/recipeForms/Steps/Confirm.js";
// import { Stepper } from "./recipes/recipeForms/Steps/Stepper";

import "./App.css";

const Home = React.lazy(() => import("./shared/home/pages/Home"));
const Users = React.lazy(() => import("./user/pages/old_Users.js"));
const AppSettings = React.lazy(() => import("./appSettings/AppSettings.jsx"));
// const IngredientManager = React.lazy(() =>
// 	import("./ingredients/pages/ManageIngredients.jsx")
// );
const IngredientManager = React.lazy(() =>
	import("./ingredients/pages/Ingredients.js")
);
const RecipeManager = React.lazy(() => import("./recipes/pages/Recipes.js"));
const CustomerManager = React.lazy(() =>
	import("./customers/pages/Customers.js")
);
const OrderManager = React.lazy(() => import("./orders/pages/Orders.js"));
const OrdersPerDay = React.lazy(() => import("./orders/pages/OrdersPerDay.jsx"));
const MenuManager = React.lazy(() => import("./menus/pages/Menu.js"));
const PromotionManager = React.lazy(() =>
	import("./promotions/pages/Promotions.js")
);
const About = React.lazy(() => import("./about/About.jsx"));
const Auth = React.lazy(() => import("./user/pages/Auth"));

import { Toaster } from "sonner";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { toast } from "sonner";

// const Ingredients = React.lazy(() => import("./ingredients/pages/Ingredients"));
// const EditIngredient = React.lazy(() =>
// 	import("./ingredients/pages/EditIngredient")
// );
// const NewIngredient = React.lazy(() =>
// 	import("./ingredients/pages/NewIngredient")
// );
// const NewIngredient = React.lazy(() =>
// 	import("./ingredients/pages/AddIngredient.jsx")
// );
// const RecipeManager = React.lazy(() =>
// 	import("./recipes/pages/ManageRecipes.jsx")
// );
// const RecipeManager = React.lazy(() =>
// 	import("./recipes/pages/RecipeIngredients.jsx")
// );
// const RecipeManager = React.lazy(() => import("./recipes/recipeForms/App.js"));
// const RecipeManager = React.lazy(() =>
// 	import("./recipes/recipeForms/NewRecipe.js")
// );
// const RecipeManager = React.lazy(() =>
// 	import("./recipes/recipeSteps/organisms/FormRegistration.jsx")
// );
// const MUI = React.lazy(() =>
// 	// import("./recipes/recipeSteps/organisms/FormRegistration.jsx")
// 	import("./recipes/recipeSteps/organisms/FormRecipe.jsx")
// );
// const RecipeForm = React.lazy(() => import("./recipes/manager/RecipeForm.jsx"));
// const RecipeManager = React.lazy(() =>
// 	import("./recipes/pages/AddRecipe.jsx")
// );
// const Recipes = React.lazy(() => import("./recipesX/pages/Recipes"));

// const NewRecipe = React.lazy(() => import("./recipesX/pages/NewRecipe"));
// const EditRecipe = React.lazy(() => import("./recipesX/pages/EditRecipe.js"));

// const EmployeeManager = React.lazy(() =>
// 	import("./employees/pages/Employees/Employees.js")
// );
// const Kyoto = React.lazy(() => import("./Kyoto/Menu.js"));

const theme = createTheme({
	palette: {
		primary: {
			main: "#333996",
			light: "#3c44b126",
		},
		secondary: {
			main: "#f83245",
			light: "#f8324526",
		},
		background: {
			default: "#f4f5fd",
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: "translateZ(0)",
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

const useStyles = makeStyles({
	appMain: {
		paddingLeft: "320px",
		width: "100%",
	},
});

const App = () => {
	const { state, dispatch } = useValue();
	const auth = useContext(AuthContext);
	const buttonRef = useRef();

	// const onStepChange = () => {
	// 	buttonRef.current?.click();
	// };

	const { token, admin, login, logout, userId } = useAuth();
	/////////////////////////////
	useEffect(() => {
		async function fetchAppSettings() {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/appsettings/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},
				}
			);
			const data = await response.json();
			//	console.log("AppSettings list :", data.settings);

			dispatch({ type: "UPDATE_APP_SETTINGS", data });
		}
		fetchAppSettings();
	}, []);

	////////////////////////////////

	let routes;
	//	 console.log("app auth",token, admin);
	if (token) {
		{
		}
		routes = (
			<Routes>
				<Route path='/' element={<Home />} exact='true' />
				<Route path='/users' element={<Users />} exact='true' />
				<Route path='/about' element={<About />} exact='true' />
				{admin && (
					<>
						<Route path='/appsettings' element={<AppSettings />} exact='true' />
						<Route path='/recipes' element={<RecipeManager />} exact='true' />
						<Route
							path='/customers'
							element={<CustomerManager />}
							exact='true'
						/>
						<Route path='/orders' element={<OrderManager />} exact='true' />
						<Route path='/daysorders' element={<OrdersPerDay />} exact='true' />
						<Route path='/menus' element={<MenuManager />} exact='true' />
						<Route
							path='/promotions'
							element={<PromotionManager />}
							exact='true'
						/>
						<Route
							path='/ingredients'
							element={<IngredientManager />}
							exact='true'
						/>
					</>
				)}
				{/* <Route path='/recipes/manager' element={<RecipeManager />} exact='true'>
					<Route
						//index
						 path='/recipes/contact'
						element={<Contact ref={buttonRef} />}
					/>
					<Route
						path='/recipes/education'
						element={<Education ref={buttonRef} />}
					/>
					<Route path='/recipes/about' element={<About ref={buttonRef} />} />
					<Route path='/recipes/confirm' element={<Confirm />} />
				</Route> */}

				{/* <Route path='/recipes/recipe' element={<Recipe ref={buttonRef} />} />
				<Route
					path='/recipes/ingredients'
					element={<IngredientsList ref={buttonRef} />}
				/>
				<Route
					path='/recipes/instructions'
					element={<Instructions ref={buttonRef} />}
				/>
				<Route path='/recipes/details' element={<Details ref={buttonRef} />} />
				<Route path='/recipes/confirm' element={<Confirm />} /> */}

				{/* <Route
					path='/ingredients/list'
					element={<Ingredients />}
					exact='true'
				/> */}
				{/* <Route
					path='/ingredients/new'
					element={<NewIngredient />}
					exact='true'
				/> */}
				{/* <Route
					path='/ingredients/edit/:ingredientId'
					element={<EditIngredient />}
					exact={"true"}
				/>
				<Route path='/recipes/list' element={<Recipes />} exact='true' />
				<Route path='/recipes/new' element={<NewRecipe />} exact='true' />
				<Route
					path='/recipes/edit/:recipeId'
					element={<EditRecipe />}
					exact={"true"}
				/> */}

				{/* <Route path='/mui/recipes' element={<RecipeManager />} exact='true' /> */}
				{/* <Route path='/mui/tools' element={<MUI />} exact='true' /> */}
				{/* <Route path='/employees' element={<EmployeeManager />} exact='true' /> */}
				{/* <Route
					path='/kyoto'
					element={<Kyoto />}
					exact='true'
				></Route> */}

				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				{/* <Route path='/' element={<Users />} exact='true' /> */}
				<Route path='/' element={<Home />} exact='true' />
				<Route path='/about' element={<About />} exact='true' />
				<Route path='/auth' element={<Auth />} exact='true' />
				{/* <Route path='*' element={<Navigate to='/auth' replace />} /> */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				admin: admin,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			{" "}
			<div className='App'>

				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Navbar />
						<Toaster
							position='top-center'
							icons={{
								success: <CheckCircleRoundedIcon />,
								info: <InfoRoundedIcon />,
								warning: <WarningRoundedIcon />,
								error: <ErrorRoundedIcon />,
							}}
						/>
						<main>
							<Suspense
								fallback={
									<div className='center'>
										<LoadingSpinner />
									</div>
								}
							>
								{routes}
							</Suspense>
						</main>
					</BrowserRouter>
					<CssBaseline />
				</ThemeProvider>

			</div>
		</AuthContext.Provider>
	);
};

export default App;

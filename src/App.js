import React, { Suspense, useRef, useEffect, useContext } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "./shared/components/Navigation/Navbar/Navbar.jsx";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { useValue } from "./shared/context/SettingsProvider.js";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";

const Home = React.lazy(() => import("./shared/home/pages/Home"));
const Users = React.lazy(() => import("./user/pages/Users.js"));
const AppSettings = React.lazy(() => import("./appSettings/AppSettings.jsx"));
const IngredientManager = React.lazy(() =>
	import("./ingredients/pages/Ingredients.js")
);
const RecipeManager = React.lazy(() => import("./recipes/pages/Recipes.js"));
const CustomerManager = React.lazy(() =>
	import("./customers/pages/Customers.js")
);
const OrderManager = React.lazy(() => import("./orders/pages/Orders.js"));
const OrdersPerDay = React.lazy(() =>
	import("./orders/pages/OrdersPerDay.jsx")
);
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
			default: "#f7ffbf",
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

const App = () => {
	const { state, dispatch } = useValue();
	const auth = useContext(AuthContext);
	const buttonRef = useRef();

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

			dispatch({ type: "UPDATE_APP_SETTINGS", data });
		}
		fetchAppSettings();
	}, []);

	////////////////////////////////

	let routes;

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

				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path='/' element={<Home />} exact='true' />
				<Route path='/about' element={<About />} exact='true' />
				<Route path='/auth' element={<Auth />} exact='true' />
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
										<Box sx={{ display: "flex", justifyContent: "center" }}>
											<CircularProgress />
										</Box>
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

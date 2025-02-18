//import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import SettingsProvider from "./shared/context/SettingsProvider";
import AppProvider from "./shared/context/AppProvider";
import MenuProvider from "./shared/context/MenuProvider";
import PromotionsProvider from "./shared/context/PromotionsProvider";
import RecipeProvider from "./shared/context/RecipeProvider";
import CustomersProvider from "./shared/context/CustomersProvider";
import OrdersProvider from "./shared/context/OrdersProvider";
import CartContextProvider from "./shared/context/CartProvider";
import IngredientsProvider from "./shared/context/IngredientsProvider";
import UsersProvider from "./shared/context/UsersProvider";

import "./index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	//	<React.StrictMode>
	<>
		<SettingsProvider>
			<AppProvider>
				<UsersProvider>
					<PromotionsProvider>
						<IngredientsProvider>
							<RecipeProvider>
								<CustomersProvider>
									<MenuProvider>
										<OrdersProvider>
											<CartContextProvider>
												<App />
											</CartContextProvider>
										</OrdersProvider>
									</MenuProvider>
								</CustomersProvider>
							</RecipeProvider>
						</IngredientsProvider>
					</PromotionsProvider>
				</UsersProvider>
				</AppProvider>
			</SettingsProvider>
		</>
		// //{" "}
	// </React.StrictMode>
);

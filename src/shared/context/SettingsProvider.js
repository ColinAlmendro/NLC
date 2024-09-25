import { createContext, useContext, useEffect, useReducer } from "react";
import reducerSettings from "./reducerSettings";
// import { AuthContext } from "./auth-context";

//// appSettingId : "66b5f09f69754eb8fc08c421"  mongodb _id  ////
const initialState = {
	//Navbar
	app_title: "Next Level Cuisine",
	app_logo: "",
	//Home page
	home_bg_image:
		"https://res.cloudinary.com/dhezas2ju/image/upload/v1722165596/hqq2m06y6sqoajq84jyy.jpg",
	home_logo: "",

	//Footer
	footer_about: "We are humble chefs, dedicated to making life delicious",
	contact_location: "Cape Towns deep south",
	contact_name: "Niki",
	contact_email: "nextlevelcuisine@gmail.com",
	contact_cellphone: "+27 084 2078305",
	//Links
	facebook: "https://www.facebook.com/",
	instagram: "https://www.instagram.com/",
	//Menu
	menu_logo: "",
	menu_image: "",
	//About
	about_intro:
		"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae accusantium dolore expedita sapiente. Eligendi, odit?",
	about_text:
		"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita nemo debitis voluptatum aliquid voluptas deserunt quidem rem delectus vel, nostrum voluptatibus qui a? Odit sed ducimus quos, expedita fugit ea porro, tempora tenetur asperiores numquam alias, iste corrupti dolorum assumenda cumque quidem! Distinctio voluptatum velit quisquam temporibus dolorem est facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem earum iusto, sapiente explicabo nulla id nemo praesentium sequi, quasi, fugiat odit facere inventore eius ipsam? Harum perspiciatis ut modi quo nam consectetur tempora dicta! Saepe laudantium aliquam quisquam voluptatibus sint! Tempora exercitationem reprehenderit error nulla vel, perferendis eligendi saepe eveniet ducimus, blanditiis, rerum nemo dicta obcaecati earum sed aliquam nisi provident vero! Dolore molestiae suscipit atque laudantium, maiores ea esse tenetur, dolorem corrupti magni reiciendis sed quae eaque non?",
	about_image: "",
};

const Context = createContext(initialState);

export const useValue = () => {
	return useContext(Context);
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerSettings, initialState);

	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};

export default ContextProvider;

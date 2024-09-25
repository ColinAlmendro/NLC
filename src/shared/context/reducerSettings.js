const reducerSettings = (state, action) => {
	switch (action.type) {
		case "UPDATE_APP_SETTINGS":
			// console.log("payload",action.data.settings[0])
			return { ...state, ...action.data.settings[0] };
		case "UPDATE_APP_TITLE":
			return { ...state, app_title: action.payload.app_title };
		case "UPDATE_APP_LOGO":
			// Home
			return { ...state, app_logo: action.payload.app_logo };
		case "UPDATE_HOME_BG_IMAGE":
			return { ...state, home_bg_image: action.payload.home_bg_image };
		case "UPDATE_HOME_LOGO":
			return { ...state, home_logo: action.payload.home_logo };
		// Menu
		case "UPDATE_MENU_LOGO":
			return { ...state, menu_logo: action.payload.menu_logo };
		case "UPDATE_MENU_IMAGE":
			return { ...state, menu_image: action.payload.menu_image };
		// About
		case "UPDATE_FOOTER_ABOUT":
			return { ...state, footer_about: action.payload.footer_about };
		case "UPDATE_ABOUT_IMAGE":
			return { ...state, about_image: action.payload.about_image };
		case "UPDATE_ABOUT_INTRO":
			return { ...state, about_intro: action.payload.about_intro };
		case "UPDATE_ABOUT_TEXT":
			return { ...state, about_text: action.payload.about_text };
		// Contact
		case "UPDATE_CONTACT_LOCATION":
			return { ...state, contact_location: action.payload.contact_location };
		case "UPDATE_CONTACT_NAME":
			return { ...state, contact_name: action.payload.contact_name };
		case "UPDATE_CONTACT_EMAIL":
			return { ...state, contact_email: action.payload.contact_email };
		case "UPDATE_CONTACT_CELLPHONE":
			return { ...state, contact_cellphone: action.payload.contact_cellphone };
		// Links
		case "UPDATE_FACEBOOK":
			return { ...state, facebook: action.payload.facebook };
		case "UPDATE_INSTAGRAM":
			return { ...state, instagram: action.payload.instagram };

		default:
			throw new Error("No matched action!");
	}
};

export default reducerSettings;

const reducerSettings = (state, action) => {
	switch (action.type) {
		case "START_LOADING":
			return { ...state, isLoading: true };
		case "END_ISLOADING":
			return { ...state, loading: false };
		case "OPEN_DIALOG_APPSETTINGS":
			return { ...state, dialogAppSettingsOpen: true };
		case "CLOSE_DIALOG_APPSETTINGS":
			return { ...state, dialogAppSettingsOpen: false };

		default:
			throw new Error("No matched action!");
	}
};

export default reducerSettings;

import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

const fetchRecipes = async () => {
	try {
		const responseData = await sendRequest(
			process.env.REACT_APP_BACKEND_URL + "/recipes/list"
		);
		console, log("recipes", responseData);
		return responseData;
	} catch (err) {}
};

export default fetchRecipes;

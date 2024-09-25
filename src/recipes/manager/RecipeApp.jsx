import React, { useContext } from "react";
import styled from "@emotion/styled";
import { AuthContext } from "../../shared/context/auth-context";
import  RecipeForm  from "./RecipeForm";
import "./App.css";
//import { Recipe } from "./types";

const RecipeApp = () => {
	const auth = useContext(AuthContext);

	const submitForm = async (data) => {
		const formData = new FormData();
		formData.append("files", data.image[0]);
		data = { ...data, image: data.image[0].name };
		formData.append("recipe", JSON.stringify(data));
console.log("OnSubmit",{ formData });
		try {
			const response = await fetch(
				process.env.REACT_APP_BACKEND_URL + "/recipes/new",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + auth.token,
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await response.json();
			// enter you logic when the fetch is successful
			console.log(data);
			alert("well done");

			//	history("/ingredients/list");
		} catch (error) {
			// enter your logic for when there is an error (ex. error toast)

			console.log(error);
		}

		// return fetch("/api/recipes/create", {
		//   method: "POST",
		//   body: formData,
		// }).then((response) => {
		//   if (response.ok) {
		//     // Handle successful upload
		//     console.log("yay")
		//   } else {
		//     // Handle error
		//     console.log("awww");
		//   }
		// });
	};

	return (
		<Container>
			<RecipeForm saveData={submitForm} />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
export default RecipeApp
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Stack,Grid,Box,TextField } from "@mui/material";
import { Container } from "@mui/system";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./RecipeItem.css";

const RecipeItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const history = useNavigate();

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/recipes/delete/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			props.onDelete(props.id);
			history("/recipes/list");
		} catch (err) {}
	};
	console.log("RecipeItemProps", props.ingredients[0]);
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{/* <Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass='recipe-item__modal-content'
				footerClass='recipe-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			></Modal> */}
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'
				footerClass='recipe-item__modal-actions'
				footer={
					<React.Fragment>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={confirmDeleteHandler}>
							DELETE
						</Button>
					</React.Fragment>
				}
			>
				<p>
					Do you want to proceed and delete this recipe? Please note that it
					can't be undone thereafter.
				</p>
			</Modal>
			<li className='recipe-item'>
				<Card className='recipe-item__content'>
					{isLoading && <LoadingSpinner asOverlay />}
					<div className='recipe-item__image'>
						<img
							src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
							alt={props.name}
						/>
					</div>
					<div className='recipe-item__info'>
						{/* <h2>{props.category}</h2> */}
						<h2>{props.name}</h2>
						<h3>{props.description}</h3>
						<h4>Ingredients</h4>
						<table
							className='recipe-ingredients-table'
							width='60%'
							align='center'
						>
							<tbody>
								<tr>
									<th colspan='90%'>Ingredient</th>
									<th colspan='5%'>Quantity</th>
									<th colspan='5%'>Unit</th>
								</tr>
								{props.ingredients[0].map((item) => (
									<tr key={item.id}>
										<td colspan='90%'>{item.ingredient.name}</td>
										<td colspan='5%'>{item.qty}</td>
										<td colspan='5%'>{item.unit}</td>
									</tr>
								))}
							</tbody>
						</table>

						<h4>Instructions</h4>
						<p>{props.instructions}</p>
						<h4>Servings</h4>
						<p>{props.feeds}</p>
						<h4>Website</h4>
						<p>{props.url}</p>
						<h4>Cost</h4>
						<p>{props.cost}</p>
						<h4>Price</h4>
						<p>{props.price}</p>
					</div>
					<div className='recipe-item__actions'>
						{/* {auth.userId === props.admin && ( */}
						<Button to={`/recipes/edit/${props.id}`}>Edit</Button>
						{/* )}

						{auth.userId === props.admin && ( */}
						<Button danger onClick={showDeleteWarningHandler}>
							Delete
						</Button>
						{/* )} */}
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default RecipeItem;

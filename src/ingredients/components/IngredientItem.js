import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./IngredientItem.css";

const IngredientItem = (props) => {
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
				process.env.REACT_APP_BACKEND_URL + `/ingredients/delete/${props.id}`,
				"DELETE",
				null,
				{
					Authorization: "Bearer " + auth.token,
				}
			);
			props.onDelete(props.id);
			history("/ingredients/list");
		} catch (err) {}
	};

	console.log("Item", props);
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{/* <Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass='ingredient-item__modal-content'
				footerClass='ingredient-item__modal-actions'
				footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
			></Modal> */}
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header='Are you sure?'
				footerClass='ingredient-item__modal-actions'
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
					Do you want to proceed and delete this ingredient? Please note that it
					can't be undone thereafter.
				</p>
			</Modal>
			<li className='ingredient-item'>
				<Card className='ingredient-item__content'>
					{isLoading && <LoadingSpinner asOverlay />}
					{/* <div className='ingredient-item__image'>
						<img
							src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
							alt={props.name}
						/>
					</div> */}
					<div className='ingredient-item__info'>
						<h2>{props.category}</h2>
						<h3>{props.name}</h3>
						<h4>{props.latin}</h4>
						<p>{props.description}</p>
						<p>
							{props.volume}
							{props.unit}
						</p>
						{/* <p>{props.volume}</p> */}
						<p>R{props.price["$numberDecimal"].toLocaleString()}</p>
					</div>
					<div className='ingredient-item__actions'>
						{/* {auth.userId === props.admin && ( */}
						<Button to={`/ingredients/edit/${props.id}`}>Edit</Button>
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

export default IngredientItem;

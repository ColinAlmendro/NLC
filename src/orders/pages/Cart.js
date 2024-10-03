import { useContext } from "react";

import CartContext from "../../shared/context/cart-context";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import "./Cart.css";

export default function Cart(props) {

	const { title, children, openCartPopup, setOpenCartPopup } = props;
	let { items, showCart } = useContext(CartContext);

	let totalItemCount = items.reduce((currNum, item) => {
		return currNum + item.count;
	}, 0);

	const showCartHandler = () => {
		setOpenCartPopup(true);
		// showCart(true);
	};

	return (
		<div className="container">
			<div className="cart_icon" onClick={showCartHandler}>
				<button type='button'>
					<ShoppingBasketIcon	/>
				</button>
				{totalItemCount > 0 && (
					<span className="item_count">{totalItemCount}</span>
				)}
			</div>
			{/* <div className="menu_icon">
				<img
					src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARklEQVR4nO3WsQkAMQwEweu/LKmwd2wwOLZ+BlTAouQSAGDTSb7HrqeE1CkEAACuXly/PSWk7v8BAIAh67enhNQpBAB+awHE9RApipkrkgAAAABJRU5ErkJggg=='
					alt=''
				/>
			</div> */}
		</div>
	);
}

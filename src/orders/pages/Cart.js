import { useContext,useEffect } from "react";
import { IconButton, Button } from "@mui/material";
import CartContext from "../../shared/context/cart-context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "./Cart.css";

export default function Cart(props) {
	const { title, children, openCartPopup, setOpenCartPopup } = props;
	let {
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		frozen,
		promotion,
		totalCount,
		totalAmount,
		showCart,
	} = useContext(CartContext);

	let totalMondayCount = 0;
	if (monday.length > 0) {
		totalMondayCount = monday.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalTuesdayCount = 0;
	if (tuesday.length > 0) {
		totalTuesdayCount = tuesday.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalWednesdayCount = 0;
	if (wednesday.length > 0) {
		totalWednesdayCount = wednesday.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalThursdayCount = 0;
	if (thursday.length > 0) {
		totalThursdayCount = thursday.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalFridayCount = 0;
	if (friday.length > 0) {
		totalFridayCount = friday.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalFrozenCount = 0;
	if (frozen.length > 0) {
		totalFrozenCount = frozen.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalPromotionCount = 0;
	if (promotion.length > 0) {
		totalPromotionCount = promotion.reduce((currNum, item) => {
			return currNum + item.count;
		}, 0);
	}
	let totalItemCount =
		totalMondayCount +
		totalTuesdayCount +
		totalWednesdayCount +
		totalThursdayCount +
		totalFridayCount +
		totalFrozenCount +
		totalPromotionCount;

	const showCartHandler = () => {
		setOpenCartPopup(true);
		// showCart(true);
	};

	return (
		<div className='container'>
			<div className='cart_icon' onClick={showCartHandler}>
				<IconButton type='button'>
					<ShoppingCartIcon color="primary"  className="cart_icon"/>
				</IconButton>
				{totalItemCount > 0 && (
					<span className='item_count'>{totalItemCount}</span>
				)}
			</div>
		</div>
	);
}

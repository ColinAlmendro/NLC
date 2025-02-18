import React from "react";

const CartContext = React.createContext({
	// items: [],
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	frozen: [],
	promotion: [],
	totalCount: 0,
	totalCost: 0,
	deliveryRate:0,
	totalDelivery:0,
	totalAmount: 0,
	isCartShowing: false,
	setDeliveryRate:(rate)=>{},
	addItem: (item) => {},
	removeItem: (id) => {},
	showCart: () => {},
	resetCart: () => {},
});

export default CartContext;
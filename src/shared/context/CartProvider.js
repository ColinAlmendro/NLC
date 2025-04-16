import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultContext = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	frozen: [],
	promotion: [],
	totalCount: 0,
	totalCost: 0,
	totalAmount: 0,
	isCartShowing: false,
};

const cartReducer = (state, action) => {
	//3333###########################################################################  DELIVERY RATE

	//console.log("reducer_set del rate", state.deliveryRate, action.rate);
	if (action.type === "SET_DELIVERY_RATE") {
		return {
			...state,
			deliveryRate : action.rate,
		};
		
	}
	if (action.type === "SET_TOTAL_DELIVERY") {
		return {
			...state,
			totalDelivery: action.rate,
		};
		
	}

	//3333###########################################################################  ADD

	if (action.type === "ADD_MONDAY") {
		
		let newItems;
		// Check if item exists
		let itemIndex = state.monday.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.monday[itemIndex];

		// Update monday array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated mondayItem", updatedItem);
			newItems = [...state.monday];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.monday, action.data];
		}
		let newCount = state.totalCount + 1;
		
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;
		
		//console.log("reducer_new monday count", newCount, newCost, newAmount);
		return {
			...state,
			monday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	if (action.type === "ADD_TUESDAY") {
		
		let newItems;
		// Check if item exists
		let itemIndex = state.tuesday.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.tuesday[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated tuesday Item", updatedItem);
			newItems = [...state.tuesday];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.tuesday, action.data];
		}

		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;
		//console.log("reducer_new tuesday count", newCount);
		return {
			...state,
			tuesday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	if (action.type === "ADD_WEDNESDAY") {
		//	console.log("reducer_add wednesday count", action.data.count);
		let newItems;
		// Check if item exists
		let itemIndex = state.wednesday.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.wednesday[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated wednesday Item", updatedItem);
			newItems = [...state.wednesday];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.wednesday, action.data];
		}
		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;

		return {
			...state,
			wednesday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	if (action.type === "ADD_THURSDAY") {
		//	console.log("reducer_add thursday count", action.data.count);
		let newItems;
		// Check if item exists
		let itemIndex = state.thursday.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.thursday[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated thursday Item", updatedItem);
			newItems = [...state.thursday];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.thursday, action.data];
		}
		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;

		return {
			...state,
			thursday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	if (action.type === "ADD_FRIDAY") {
		//	console.log("reducer_add friday count", action.data.count);
		let newItems;
		// Check if item exists
		let itemIndex = state.friday.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.friday[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated friday Item", updatedItem);
			newItems = [...state.friday];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.friday, action.data];
		}
		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;

		return {
			...state,
			friday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "ADD_FROZEN") {
		//	console.log("reducer_add frozen count", action.data.count);
		let newItems;
		// Check if item exists
		let itemIndex = state.frozen.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.frozen[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated frozen Item", updatedItem);
			newItems = [...state.frozen];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.frozen, action.data];
		}
		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;

		return {
			...state,
			frozen: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "ADD_PROMOTION") {
		//	console.log("reducer_add promotion count", action.data.count);
		let newItems;
		// Check if item exists
		let itemIndex = state.promotion.findIndex(
			(item) => item.id === action.data.id
		);
		let existingItem = state.promotion[itemIndex];

		// Update items array
		if (existingItem) {
			// Update only the count of the item
			let updatedItem = {
				...existingItem,
				count: existingItem.count + 1,
			};
			//	console.log("updated promotion Item", updatedItem);
			newItems = [...state.promotion];
			newItems[itemIndex] = updatedItem;
		} else {
			newItems = [...state.promotion, action.data];
		}
		let newCount = state.totalCount + 1;
		let newCost = state.totalCost + action.data.cost;
		let newAmount = state.totalAmount + action.data.price;

		return {
			...state,
			promotion: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	// ######################################################################################  REMOVE

	if (action.type === "REMOVE_MONDAY") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.monday.findIndex((item) => item.id === action.id);
		let existingItem = state.monday[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.monday.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.monday];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			monday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "REMOVE_TUESDAY") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.tuesday.findIndex((item) => item.id === action.id);
		let existingItem = state.tuesday[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.tuesday.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.tuesday];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			tuesday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "REMOVE_WEDNESDAY") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.wednesday.findIndex((item) => item.id === action.id);
		let existingItem = state.wednesday[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.wednesday.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.wednesday];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			wednesday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "REMOVE_THURSDAY") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.thursday.findIndex((item) => item.id === action.id);
		let existingItem = state.thursday[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.thursday.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.thursday];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			thursday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	if (action.type === "REMOVE_FRIDAY") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.friday.findIndex((item) => item.id === action.id);
		let existingItem = state.friday[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.friday.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.friday];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			friday: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	// 777777777777777777777777777777777777777777777777777
	if (action.type === "REMOVE_FROZEN") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.frozen.findIndex((item) => item.id === action.id);
		let existingItem = state.frozen[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.frozen.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.frozen];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			frozen: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}

	// 777777777777777777777777777777777777777777777777777

	if (action.type === "REMOVE_PROMOTION") {
		let newItems, newCount, newCost, newAmount;

		// Find item
		let itemIndex = state.promotion.findIndex((item) => item.id === action.id);
		let existingItem = state.promotion[itemIndex];

		if (existingItem) {
			newCount = state.totalCount - 1;
			newCost = state.totalCost - existingItem.cost;
			newAmount = state.totalAmount - existingItem.price;

			// Handle item on decrement
			if (existingItem.count <= 1) {
				// Remove item from cart
				newItems = state.promotion.filter((item) => item.id !== action.id);
			} else {
				// Update item count
				let updatedItem = {
					...existingItem,
					count: existingItem.count - 1,
				};

				newItems = [...state.promotion];
				newItems[itemIndex] = updatedItem;
			}
		} else {
			return state;
		}

		return {
			...state,
			promotion: newItems,
			totalCount: newCount,
			totalCost: newCost,
			totalAmount: newAmount,
		};
	}
	///######################################################################  CART

	if (action.type === "CART") {
		return {
			...state,
			isCartShowing: action.val,
		};
	}

	if (action.type === "RESET") {
		return defaultContext;
		// return {
		// 	...state,
		// 	isCartShowing: action.val,
		// };
	}

	return defaultContext;
};

const CartContextProvider = ({ children }) => {
	const [cartState, cartDispatcher] = useReducer(cartReducer, defaultContext);

	const deliveryRateHandler = (rate) => {
		cartDispatcher({ type: "SET_DELIVERY_RATE", rate: rate });
	};
	const totalDeliveryHandler = (rate) => {
		cartDispatcher({ type: "SET_TOTAL_DELIVERY", rate: rate });
	};

	const addToCartHandler = (item, day) => {
		console.log("addtocart", day, item);
		switch (day) {
			case "monday":
				cartDispatcher({ type: "ADD_MONDAY", data: item });
				break;
			case "tuesday":
				cartDispatcher({ type: "ADD_TUESDAY", data: item });
				break;
			case "wednesday":
				cartDispatcher({ type: "ADD_WEDNESDAY", data: item });
				break;
			case "thursday":
				cartDispatcher({ type: "ADD_THURSDAY", data: item });
				break;
			case "friday":
				cartDispatcher({ type: "ADD_FRIDAY", data: item });
				break;
			case "frozen":
				cartDispatcher({ type: "ADD_FROZEN", data: item });
				break;
			case "promotion":
				cartDispatcher({ type: "ADD_PROMOTION", data: item });
				break;
			default:
				return state;
		}
	};
	/////////////////////////////////////////////////////////////////////

	const removeFromCartHandler = (id, day) => {
		switch (day) {
			case "monday":
				cartDispatcher({ type: "REMOVE_MONDAY", id });
				break;
			case "tuesday":
				cartDispatcher({ type: "REMOVE_TUESDAY", id });
				break;
			case "wednesday":
				cartDispatcher({ type: "REMOVE_WEDNESDAY", id });
				break;
			case "thursday":
				cartDispatcher({ type: "REMOVE_THURSDAY", id });
				break;
			case "friday":
				cartDispatcher({ type: "REMOVE_FRIDAY", id });
				break;
			case "frozen":
				cartDispatcher({ type: "REMOVE_FROZEN", id });
				break;
			case "promotion":
				cartDispatcher({ type: "REMOVE_PROMOTION", id });
				break;
			default:
				return state;
		}
	};

	const showCartHandler = (val) => cartDispatcher({ type: "CART", val });

	const resetCart = (val) => cartDispatcher({ type: "RESET", val });

	const cartContext = {
		monday: cartState.monday,
		tuesday: cartState.tuesday,
		wednesday: cartState.wednesday,
		thursday: cartState.thursday,
		friday: cartState.friday,
		frozen: cartState.frozen,
		promotion: cartState.promotion,
		totalCount: cartState.totalCount,
		totalCost: cartState.totalCost,
		deliveryRate: cartState.deliveryRate,
		totalDelivery: cartState.totalDelivery,
		totalAmount: cartState.totalAmount,
		isCartShowing: cartState.isCartShowing,
		setDeliveryRate: deliveryRateHandler,
		setTotalDelivery: totalDeliveryHandler,
		addItem: addToCartHandler,
		removeItem: removeFromCartHandler,
		showCart: showCartHandler,
		resetCart: resetCart,
	};

	return (
		<CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
	);
};

export default CartContextProvider;

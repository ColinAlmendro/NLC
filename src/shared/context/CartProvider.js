import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultContext = {
    items: [],
    totalAmount: 0,
    isCartShowing: false
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        console.log("reducer_add count",action.data.count)
        let newItems;
        // Check if item exists
        let itemIndex = state.items.findIndex(item => item.id === action.data.id);
        let existingItem = state.items[itemIndex];

        // Update items array
        if (existingItem) {
            // Update only the count of the item
            let updatedItem = {
                ...existingItem,
                count: existingItem.count + action.data.count
            };
            console.log("updatedItem", updatedItem);
            newItems = [...state.items];
            newItems[itemIndex] = updatedItem;
        } else {
            newItems = [...state.items, action.data];
        }

        let newAmount = state.totalAmount + (action.data.price * action.data.count);

        return {
            ...state,
            items: newItems,
            totalAmount: newAmount
        }
    }

    if (action.type === 'REMOVE') {
        let newItems,
            newAmount;

        // Find item
        let itemIndex = state.items.findIndex(item => item.id === action.id);
        let existingItem = state.items[itemIndex];

        if (existingItem) {
            newAmount = state.totalAmount - existingItem.price;

            // Handle item on decrement
            if (existingItem.count <= 1) {
                // Remove item from cart
                newItems = state.items.filter(item => item.id !== action.id);
            } else {
                // Update item count
                let updatedItem = {
                    ...existingItem,
                    count: existingItem.count - 1
                };

                newItems = [...state.items];
                newItems[itemIndex] = updatedItem;
            }
        } else {
            return state;
        }

        return {
            ...state,
            items: newItems,
            totalAmount: newAmount
        }
    }

    if (action.type === 'CART') {
        return {
            ...state,
            isCartShowing: action.val
        };
    }

    return defaultContext;
}

const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatcher] = useReducer(cartReducer, defaultContext);

    const addToCartHandler = item => {
        cartDispatcher({ type: 'ADD', data: item });
    }
;
    const removeFromCartHandler = id => {
        cartDispatcher({ type: 'REMOVE', id });
    }

    const showCartHandler = val => cartDispatcher({type: 'CART', val});

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        isCartShowing: cartState.isCartShowing,
        addItem: addToCartHandler,
        removeItem: removeFromCartHandler,
        showCart: showCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
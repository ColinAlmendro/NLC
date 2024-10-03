import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  isCartShowing: false,
  addItem: (item) => { },
  removeItem: (id) => { }, 
  showCart: () => { }
});

export default CartContext;
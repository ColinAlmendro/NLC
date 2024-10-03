import { useState, useContext } from "react";

import CartCount from "./CartCount";
import CartContext from "../../shared/context/cart-context";
import { Typography } from "@mui/material";

import "./MenuItem.css";

// const getFirstSentence = (text) => {
//     const sentences = text.match(/[^.!?]+[.!?]+/);

//     return sentences ? sentences[0].trim() : text.trim();
// }

const MenuItem = ({ data, id }) => {
	let [count, setCount] = useState(0);
	let { items, addItem, removeItem } = useContext(CartContext);

	const addToCartHandler = (item = data) => {
		// console.log("item",item)
		addItem(item);
		// Update item count in menu
		setCount((prevCount) => prevCount + 1);
	};
	const removeCartHandler = (id) => {
		removeItem(id);
		// Update item count in menu
		setCount((prevCount) => {
			if (prevCount === 0 || items.count === 0) return 0;
			return prevCount - 1;
		});
	};
	// console.log("menuItem data:", data);
	return (
		<div className='wrapper' id={id}>
			<div className='img' width='50px'>
				<img
					src={`${data.image}?w=164&fit=crop&auto=format`}
					alt={data.mainname}
				/>
			</div>
			<div className='desc'>
				<h3>{data.mainname}</h3>
				{data.side && (
					<Typography fontWeight='700'>
						&nbsp; {`& ${data.sidename}`}
					</Typography>
				)}
				{data.main.premium > 0 && (
					<Typography fontWeight='700'>
						<StarOutlineIcon style={{ color: "green" }} sx={{ pb: 1, ml: 1 }} />
					</Typography>
				)}
			</div>
			<div className='price'>
				<span>R{data.price}</span>
				<CartCount
					count={count}
					onAddToCart={addToCartHandler.bind(null, data)}
					onRemoveFromCart={removeCartHandler.bind(null, data.id)}
				/>
			</div>
		</div>
	);
};

export default MenuItem;

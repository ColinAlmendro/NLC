import { useState, useContext } from "react";

import CartCount from "./CartCount";
import CartContext from "../../shared/context/cart-context";

import StarIcon from "@mui/icons-material/Star";
import { Typography, Stack } from "@mui/material";
import "./MenuItem.css";

const MenuItem = ({ data, id, day }) => {
	let [count, setCount] = useState(0);
	let { addItem, removeItem } = useContext(CartContext); //items

	const addToCartHandler = (item = data) => {
		addItem(item, day);

		setCount((prevCount) => prevCount + 1);
	};

	const removeCartHandler = (id) => {
		removeItem(id, day);

		setCount((prevCount) => {
			if (prevCount === 0 || day.count === 0) return 0;
			return prevCount - 1;
		});
	};

	return (
		<div className='wrapper' id={id}>
			<div className='item_img' width='50px'>
				<img
					src={`${data.image}?w=164&fit=crop&auto=format`}
					alt={data.mainname || data.name}
				/>
			</div>
			<div className='desc'>
				<Stack direction='row'>
					{day !== "promotion" ? (
						<>
							<h4>{data.mainname}</h4>
							<div>
								<Typography fontWeight='500'>
									&nbsp; {` ${data.maindescription}`}
								</Typography>
								{data.main.premium > 0 && (
									<Typography fontWeight='700'>
										<StarIcon
											size='medium'
											style={{ color: "green" }}
											sx={{ pb: 1, ml: 1 }}
										/>
									</Typography>
								)}
							</div>
						</>
					) : (
						<Stack>
							<h4>{data.name}</h4>
							<div>
								<Typography fontWeight='500'>
									&nbsp; {` ${data.description}`}
								</Typography>
							</div>
						</Stack>
					)}
				</Stack>

				{data.side && (
					<Typography fontWeight='500'>
						&nbsp; {`& ${data.sidename}`}
					</Typography>
				)}
			</div>
			<div className='price'>
				<span>R{data.price}</span>

				<CartCount
					count={count}
					onAddToCart={addToCartHandler.bind(null, data)}
					onRemoveFromCart={removeCartHandler.bind(null, data.id)}
					showCount='false'
				/>
			</div>
		</div>
	);
};

export default MenuItem;

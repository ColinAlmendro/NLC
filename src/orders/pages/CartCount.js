import { useEffect, useState } from "react";
import { IconButton ,Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./CartCount.css";

const CartCount = ({ count, onAddToCart, onRemoveFromCart, showCount }) => {
	
	return (
		<div>
			{showCount === "true" && (
				<>
					<IconButton onClick={onRemoveFromCart}>
						<RemoveCircleOutlineIcon />
					</IconButton>
					<span className='count'>{count}</span>
				</>
			)}
			{showCount === "true" ? (
				<IconButton onClick={onAddToCart}>
					
					<AddCircleOutlineIcon />
				</IconButton>
			) : (
				<Button
					startIcon={<AddCircleOutlineIcon />}
					variant='contained'
					aria-label='Add Item'
					size='small'
					color='success'
					onClick={onAddToCart}
				>
					Add Item
				</Button>
			)}
		</div>
	);
};

export default CartCount;

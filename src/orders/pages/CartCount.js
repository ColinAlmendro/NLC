import "./CartCount.css";

const CartCount = ({ count, onAddToCart, onRemoveFromCart }) => {
	return (
		<div>
			<button type='button' className='cartBtnRem' onClick={onRemoveFromCart}>
				&#8722;
			</button>
			<span className='count'>{count}</span>
			<button type='button' className='cartBtnAdd' onClick={onAddToCart}>
				&#43;
			</button>
		</div>
	);
};

export default CartCount;

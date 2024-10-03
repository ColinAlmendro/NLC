import { useContext ,useState} from "react";

// import Modal from "./Modal";
import CartContext from "../../shared/context/cart-context";
import CartCount from "./CartCount";

import "./CartList.css";

const CartList = (props) => {
	let { items, totalAmount, addItem, removeItem } = useContext(CartContext);

	const { openCartPopup, setOpenCartPopup } = props;
	const [openCart, setCartOpen] = useState(false);

	return (
		
		<>
			<div className="items_wrapper">
				<ul>
					{items.map((item, i) => {
						let itemTotalAmnt = (item.count * item.price).toFixed(2);
						let id = item.id;

						const addItemHandler = () => {
							addItem(item);
						};

						const rmvItemHandler = () => {
							removeItem(id);
						};

						return (
							<li key={i} className="cartlist_item">
								<span className="cartlist_img">
									<img src={item.image} alt={item.title} />
								</span>
								<span className="cartlist_content">
									<span>{item.title}</span>
									<br />
									<span>
										{item.count} &times; R{item.price}
									</span>
								</span>
								<span className="cartlist_action">
									<span>R{itemTotalAmnt}</span>
									<br />
									<CartCount
										count={item.count}
										onAddToCart={addItemHandler}
										onRemoveFromCart={rmvItemHandler}
									/>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="total_wrapper">
				<span>Total Amount</span>
				<span>R{totalAmount.toFixed(2)}</span>
			</div>
			</>
	
	);
};

export default CartList;

import { Fragment, useContext } from 'react';
import { createPortal } from 'react-dom';

import CartContext from "../../shared/context/cart-context";

import './Modal.css';

const Backdrop = () => {
    let { showCart } = useContext(CartContext);

    const showCartHandler = e => {
        if(e.target.classList[0].includes('backdrop')) {
            showCart(false);
        } 
    }

    return (
        <div className="backdrop"  onClick={showCartHandler}></div>
    )
};

const OverlayContent = (props) => {
    return (
        <div className="overlay">
            {props.children}
        </div>
    )
}


const Modal = (props) => {
    return(
        <Fragment>
            {createPortal(<Backdrop />, document.querySelector('#overlays-root'))}
            {createPortal((<OverlayContent>{props.children}</OverlayContent>), document.querySelector('#overlays-root'))}
        </Fragment>
    )
}

export default Modal;
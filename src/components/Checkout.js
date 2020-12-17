import _ from 'lodash';
import './css/checkout.css';
import Subtotal from './Subtotal';
import { useStateValue } from './../statemangement/StateProvider';
import ProductList from './ProductList';
import ViewedProducts from './ViewedProducts';

export const getTotalItems = cart => {
    return cart
        ? cart.reduce((acc, e) => acc + parseInt(e.quantity), 0)
        : 0;
}

export const getSubTotal = cart => {
    const subtotal = cart
        ? cart.reduce((acc, e) => acc + e.price * e.quantity, 0)
        : 0;
    return _.round(subtotal, 2);
}

const Checkout = () => {
    const [{ cart }] = useStateValue();
    return (
        <div className='checkout'>
            <div className="checkout_left">
                <div className="checkout_left_title">
                    <h2>Shopping Cart</h2>
                    <span><small>Price</small></span>
                </div>
                {cart && cart.map((item, index) => <ProductList
                    key={index}
                    id={item.id}
                />)}
                <div className="checkout_left_footer">
                    <h2>
                        Subtotal ({getTotalItems(cart)} items): ${getSubTotal(cart)}
                    </h2>
                </div>
            </div>
            <div className="checkout_right">

                <Subtotal cart={cart} />
                <ViewedProducts />
            </div>

        </div>
    );
}

export default Checkout;
import { getSubTotal, getTotalItems } from './Checkout';

const Subtotal = ({ cart }) => {
    return (
        <div className='checkout_subtotal'>
            <div className="checkout_subtotal_title">
                <h2>Subtotal ({getTotalItems(cart)} items):</h2>
            </div>
            <h2><strong>{`$${getSubTotal(cart)}`}</strong></h2>
            <small>
                <input
                    className='subtotal_gift'
                    type="checkbox" />
                            This order contains a gift
                        </small>
            <button>Proceed to checkout</button>
        </div>
    );
}

export default Subtotal
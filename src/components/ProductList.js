import './css/productlist.css'
import { Link } from 'react-router-dom';
import { useStateValue } from './../statemangement/StateProvider';
import { deleteLocalItem, updateToLocal } from './../statemangement/localstorage';
import ItemQty from './ItemQty';

const ProductList = ({ id }) => {
    const [state, dispatch] = useStateValue();
    const item = state.cart.find(e => e.id === id);
    if (!item) return null;
    const { title, price, image } = item;
    const handleDelete = id => {
        dispatch({
            type: "DELETE_ITEM",
            id: id,
        });
        deleteLocalItem('items', id);
    }
    const handleQtyUpdate = qty => {
        dispatch({
            type: "UPDATE_ITEM",
            item: {
                id,
                quantity: qty
            }
        });
        updateToLocal('items', { id, quantity: qty });
    }
    return (
        <div className="product_list">
            <div className="product_list_img">
                <Link to={`/products/${id}`} ><img src={image} alt="" /></Link>
            </div>
            <div className="product_list_desc">
                <li><h2><Link to={`/products/${id}`} >{title}</Link></h2></li>
                <li><small>In Stock</small></li>
                <li><input type="checkbox" /><span><small>This is a gift</small></span></li>
                <li>
                    <ItemQty
                        item={item}
                        onClick={handleQtyUpdate}
                    />
                    <span onClick={() => handleDelete(id)}><small>Delete</small></span>
                    <span><small>Save for later</small></span>
                    <span><small>Compare with similar items</small></span>
                </li>
            </div>
            <div className="product_list_price">
                <h2>${price}</h2>
            </div>
        </div>
    );
}

export default ProductList;
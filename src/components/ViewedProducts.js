import { Link } from 'react-router-dom';
import { getItemById, getProductRating } from '../services/products';
import './css/viewedproducts.css';
import { useStateValue } from './../statemangement/StateProvider';



const ViewedProducts = () => {
    const [{ viewed }, dispatch] = useStateValue();
    if (!viewed) return null;

    const addToCart = ({ id, title, image, price, rating }) => {
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id,
                title,
                image,
                price,
                rating,
                quantity: 1
            }
        });
    }

    return (
        <>
            <div className="viewed_title"><h3><small>You recently viewed items</small></h3></div>
            <div className="viewed" >
                {
                    viewed
                        .map(item => {
                            const { id, image, title, rating, price } = item;
                            return <div className='viewed_row' key={id}>
                                <div className="viewed_product_img">
                                    <Link to={`/products/${id}`}><img src={image} alt="" /></Link>
                                </div>
                                <div className="viewed_product_detail">
                                    <li><Link to={`/products/${id}`}><small>{title}</small></Link></li>
                                    <li><small>{getProductRating(rating)}</small></li>
                                    <li><small>Price: {price}</small></li>
                                    <button onClick={() => addToCart(item)}>Add to cart</button>
                                </div>
                            </div>
                        })
                }
            </div>
        </>
    );
}

export default ViewedProducts;
import React from 'react';
import { Link } from 'react-router-dom';
import './css/product.css';
import { useStateValue } from './../statemangement/StateProvider';
import { getItemById } from '../services/products';
import { getProductRating } from './../services/products';

const Product = ({ id }) => {
    const { title, price, image, rating } = getItemById(id);
    const [, dispatch] = useStateValue();

    const addToCart = () => {
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
        <div className="product">
            <div className="product_info">
                <Link to={`/products/${id}`} ><p>{title}</p></Link>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    <p >{getProductRating(rating)}
                    </p>
                </div>
            </div>
            <Link to={`/products/${id}`}><img src={image} alt="" /></Link>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
};

export default Product;
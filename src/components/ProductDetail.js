import { useParams } from "react-router-dom";
import { useStateValue } from './../statemangement/StateProvider';
import { useEffect, useState } from 'react';
import { getItemById, getProductRating } from "../services/products";
import './css/productdetail.css';
import ViewedProducts from './ViewedProducts';

const ProductDetail = () => {
    const { id } = useParams();
    const [, dispatch] = useStateValue();
    const item = getItemById(id);
    const { title, price, rating, description, image, imagelist } = item;
    const [selectedimg, setSelectedImg] = useState(0);
    useEffect(() => {
        dispatch({
            type: 'ADD_VIEWED_ITEMS',
            item,
        });
    }, [])

    const handleSelectImg = index => {
        setSelectedImg(index);
    }

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
        <>
            <div className='product_detail'>
                <div className="imagelist">
                    {imagelist.length > 0 &&
                        imagelist.map((e, index) => <img
                            className={selectedimg === index ? 'selected' : ''}
                            src={e}
                            onClick={() => handleSelectImg(index)}
                        />)
                    }
                </div>
                <div className="product_image">
                    <img src={imagelist[selectedimg]} alt={title} />
                </div>
                <div className="product_content">
                    <h1>{title}</h1>
                    <p className="product_price">
                        <span>Price: </span><small>$</small>
                        <strong>{price}</strong>
                    </p>
                    <p >{getProductRating(rating)}</p>
                    <p>`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sociis natoque penatibus et magnis. Neque sodales ut etiam sit amet nisl purus in mollis. Non blandit massa enim nec dui. Dictum non consectetur a erat nam at lectus. Porttitor massa id neque aliquam vestibulum morbi. Rutrum tellus pellentesque eu tincidunt tortor aliquam. Dignissim enim sit amet venenatis. Nullam non nisi est sit amet facilisis. Eget arcu dictum varius duis at consectetur lorem donec.

                    Nisi lacus sed viverra tellus in hac habitasse. Luctus accumsan tortor posuere ac ut. Morbi tristique senectus et netus et malesuada fames ac turpis. Ut etiam sit amet nisl. Quam viverra orci sagittis eu volutpat odio. Suspendisse potenti nullam ac tortor vitae purus faucibus. Luctus accumsan tortor posuere ac ut consequat semper viverra. Sapien pellentesque habitant morbi tristique. Nisl suscipit adipiscing bibendum est ultricies integer quis. Vel eros donec ac odio tempor orci dapibus. Imperdiet proin fermentum leo vel orci porta non pulvinar. Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Molestie at elementum eu facilisis sed odio. Cursus in hac habitasse platea dictumst. Diam volutpat commodo sed egestas egestas.

Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Non curabitur gravida arcu ac tortor dignissim convallis aenean et. Malesuada fames ac turpis egestas maecenas. Pharetra sit amet aliquam id diam maecenas. Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Diam ut venenatis tellus in metus vulputate eu. Dictum non consectetur a erat nam at lectus urna duis. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Adipiscing at in tellus integer feugiat scelerisque varius. Amet consectetur adipiscing elit ut aliquam purus sit amet. Arcu vitae elementum curabitur vitae. Vitae tempus quam pellentesque nec nam. Urna duis convallis convallis tellus id interdum. Amet nisl purus in mollis nunc.`</p>
                    <div className='product_detail_button'><button onClick={addToCart}>Add to cart</button></div>
                </div>
            </div>
            <div className="viewedproduct">

                <ViewedProducts />
            </div>
        </>
    );
}

export default ProductDetail;
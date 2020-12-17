import React from 'react';
import { Search } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './css/header.css'
import logo from '../img/amazon.png';
import { Link } from 'react-router-dom';
import { useStateValue } from './../statemangement/StateProvider';
import { getTotalItems } from './Checkout';
import { logout, saveItemsToLocal } from './../statemangement/localstorage';


const Header = () => {
    const [state, dispatch] = useStateValue();
    const { user, cart, viewed } = state;
    const handleLogout = () => {
        let obj;
        if (cart) obj = { cart: cart.map(e => ({ id: e.id, quantity: e.quantity })) }
        if (viewed) obj = { ...obj, viewed: viewed.map(e => ({ id: e.id, quantity: e.quantity })) }
        console.log('logout', obj);
        if (obj) saveItemsToLocal(user, obj);
        dispatch({
            type: 'LOG_OUT'
        })
        logout('user');
        window.location = '/amazoo';
    }
    return (
        <div className="header">
            <div className="header_logo">
                <Link to="/">
                    <img className="logo" src={logo} alt="amazoo" />
                </Link>
            </div>
            <div className="header_search">
                <input type="text" className='searchbox' placeholder="search..." />
                <Search className='search_button' fontSize="large" />
            </div>
            <div className="header_nav">
                {user ?
                    <div className="header_option">
                        <span className="header_optionline1">
                            Hello, {user}
                        </span>
                        <span className="header_optionline2" onClick={handleLogout}>
                            Logout
                    </span>
                    </div>
                    : <Link to='/login'>
                        <div className="header_option">
                            <span className="header_optionline1">
                                Hello, Sign in
                    </span>
                            <span className="header_optionline2">
                                Account
                    </span>
                        </div>
                    </Link>}

                <Link to={user ? '/login' : ''}>
                    <div className="header_option">
                        <span className="header_optionline1">
                            Returns
                    </span>
                        <span className="header_optionline2">
                            & Orders
                    </span>
                    </div>
                </Link>
                <Link className='shopping_cart' to="/checkout">
                    <div className="header_shoppingcart">
                        <ShoppingCartIcon fontSize="large" />
                        <span className="header_shoppingcartcount">{getTotalItems(cart)}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;
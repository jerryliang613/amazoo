import React from 'react';
import './css/home.css';
import computer from '../img/computer.jpg';
import Product from './Product';

const Home = () => {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_img" src={computer} alt="" />
                <div className="home_row">
                    <Product id='1' />
                    <Product id='2' />
                </div>
                <div className="home_row">
                    <Product id='3' />
                    <Product id='4' />
                    <Product id='5' />
                </div>
                <div className="home_row">
                    <Product id='6' />
                </div>
            </div>
        </div>
    )

}

export default Home;
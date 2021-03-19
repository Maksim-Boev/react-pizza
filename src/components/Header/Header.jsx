import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/pizza-logo.svg';
import ButtonCart from '../ButtonCart';

const Header = () => {
  const { totalPrice, total } = useSelector(({ cart }) => ({
    totalPrice: cart.totalPrice,
    total: cart.total,
  }));
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <div className="header__cart">
          <Route exact path="/">
            <Link to="/cart">
              <ButtonCart totalPrice={totalPrice} total={total} />
            </Link>
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Header;

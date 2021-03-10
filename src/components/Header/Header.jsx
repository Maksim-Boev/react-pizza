import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../../assets/img/pizza-logo.svg';
import ButtonCart from '../ButtonCart';

const Header = () => {
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
              <ButtonCart />
            </Link>
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Header;

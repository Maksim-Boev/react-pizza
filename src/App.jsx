import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import setPizzasAction from './redux/actions/pizzas';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = ({ items, setPizzas }) => {
  useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      setPizzas(data.pizzas);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path="/" render={() => <Home pizzas={items} />} />
        <Route exact path="/cart" component={Cart} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ pizzas }) => {
  return {
    items: pizzas.items,
  };
};

const mapDispatchToProps = {
  setPizzas: setPizzasAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

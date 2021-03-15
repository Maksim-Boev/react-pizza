import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import setPizzas from './redux/actions/pizzas';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = () => {
  const items = useSelector((state) => state.pizzas.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      dispatch(setPizzas(data.pizzas));
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

export default App;

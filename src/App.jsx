import React, { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import setPizzas from './redux/actions/pizzas';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3004/pizzas').then(({ data }) => {
      dispatch(setPizzas(data));
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
      </div>
    </div>
  );
};

export default App;

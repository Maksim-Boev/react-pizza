import React from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaItem from '../components/PizzaItem';

const Home = () => {
  const pizzas = useSelector((state) => state.pizzas.items);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza, index) => (
          <PizzaItem key={index.toString()} data={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;

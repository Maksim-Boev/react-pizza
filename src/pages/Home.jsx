import React from 'react';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaItem from '../components/PizzaItem';

const Home = ({ pizzas }) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={(category) => console.log(category)} />
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

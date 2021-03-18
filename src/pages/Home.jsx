import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaItem from '../components/PizzaItem';
import { fetchPizzas } from '../redux/actions/pizzas';
import Loader from '../components/Loader';

const Home = () => {
  const pizzas = useSelector((state) => state.pizzas.items);
  const isLoaded = useSelector((state) => state.pizzas.isLoaded);
  const { category, sortBy } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchPizzas(category, sortBy));
    }
  }, [isLoaded]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category} />
        <SortPopup activeSort={sortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas.map((pizza, index) => (
              <PizzaItem key={index.toString()} data={pizza} />
            ))
          : Array.from({ length: 6 }, (v, k) => <Loader key={k.toString()} />)}
      </div>
    </div>
  );
};

export default Home;

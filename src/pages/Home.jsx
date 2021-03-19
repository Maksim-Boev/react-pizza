import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaItem from '../components/PizzaItem';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';
import Loader from '../components/Loader';

const Home = () => {
  const { isLoaded, items } = useSelector(({ pizzas }) => pizzas);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) {
      dispatch(fetchPizzas(category, sortBy));
    }
  }, [isLoaded]);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories activeCategory={category} />
        <SortPopup activeSort={sortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((pizza, index) => (
              <PizzaItem
                onClickAddPizza={handleAddPizzaToCart}
                key={index.toString()}
                allPizzaItem={cart[pizza.id] && cart[pizza.id].addedPizza.length}
                data={pizza}
              />
            ))
          : Array.from({ length: 6 }, (v, k) => <Loader key={k.toString()} />)}
      </div>
    </div>
  );
};

export default Home;

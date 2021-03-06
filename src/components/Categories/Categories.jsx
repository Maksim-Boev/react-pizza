import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/actions/filters';

import CategoriesItem from '../CategoriesItem';
import { setLoaded } from '../../redux/actions/pizzas';

const Categories = memo(({ activeCategory }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const listCategories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFirstRender) {
      dispatch(setLoaded());
    }
    setIsFirstRender(false);
  }, [activeCategory]);

  return (
    <div className="categories">
      <ul>
        <button
          type="button"
          className={activeCategory === null ? 'active' : ''}
          onClick={() => dispatch(setCategory(null))}
        >
          Все
        </button>
        {listCategories.map((category, index) => {
          return (
            <CategoriesItem
              key={index.toString()}
              category={category}
              onSelectItem={index === activeCategory ? 'active' : ''}
              onClickItem={() => dispatch(setCategory(index))}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;

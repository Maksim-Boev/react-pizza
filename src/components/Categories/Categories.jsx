import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/actions/filters';

import CategoriesItem from '../CategoriesItem';

const Categories = memo(() => {
  const [activeItem, setActiveItem] = useState(null);
  const listCategories = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory(activeItem));
  }, [activeItem]);

  return (
    <div className="categories">
      <ul>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <li
          className={activeItem === null ? 'active' : ''}
          onClick={() => setActiveItem(null)}
        >
          Все
        </li>
        {listCategories.map((category, index) => {
          return (
            <CategoriesItem
              key={index.toString()}
              category={category}
              onSelectItem={index === activeItem ? 'active' : ''}
              onClickItem={() => setActiveItem(index)}
            />
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;

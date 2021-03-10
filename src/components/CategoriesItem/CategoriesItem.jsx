import React from 'react';

const CategoriesItem = ({ category, onClickItem, onSelectItem }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li className={onSelectItem} onClick={() => onClickItem()}>
      {category}
    </li>
  );
};

export default CategoriesItem;

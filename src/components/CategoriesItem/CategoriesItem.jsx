import React from 'react';

const CategoriesItem = ({ category, onClickItem, onSelectItem }) => {
  return (
    <button type="button" className={onSelectItem} onClick={() => onClickItem()}>
      {category}
    </button>
  );
};

export default CategoriesItem;

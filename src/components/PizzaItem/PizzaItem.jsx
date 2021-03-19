import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonAddPizza from '../ButtonAddPizza';

const PizzaItem = ({ data, onClickAddPizza, allPizzaItem }) => {
  const { sizes, types, imageUrl, price, name, id } = data;
  const [pizzaSize, setActiveSize] = useState(sizes[0]);
  const [doughType, setDoughType] = useState(types[0]);
  const availableType = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];

  const onAddPizza = () => {
    const addedPizza = {
      id,
      name,
      imageUrl,
      price,
      sizes: pizzaSize,
      type: availableType[doughType],
    };
    onClickAddPizza(addedPizza);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableType.map((itemType, index) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li
                key={itemType}
                onClick={() => {
                  setDoughType(index);
                }}
                className={
                  (doughType === index ? 'active' : '') +
                  (!types.includes(index) ? 'disabled' : '')
                }
              >
                {itemType}
              </li>
            );
          })}
        </ul>
        <ul>
          {availableSizes.map((size) => {
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li
                key={size.toString()}
                onClick={() => {
                  setActiveSize(size);
                }}
                className={
                  (pizzaSize === size ? 'active' : '') +
                  (!sizes.includes(size) ? 'disabled' : '')
                }
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <ButtonAddPizza onClick={onAddPizza} total={allPizzaItem} />
      </div>
    </div>
  );
};

PizzaItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onClickAddPizza: PropTypes.func.isRequired,
};

export default PizzaItem;

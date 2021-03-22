// eslint-disable-next-line import/prefer-default-export
export const addPizzaToCart = (payload) => ({
  type: 'ADD_PIZZA_TO_CART',
  payload,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const removeCartItem = (id) => ({
  type: 'REMOVE_CART_ITEM',
  payload: id,
});
export const plusCartItem = (obj) => {
  return {
    type: 'PLUS_CART_ITEM',
    payload: obj,
  };
};

export const minusCartItem = (id) => ({
  type: 'MINUS_CART_ITEM',
  payload: id,
});

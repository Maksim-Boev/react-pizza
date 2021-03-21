// eslint-disable-next-line import/prefer-default-export
export const addPizzaToCart = (payload) => ({
  type: 'ADD_PIZZA_TO_CART',
  payload,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

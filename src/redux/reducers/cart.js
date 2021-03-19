const initialState = {
  items: {},
  totalPrice: 0,
  total: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART':
      // eslint-disable-next-line no-case-declarations
      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };

      // eslint-disable-next-line no-case-declarations,prefer-spread
      const allPizzas = [].concat.apply([], Object.values(newItems));

      return {
        ...state,
        items: newItems,
        // eslint-disable-next-line prefer-spread
        total: allPizzas.length,
        totalPrice: allPizzas.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price;
        }, 0),
      };
    default:
      return state;
  }
};

export default cart;

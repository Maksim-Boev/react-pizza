const initialState = {
  items: {},
  totalPrice: 0,
  total: 0,
};

const getTotalPrice = (arr) =>
  arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART':
      // eslint-disable-next-line no-case-declarations
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].addedPizza, action.payload];
      // eslint-disable-next-line no-case-declarations
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          addedPizza: currentPizzaItems,
          totalPriceAdded: getTotalPrice(currentPizzaItems),
        },
      };
      // eslint-disable-next-line no-case-declarations
      const addedPizza = Object.values(newItems).map((obj) => obj.addedPizza);
      // eslint-disable-next-line no-case-declarations,prefer-spread
      const allPizzas = [].concat.apply([], addedPizza);

      return {
        ...state,
        items: newItems,
        // eslint-disable-next-line prefer-spread
        total: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
      };
    case 'CLEAR_CART':
      return {
        totalPrice: 0,
        total: 0,
        items: {},
      };
    default:
      return state;
  }
};

export default cart;

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
    case 'ADD_PIZZA_TO_CART': {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].addedPizza, action.payload];
      const newItems = {
        ...state.items,
        [action.payload.id]: {
          addedPizza: currentPizzaItems,
          totalPriceAdded: getTotalPrice(currentPizzaItems),
        },
      };
      const addedPizza = Object.values(newItems).map((obj) => obj.addedPizza);

      // eslint-disable-next-line prefer-spread
      const allPizzas = [].concat.apply([], addedPizza);

      return {
        ...state,
        items: newItems,
        total: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
      };
    }
    case 'CLEAR_CART':
      return {
        totalPrice: 0,
        total: 0,
        items: {},
      };
    case 'REMOVE_CART_ITEM': {
      const newAddedItems = { ...state.items };
      const currentTotalPrice = newAddedItems[action.payload].totalPriceAdded;
      const currentTotal = newAddedItems[action.payload].addedPizza.length;
      delete newAddedItems[action.payload];
      return {
        ...state,
        items: newAddedItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        total: state.total - currentTotal,
      };
    }
    case 'PLUS_CART_ITEM': {
      const newItems = [
        ...state.items[action.payload.id].addedPizza,
        state.items[action.payload.id].addedPizza[0],
      ];

      const stateItems = Object.values({ ...state.items });

      const currentTotalPrice = stateItems
        .map(({ totalPriceAdded }) => totalPriceAdded)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      const currentTotal = stateItems
        .map(({ addedPizza }) => {
          return addedPizza.length;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            addedPizza: newItems,
            totalPriceAdded: getTotalPrice(newItems),
          },
        },
        totalPrice: currentTotalPrice + action.payload.price,
        total: currentTotal + 1,
      };
    }
    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload.id].addedPizza;
      const newItems =
        oldItems.length > 1
          ? [...state.items[action.payload.id].addedPizza.slice(1)]
          : oldItems;

      const stateItems = Object.values({ ...state.items });

      const currentTotal = stateItems
        .map(({ addedPizza }) => {
          return addedPizza.length;
        })
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);

      const currentTotalPrice = stateItems
        .map(({ totalPriceAdded }) => totalPriceAdded)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            addedPizza: newItems,
            totalPriceAdded: getTotalPrice(newItems),
          },
        },
        totalPrice:
          oldItems.length > 1
            ? currentTotalPrice - action.payload.price
            : currentTotalPrice,
        total: oldItems.length > 1 ? currentTotal - 1 : currentTotal,
      };
    }
    default:
      return state;
  }
};

export default cart;

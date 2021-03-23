const initialState = {
  items: {},
  totalPrice: 0,
  total: 0,
};

const getTotalPrice = (arr) =>
  arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

const allPizzas = (state) =>
  Object.values(state)
    .map((obj) => obj.addedPizza)
    .flat();

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

      return {
        ...state,
        items: newItems,
        total: allPizzas(newItems).length,
        totalPrice: getTotalPrice(allPizzas(newItems)),
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
      const currentTotalPriceAdded = newAddedItems[action.payload].totalPriceAdded;
      const currentTotalAdded = newAddedItems[action.payload].addedPizza.length;
      delete newAddedItems[action.payload];
      return {
        ...state,
        items: newAddedItems,
        totalPrice: state.totalPrice - currentTotalPriceAdded,
        total: state.total - currentTotalAdded,
      };
    }
    case 'PLUS_CART_ITEM': {
      const newItems = [
        ...state.items[action.payload.id].addedPizza,
        state.items[action.payload.id].addedPizza[0],
      ];

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            addedPizza: newItems,
            totalPriceAdded: getTotalPrice(newItems),
          },
        },
        total: allPizzas({ ...state.items }).length + 1,
        totalPrice: getTotalPrice(allPizzas({ ...state.items })) + action.payload.price,
      };
    }
    case 'MINUS_CART_ITEM': {
      const oldItems = state.items[action.payload.id].addedPizza;
      const newItems =
        oldItems.length > 1
          ? [...state.items[action.payload.id].addedPizza.slice(1)]
          : oldItems;

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
            ? getTotalPrice(allPizzas({ ...state.items })) - action.payload.price
            : getTotalPrice(allPizzas({ ...state.items })),
        total:
          oldItems.length > 1
            ? allPizzas({ ...state.items }).length - 1
            : allPizzas({ ...state.items }).length,
      };
    }
    default:
      return state;
  }
};

export default cart;

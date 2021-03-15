import axios from 'axios';

export const setPizzas = (items) => ({ type: 'SET_PIZZAS', payload: items });

export const fetchPizzas = () => (dispatch) => {
  axios.get('http://localhost:3004/pizzas').then(({ data }) => {
    dispatch(setPizzas(data));
  });
};

import axios from 'axios';

export const setLoaded = () => ({
  type: 'SET_LOADED',
});

export const setPizzas = (items) => ({ type: 'SET_PIZZAS', payload: items });

export const fetchPizzas = (category, sort) => (dispatch) => {
  axios
    .get(
      `/pizzas${category !== null ? `?category=${category}` : '?'}` +
        `${
          sort === 'rating'
            ? '&_sort=rating&_order=asc'
            : `&_sort=${sort.type}&_order=${sort.order}`
        }`
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    });
};

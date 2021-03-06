import React, { useState, useEffect, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../redux/actions/filters';
import { setLoaded } from '../../redux/actions/pizzas';

const SortPopup = memo(() => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const sortRef = useRef();
  const dispatch = useDispatch();

  const popupItems = [
    { name: 'популярности', type: 'rating', order: 'asc' },
    { name: 'цене по возрастанию', type: 'price', order: 'asc' },
    { name: 'цене по убыванию', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
  ];

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    });
  }, [activeItem]);

  const onActiveItem = (index) => {
    setActiveItem(index);
    dispatch(setSortBy(popupItems[index]));
    dispatch(setLoaded());
    setVisiblePopup(false);
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visiblePopup ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <span onClick={() => setVisiblePopup(!visiblePopup)}>
          {popupItems[activeItem].name}
        </span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {popupItems.map(({ name }, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li
                key={name}
                onClick={() => onActiveItem(index)}
                className={activeItem === index ? 'active' : ''}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;

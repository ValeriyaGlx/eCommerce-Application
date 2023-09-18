import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { CATEGORIES_OF_PRODUCTS as categories } from '../../constants/productsConstant/productsConstants';
import Button from '../../shared/components/Button/Button';
import { setCurrentPage } from '../../app/store/actions/paginationAction/paginationSlice';
import { store } from '../../app/store/store';

type RootState = ReturnType<typeof store.getState>;

const CategoryNavigation = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const handleCategoryClick = async (data: string) => {
    dispatch(setCurrentPage(1));
    if (data !== 'All Categories') {
      navigate(`/products/${data}`);
    }
  };

  return (
    <nav className={'products-nav'}>
      {categories.map(({ data, value, id }) => (
        <Button
          key={id}
          className={`products-nav-item ${
            value === '' ? 'products-nav-item_active' : ''
          }`}
          data={data}
          onClick={() => handleCategoryClick(data)}
        />
      ))}
    </nav>
  );
};

export default CategoryNavigation;

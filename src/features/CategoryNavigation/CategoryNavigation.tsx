import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CATEGORIES_OF_PRODUCTS as categories } from '../../constants/productsConstant/productsConstants';
import Button from '../../shared/components/Button/Button';

const CategoryNavigation = () => {
  const navigate = useNavigate();
  const handleCategoryClick = async (data: string) => {
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

import React from 'react';

import ListOfProductsWithNavigation from '../../widgets/ListOfProductsWithNavigation/ListOfProductsWithNavigation';
import Button from '../../shared/components/Button/Button';
import './_ProductWithNavigation.scss';

function clickNavigation() {
  console.log(1);
}

interface ProductWithNavigationProps {
  category: string;
  subCategory?: string;
}

const ProductWithNavigation: React.FC<ProductWithNavigationProps> = ({
  category,
  subCategory,
}) => {
  return (
    <>
      <ListOfProductsWithNavigation
        category={category}
        subCategory={subCategory}
      />
      <div className={'wrapper-pagination'}>
        <nav className='pagination'>
          <Button
            className={'icon-pagination'}
            data={'<'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-pagination active'}
            data={'1'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-pagination'}
            data={'2'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-pagination'}
            data={'3'}
            onClick={clickNavigation}
          />
          <Button
            className={'icon-pagination'}
            data={'>'}
            onClick={clickNavigation}
          />
        </nav>
      </div>
    </>
  );
};

export default ProductWithNavigation;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import ListOfProductsWithNavigation from '../../widgets/ListOfProductsWithNavigation/ListOfProductsWithNavigation';
import Button from '../../shared/components/Button/Button';
import './_ProductWithNavigation.scss';
import { store } from '../../app/store/store';
import { getAccessToken } from '../../widgets/SignUpSection/usage/ApiRegistration';
import { AllProductsRequest } from '../../widgets/ListOfProductsWithNavigation/ApiProduct';
import setToken from '../../shared/cookie/setToken';
import { setCurrentPage } from '../../app/store/actions/paginationAction/paginationSlice';

interface ProductWithNavigationProps {
  category: string;
  subCategory?: string;
}

type RootState = ReturnType<typeof store.getState>;

const ProductWithNavigation: React.FC<ProductWithNavigationProps> = ({
  category,
  subCategory,
}) => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const [isToken, setIsToken] = useState('');
  const [numberOfPage, setNumberOfPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenResponse = await getAccessToken();
        const token = tokenResponse.access_token;
        setIsToken(token);
        setToken('accessToken', token);
        const numberOfProducts = await AllProductsRequest(token);
        const numberOfProductToPage = 2;
        setNumberOfPage(Math.ceil(numberOfProducts / numberOfProductToPage));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [currentPage]);

  function clickNavigation(event: React.MouseEvent) {
    const data = event.target as HTMLElement;
    const number = data.innerHTML;
    if (number === '<') {
      dispatch(setCurrentPage(1));
    } else if (number === '>') {
      dispatch(setCurrentPage(numberOfPage));
    } else {
      dispatch(setCurrentPage(+number));
    }
  }

  return (
    <>
      <ListOfProductsWithNavigation
        category={category}
        subCategory={subCategory}
        token={isToken}
      />
      <div className={'wrapper-pagination'}>
        <nav className='pagination'>
          <Button
            className={'icon-pagination'}
            data={'<'}
            onClick={clickNavigation}
          />
          {Array.from({ length: numberOfPage }).map((_, index) => (
            <Button
              className={`icon-pagination ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              key={Math.random()}
              onClick={clickNavigation}
              data={String(index + 1)}
            />
          ))}
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

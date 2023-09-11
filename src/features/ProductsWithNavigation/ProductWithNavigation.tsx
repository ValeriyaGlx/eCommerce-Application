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
import {
  setCurrentPage,
  setNumberOfPage,
} from '../../app/store/actions/paginationAction/paginationSlice';
import getCookie from '../../shared/cookie/getCookie';

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
  const numberOfPage = useSelector(
    (state: RootState) => state.pagination.numberOfPage,
  );
  const [isToken, setIsToken] = useState('');
  const [disabled, setDisabled] = useState([true, false]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = getCookie('accessToken');
        if (token === undefined) {
          const tokenResponse = await getAccessToken();
          const accessToken = tokenResponse.access_token;
          setToken('accessToken', accessToken);
          token = accessToken;
        }
        if (token !== undefined) {
          setIsToken(token);
          if (category !== 'All Categories') {
            dispatch(setNumberOfPage(1));
          } else {
            const numberOfProducts = await AllProductsRequest(token);
            const numberOfProductToPage = 6;
            dispatch(
              setNumberOfPage(
                Math.ceil(numberOfProducts / numberOfProductToPage),
              ),
            );
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  function clickNavigation(event: React.MouseEvent) {
    const data = event.target as HTMLElement;
    const number = data.innerHTML;
    if (number === '&lt;&lt;') {
      dispatch(setCurrentPage(1));
      setDisabled([true, false]);
    } else if (number === '&gt;&gt;') {
      dispatch(setCurrentPage(numberOfPage));
      setDisabled([false, true]);
    } else {
      dispatch(setCurrentPage(+number));
      switch (number) {
        case '1':
          setDisabled([true, false]);
          break;
        case `${numberOfPage}`:
          setDisabled([false, true]);
          break;
        default:
          setDisabled([false, false]);
      }
    }
  }

  return (
    <>
      <ListOfProductsWithNavigation
        category={category}
        subCategory={subCategory}
        token={isToken}
      />
      {numberOfPage > 1 ? (
        <div className={'wrapper-pagination'}>
          <nav className='pagination'>
            <Button
              className={'icon-pagination'}
              data={'<<'}
              onClick={clickNavigation}
              disabled={disabled[0]}
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
              data={'>>'}
              onClick={clickNavigation}
              disabled={disabled[1]}
            />
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default ProductWithNavigation;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { HomePage } from '../pages/HomePage/HomePage';
import { Cart } from '../pages/Cart/Cart';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import './App.scss';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import checkIsLogin from '../shared/checkIsLogin/checkIsLogin';
import Profile from '../pages/Profile/Profile';
import AboutUs from '../pages/AboutUs/AboutUs';
import Layout from '../shared/components/Layout/Layout';
import Products from '../pages/Products/Products';
import Product from '../pages/Product/Product';
import Category from '../pages/Category/Category';
import SubCategory from '../pages/SubCategory/SubCategory';

import RequireAuth from './hoc/RequireAuth';
import { store } from './store/store';
import RequireProfile from './hoc/RequireProfile';

checkIsLogin();

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route
          path='/signIn'
          element={
            <RequireAuth>
              <SignIn />
            </RequireAuth>
          }
        />
        <Route
          path='/signUp'
          element={
            <RequireAuth>
              <SignUp />
            </RequireAuth>
          }
        />
        <Route path='*' element={<PageNotFound />} />
        <Route path={'/'} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='cart' element={<Cart />} />
          <Route
            path='profile'
            element={
              <RequireProfile>
                <Profile />
              </RequireProfile>
            }
          />
          <Route path='about' element={<AboutUs />} />
          <Route path='products' element={<Products />} />
          <Route path='/products/product/:productId' element={<Product />} />
          <Route path='/products/:categoryId' element={<Category />} />
          <Route
            path='/products/:categoryId/:subCategoryId'
            element={<SubCategory />}
          />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

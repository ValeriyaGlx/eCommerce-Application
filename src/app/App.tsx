import { Routes, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';

import { HomePage } from '../pages/HomePage/HomePage';
import { Cart } from '../pages/Cart/Cart';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import './App.scss';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import checkIsLogin from '../shared/checkIsLogin/checkIsLogin';

import { store } from './store/store';
import RequireAuth from './hoc/RequireAuth';

checkIsLogin();

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/signIn'
          element={
            <RequireAuth>
              <SignIn />
            </RequireAuth>
          }
        />
        <Route
          path='/singUp'
          element={
            <RequireAuth>
              <SignUp />
            </RequireAuth>
          }
        />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { HomePage } from '../pages/HomePage/HomePage';
import { Cart } from '../pages/Cart/Cart';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signIn' element={<SignIn />} />
      <Route path='/singUp' element={<SignUp />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;

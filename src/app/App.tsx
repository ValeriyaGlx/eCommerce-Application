import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { HomePage } from '../pages/HomePage/HomePage';
import { Cart } from '../pages/Cart/Cart';
import SignUp from '../pages/SignUp/SignUp';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;

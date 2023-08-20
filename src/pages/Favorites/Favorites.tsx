import React from 'react';

import { Header } from '../../widgets/Header/Header';
import Footer from '../../widgets/Footer/Footer';

export function Favorites() {
  return (
    <div className={'container'}>
      <Header />

      <div>Favorites</div>
      <Footer />
    </div>
  );
}

export default Favorites;

import { Outlet } from 'react-router-dom';

import { Header } from '../../../widgets/Header/Header';
import Footer from '../../../widgets/Footer/Footer';

const Layout = () => {
  return (
    <div className='wrapper'>
      <div className={'container'}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

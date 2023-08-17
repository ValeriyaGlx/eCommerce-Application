import { Navigate } from 'react-router-dom';
import React from 'react';

import { store } from '../store/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  // const location = useLocation();
  const isAuth = store.getState().authorization.isAuthorization;
  if (isAuth) {
    return <Navigate to={'/'} />;
  }
  return children;
};

export default RequireAuth;

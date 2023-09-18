import { Navigate } from 'react-router-dom';
import React from 'react';

import { store } from '../store/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireProfile: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuth = store.getState().authorization.isAuthorization;
  if (!isAuth) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};

export default RequireProfile;

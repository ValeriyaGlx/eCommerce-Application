import getCookie from '../cookie/getCookie';
import { store } from '../../app/store/store';
import { loginSuccess } from '../../app/store/actions/authorizationAction/authorizationSlice';

const checkIsLogin = () => {
  const token = getCookie('authToken');
  if (token) {
    store.dispatch(loginSuccess());
  }
  window.addEventListener('load', checkIsLogin);
};

export default checkIsLogin;

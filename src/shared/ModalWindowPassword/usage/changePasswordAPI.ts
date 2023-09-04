import { store } from '../../../app/store/store';
import { tokenRequest } from '../../../features/formSubmitSignIn/usage/ApiAuthorization';
import setToken from '../../cookie/setToken';

const project = process.env.REACT_APP_PROJECT_KEY;
const host = process.env.REACT_APP_HOST;

function getPasswordData() {
  const passwordStateInfo = store.getState().changePassword;

  const data = {
    version: store.getState().profileVersion.version,
    currentPassword: passwordStateInfo.currentPassword.value,
    newPassword: passwordStateInfo.password.value,
  };
  return data;
}

export async function changePassword(token: string) {
  const urlRequest = `${host}/${project}/me/password`;

  const authHeader = 'Bearer ' + token;
  const response = await fetch(urlRequest, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(getPasswordData()),
  });
  if (!response.ok) {
    return response.status;
  } else {
    const res = response.json();
    const email = store.getState().signup.signup.email.value;
    const newPassword = store.getState().changePassword;
    const token = await tokenRequest(email, newPassword.password.value);
    const accessToken = token.access_token;
    setToken('authToken', accessToken);
    return response.status;
  }
}

import setToken from './setToken';

function deleteToken(name: string) {
  setToken(name, name, -1);
}

export default deleteToken;

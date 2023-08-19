const setToken = (token: string, time: number = 1) => {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000 * time);
  const expires = d.toUTCString();
  document.cookie = `token=${token}; expires=${expires}; path=/`;
};

export default setToken;

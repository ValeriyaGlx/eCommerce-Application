const setDataLocalStorage = (name: string, data: string) => {
  localStorage.setItem(name, data);

  window.addEventListener('beforeunload', () => setDataLocalStorage(name, data));
};

export default setDataLocalStorage;

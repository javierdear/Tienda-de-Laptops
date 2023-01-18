const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getFromLocalStorage, setToLocalStorage };
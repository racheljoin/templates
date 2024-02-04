const loginLocalStorageKey = '__loginLocalStorageKey__';

export const setLoginLocalStorage = (persistenceData: unknown) => {
  try {
    localStorage.setItem(loginLocalStorageKey, JSON.stringify(persistenceData));
    return true;
  } catch (e) {
    return false;
  }
};

export const getLoginLocalStorage = () => {
  const loginData = localStorage.getItem(loginLocalStorageKey);
  if (loginData) {
    try {
      return JSON.parse(loginData);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const clearLoginLocalStorage = () => {
  localStorage.removeItem(loginLocalStorageKey);
};

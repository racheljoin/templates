import { IUserData } from "@/service/models/load";

const loginLocalStorageKey = "__loginLocalStorageKey__";

export const setLoginLocalStorage = (persistenceData: IUserData) => {
  try {
    localStorage.setItem(loginLocalStorageKey, JSON.stringify(persistenceData));
    return true;
  } catch (e) {
    return false;
  }
};

export const getLoginLocalStorage = (): IUserData | null => {
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

export const isValidPhone = (phone: string) =>
  /^1[3|4|5|7|8|9][0-9]{9}$/.test(phone);


import { LOGIN_URL, REGISTER_URL } from "../apiUrls/authApiUrls";
import { saveToLocalStorage } from "../utils/localStorageUtils";

export const register = async (credentials) => {
  const { username, password } = credentials;

  const data = {
    username: username,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(REGISTER_URL, options);
    res = await res.json();
    if (res.token && res.username) {
      saveToLocalStorage("auth", res);
    }
    return res;
  } catch (err) {
    return err;
  }
};

export const login = async (credentials) => {
  const { username, password } = credentials;

  const data = {
    username: username,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(LOGIN_URL, options);
    res = await res.json();
    if (res.token && res.username) {
      saveToLocalStorage("auth", res);
    }
    return res;
  } catch (err) {
    return err;
  }
};

import {
  DELETE_URL,
  EDIT_URL,
  LOGIN_URL,
  REGISTER_URL,
} from "../apiUrls/authApiUrls";
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

export const updateUser = async (credentials, token) => {
  const { username, password } = credentials;

  const data = {
    userdata: {
      username: username,
      password: password,
    },
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  };

  try {
    let res = await fetch(EDIT_URL, options);
    res = await res.json();
    if (res.user) {
      return res.user;
    }
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  };

  try {
    let res = await fetch(DELETE_URL, options);
    res = await res.json();
    if (res.msg && res.msg === "User Deleted") {
      return res.msg;
    }
  } catch (err) {
    return err;
  }
};

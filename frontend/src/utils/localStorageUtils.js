export const saveToLocalStorage = (key, value) => {
  if (value !== "") {
    const data = {
      id: value.token,
      username: value.username,
    };

    let storageValue = JSON.stringify(data);
    localStorage.setItem(key, storageValue);
  } else {
    console.log("Incorrect Value");
  }
};

export const getFromLocalStorage = (key) => {
  if (key !== "") {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const deleteFromLocalStorage = (key) => {
  if (key !== "") {
    localStorage.removeItem(key);
  }
};

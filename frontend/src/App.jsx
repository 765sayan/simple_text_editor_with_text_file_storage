import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import AuthPage from "./pages/AuthPage";
import EditUser from "./pages/EditUser";
import ScrollToTop from "./components/ScrollToTop";
import { getUserInfoService } from "./services/authServices";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";

export const TokenContext = React.createContext();
export const SetTokenContext = React.createContext();

function App() {
  const [token, setToken] = useState("");

  async function getUserInfoFunction(localStorageValue) {
    let user = await getUserInfoService(`Bearer ${localStorageValue.id}`);

    if (user) {
      const data = {
        token: localStorageValue.id,
        username: user.username,
      };

      saveToLocalStorage(data);
    } else {
      if (getFromLocalStorage("auth")) {
        deleteFromLocalStorage("auth");
      }
    }
  }

  useEffect(() => {
    if (getFromLocalStorage("auth") && getFromLocalStorage("auth").id) {
      let localStorageValue = getFromLocalStorage("auth");

      getUserInfoFunction(localStorageValue);
    }
  }, []);

  return (
    <SetTokenContext.Provider value={setToken}>
      <TokenContext.Provider value={token}>
        <ScrollToTop />
        <Routes>
          <Route path="/">
            <Route path="" element={<HomePage />} />
            <Route path="/edit" element={<EditorPage />} />
            <Route path="/user" element={<EditUser />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </TokenContext.Provider>
    </SetTokenContext.Provider>
  );
}

export default App;

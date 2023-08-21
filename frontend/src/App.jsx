import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import AuthPage from "./pages/AuthPage";

export const TokenContext = React.createContext();
export const SetTokenContext = React.createContext();

function App() {
  const [token, setToken] = useState("");

  return (
    <SetTokenContext.Provider value={setToken}>
      <TokenContext.Provider value={token}>
        <Routes>
          <Route path="/">
            <Route path="" element={<HomePage />} />
            <Route path="/edit" element={<EditorPage />} />

            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </TokenContext.Provider>
    </SetTokenContext.Provider>
  );
}

export default App;

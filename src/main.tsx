import React from "react";
import ReactDOM from "react-dom/client";

import AuthContextProvider from "./context/AuthContext.tsx";
import StoreProvider from "./redux/store/index.tsx";

import App from "./App.tsx";

import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import { AuthContext } from "./context/AuthContext";
import { ProductPage } from "./pages/ProductPage";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/categories"
          element={
            isAuthenticated ? <CategoriesPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

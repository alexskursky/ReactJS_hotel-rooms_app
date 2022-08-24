import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoginAdminPage = React.lazy(() => import("./pages/admin/LoginAdminPage"));
const AdminPanel = React.lazy(() => import("./pages/admin/AdminPanel"));
const MainPage = React.lazy(() => import("./pages/users/MainPage"));

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Suspense
      fallback={
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPanel /> : <LoginAdminPage />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;

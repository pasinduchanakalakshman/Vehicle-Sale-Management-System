import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../ui/layouts/MainLayout.jsx";
import LoginPage from "../ui/pages/LoginPage.jsx";
import RegisterPage from "../ui/pages/RegisterPage.jsx";
import VehiclesPage from "../ui/pages/VehiclesPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<VehiclesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../app/hooks.js";
import MainLayout from "../ui/layouts/MainLayout.jsx";
import AdminDashboard from "../ui/pages/AdminDashboard.jsx";
import LoginPage from "../ui/pages/LoginPage.jsx";
import RegisterPage from "../ui/pages/RegisterPage.jsx";
import VehiclesPage from "../ui/pages/VehiclesPage.jsx";

export default function AppRouter() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<VehiclesPage />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

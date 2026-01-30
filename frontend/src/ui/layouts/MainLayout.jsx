import { Outlet } from "react-router-dom";
import Header from "../shared/Header.jsx";
import Footer from "../shared/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-5 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

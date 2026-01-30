import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="w-full max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-wide">
          Vehicle Sale
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="nav-link">Vehicles</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </nav>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { logout } from "../../features/auth/authSlice.js";

export default function Header() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="bg-slate-900 text-white">
      <div className="w-full max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-wide">
          Vehicle Sale
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="nav-link">Vehicles</Link>
          {user?.role === "admin" ? <Link to="/admin" className="nav-link">Admin</Link> : null}
          {user ? (
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="nav-link"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { login } from "../../features/auth/authSlice.js";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(form)).unwrap();
      const role = result?.user?.role;
      navigate(role === "admin" ? "/admin" : "/");
    } catch {
      // Errors are handled in the store
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">Login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="form-label">
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            className="input"
          />
        </label>
        <label className="form-label">
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            className="input"
          />
        </label>
        <button
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </section>
  );
}

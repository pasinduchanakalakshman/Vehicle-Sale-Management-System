import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { register } from "../../features/auth/authSlice.js";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    try {
      await dispatch(register(form)).unwrap();
      setSuccess("Account created. You can log in now.");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 800);
    } catch {
      // Errors are handled in the store
    }
  };

  return (
    <section className="page-card">
      <h1 className="section-title">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="form-label">
          Name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="input"
          />
        </label>
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
          {status === "loading" ? "Creating..." : "Register"}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}
      </form>
    </section>
  );
}

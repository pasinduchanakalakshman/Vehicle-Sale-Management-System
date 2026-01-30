import { useState } from "react";
import { useAppDispatch } from "../../app/hooks.js";
import { register } from "../../features/auth/authSlice.js";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
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
        <button className="btn-primary" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}

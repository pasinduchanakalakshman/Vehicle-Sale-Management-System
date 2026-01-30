import { useEffect, useState } from "react";
import api from "../../api/client.js";
import { useAppSelector } from "../../app/hooks.js";

export default function AdminDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const [overview, setOverview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchOverview = async () => {
      setStatus("loading");
      setError(null);
      try {
        const { data } = await api.get("/api/admin/overview");
        if (active) {
          setOverview(data);
          setStatus("succeeded");
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Failed to load admin data");
          setStatus("failed");
        }
      }
    };

    fetchOverview();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <div className="card">
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome{user?.name ? `, ${user.name}` : ""}. You are logged in as an admin.
        </p>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
        {status === "loading" ? (
          <p className="mt-2 text-sm text-slate-500">Loading...</p>
        ) : null}
        {status === "failed" ? (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        ) : null}
        {status === "succeeded" && overview ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Total Users</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.totals?.users ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Total Vehicles</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.totals?.vehicles ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Admins</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.usersByRole?.admin ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Managers</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.usersByRole?.manager ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Owners</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.usersByRole?.owner ?? 0}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4">
              <p className="text-xs uppercase text-slate-500">Customers</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {overview.usersByRole?.customer ?? 0}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">User Management</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create and manage owners, managers, and customers.
          </p>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Vehicle Inventory</h2>
          <p className="mt-2 text-sm text-slate-600">
            Review and manage vehicle listings.
          </p>
        </div>
      </div>
    </section>
  );
}

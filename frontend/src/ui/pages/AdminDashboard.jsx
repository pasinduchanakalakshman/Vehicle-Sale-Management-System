import { useEffect, useState } from "react";
import api from "../../api/client.js";
import { useAppSelector } from "../../app/hooks.js";

export default function AdminDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const [overview, setOverview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [createStatus, setCreateStatus] = useState("idle");
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    vehicleType: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "other",
    transmission: "other",
    condition: "used",
    showroomLocation: "",
    description: "",
    images: "",
    ownerCount: "",
    isBrandNew: false,
    status: "available",
  });

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

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const parseNumber = (value) => (value === "" ? undefined : Number(value));

  const onCreateVehicle = async (e) => {
    e.preventDefault();
    setCreateStatus("loading");
    setCreateError(null);
    setCreateSuccess(null);

    const payload = {
      brand: form.brand.trim(),
      model: form.model.trim(),
      vehicleType: form.vehicleType.trim(),
      year: Number(form.year),
      price: Number(form.price),
      condition: form.condition,
      showroomLocation: form.showroomLocation.trim(),
      mileage: parseNumber(form.mileage),
      fuelType: form.fuelType || undefined,
      transmission: form.transmission || undefined,
      description: form.description?.trim() || undefined,
      images: form.images
        ? form.images
            .split(",")
            .map((img) => img.trim())
            .filter(Boolean)
        : undefined,
      ownerCount: parseNumber(form.ownerCount),
      isBrandNew: Boolean(form.isBrandNew),
      status: form.status || undefined,
    };

    try {
      await api.post("/api/vehicles", payload);
      setCreateStatus("succeeded");
      setCreateSuccess("Vehicle created successfully.");
      setForm((prev) => ({
        ...prev,
        brand: "",
        model: "",
        vehicleType: "",
        year: "",
        price: "",
        mileage: "",
        showroomLocation: "",
        description: "",
        images: "",
        ownerCount: "",
        isBrandNew: false,
        status: "available",
      }));
    } catch (err) {
      setCreateStatus("failed");
      setCreateError(err.response?.data?.message || "Failed to create vehicle");
    }
  };

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
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900">Add Vehicle</h2>
        <form onSubmit={onCreateVehicle} className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="form-label">
            Brand
            <input
              name="brand"
              value={form.brand}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label">
            Model
            <input
              name="model"
              value={form.model}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label">
            Vehicle Type
            <input
              name="vehicleType"
              value={form.vehicleType}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label">
            Year
            <input
              name="year"
              type="number"
              value={form.year}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label">
            Price
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label">
            Mileage
            <input
              name="mileage"
              type="number"
              value={form.mileage}
              onChange={onChange}
              className="input"
            />
          </label>
          <label className="form-label">
            Fuel Type
            <select name="fuelType" value={form.fuelType} onChange={onChange} className="input">
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="form-label">
            Transmission
            <select
              name="transmission"
              value={form.transmission}
              onChange={onChange}
              className="input"
            >
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
              <option value="cvt">CVT</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="form-label">
            Condition
            <select name="condition" value={form.condition} onChange={onChange} className="input">
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </label>
          <label className="form-label">
            Showroom Location
            <input
              name="showroomLocation"
              value={form.showroomLocation}
              onChange={onChange}
              required
              className="input"
            />
          </label>
          <label className="form-label md:col-span-2">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="input h-24 py-2"
            />
          </label>
          <label className="form-label md:col-span-2">
            Images (comma-separated URLs)
            <input
              name="images"
              value={form.images}
              onChange={onChange}
              className="input"
            />
          </label>
          <label className="form-label">
            Owner Count
            <input
              name="ownerCount"
              type="number"
              value={form.ownerCount}
              onChange={onChange}
              className="input"
            />
          </label>
          <label className="form-label">
            Status
            <select name="status" value={form.status} onChange={onChange} className="input">
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <label className="form-label md:col-span-2 flex items-center gap-2">
            <input
              name="isBrandNew"
              type="checkbox"
              checked={form.isBrandNew}
              onChange={onChange}
              className="h-4 w-4"
            />
            Brand New
          </label>
          <div className="md:col-span-2 flex flex-col gap-2">
            <button
              className="btn-primary md:w-56"
              type="submit"
              disabled={createStatus === "loading"}
            >
              {createStatus === "loading" ? "Saving..." : "Add Vehicle"}
            </button>
            {createError ? <p className="text-sm text-red-600">{createError}</p> : null}
            {createSuccess ? <p className="text-sm text-green-600">{createSuccess}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}

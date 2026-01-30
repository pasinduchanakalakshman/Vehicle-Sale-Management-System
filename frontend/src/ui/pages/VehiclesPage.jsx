import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.js";
import { fetchVehicles } from "../../features/vehicles/vehiclesSlice.js";

export default function VehiclesPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.vehicles);

  useEffect(() => {
    dispatch(fetchVehicles({}));
  }, [dispatch]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="section-title">Vehicles</h1>
      </div>
      {status === "loading" && <p className="text-slate-500">Loading...</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((vehicle) => (
          <article key={vehicle._id} className="card">
            <h3 className="text-lg font-semibold text-slate-900">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {vehicle.vehicleType} • {vehicle.year}
            </p>
            <p className="mt-4 text-xl font-semibold text-blue-600">
              ${vehicle.price}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

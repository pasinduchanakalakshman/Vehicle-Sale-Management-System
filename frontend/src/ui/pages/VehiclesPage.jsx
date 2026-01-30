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
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-700">Condition:</span> {vehicle.condition}
              </p>
              <p>
                <span className="font-medium text-slate-700">Fuel:</span> {vehicle.fuelType || "-"}
              </p>
              <p>
                <span className="font-medium text-slate-700">Transmission:</span>{" "}
                {vehicle.transmission || "-"}
              </p>
              <p>
                <span className="font-medium text-slate-700">Mileage:</span>{" "}
                {vehicle.mileage ?? "-"}
              </p>
              <p>
                <span className="font-medium text-slate-700">Owners:</span>{" "}
                {vehicle.ownerCount ?? "-"}
              </p>
              <p>
                <span className="font-medium text-slate-700">Showroom:</span>{" "}
                {vehicle.showroomLocation || "-"}
              </p>
              <p>
                <span className="font-medium text-slate-700">Status:</span> {vehicle.status}
              </p>
              <p>
                <span className="font-medium text-slate-700">Brand New:</span>{" "}
                {vehicle.isBrandNew ? "Yes" : "No"}
              </p>
            </div>
            {vehicle.description ? (
              <p className="mt-4 text-sm text-slate-600">{vehicle.description}</p>
            ) : null}
            {vehicle.images?.length ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {vehicle.images.map((img, index) => (
                  <img
                    key={`${vehicle._id}-img-${index}`}
                    src={img}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="h-24 w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

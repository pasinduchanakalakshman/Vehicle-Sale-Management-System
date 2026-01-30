import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/client.js";

const initialState = {
  items: [],
  total: 0,
  status: "idle",
  error: null,
  filters: {
    brand: "",
    model: "",
    vehicleType: "",
    minPrice: "",
    maxPrice: "",
    year: "",
    fuelType: "",
  },
};

export const fetchVehicles = createAsyncThunk("vehicles/fetch", async (params) => {
  const { data } = await api.get("/api/vehicles", { params });
  return data;
});

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;

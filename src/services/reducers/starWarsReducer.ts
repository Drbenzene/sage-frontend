import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import starWarServices from "../actions/starwars";

const initialState = {
  starwars: [],
  loading: false,
  error: false,
  success: false,
  message: null,
};

export const getStarWarsAction = createAsyncThunk(
  "getStarWarsAction",
  (filters: any) => {
    const resource =
      filters.resource || sessionStorage.getItem("resource") || "planets";
    delete filters.resource;
    return starWarServices.getStarWars(resource, filters);
  }
);

//CREATE THE SLICE

export const getStarWarsSlice = createSlice({
  name: "getStarWars",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = null;
      state.starwars = [];
    },
  },

  extraReducers: (builder: any) => {
    builder
      .addCase(getStarWarsAction.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getStarWarsAction.fulfilled, (state: any, action: any) => {
        console.log(action.payload, "THE PAYLOAD");
        state.loading = false;
        state.success = true;
        state.starwars = action?.payload?.results;
      })
      .addCase(getStarWarsAction.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.starwars = [];
      });
  },
});

export const { reset } = getStarWarsSlice.actions;

export default getStarWarsSlice.reducer;

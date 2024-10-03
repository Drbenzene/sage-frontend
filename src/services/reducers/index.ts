import { combineReducers } from "@reduxjs/toolkit";
import getStarWarsSlice from "./starWarsReducer";
const reducers = combineReducers({
  getStarWars: getStarWarsSlice,
});

export default reducers;

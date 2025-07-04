"use client";
import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./features/watchList/watchlist";

export const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});

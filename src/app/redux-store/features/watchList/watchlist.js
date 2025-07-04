import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: {
    "Sci-fi": []
  }, // { "Favorites": [movie1, movie2], "Sci-fi": [movie3] }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    createWatchlist: (state, action) => {
      const name = action.payload;
      if (!state.lists[name]) {
        state.lists[name] = [];
      }
    },
    addToWatchlist: (state, action) => {
      const { listName, movie } = action.payload;
      if (state.lists[listName]) {
        const exists = state.lists[listName].some(m => m.id === movie.id);
        if (!exists) {
          state.lists[listName].push(movie);
        }
      }
    },
    removeFromWatchlist: (state, action) => {
      const { listName, movieId } = action.payload;
      if (state.lists[listName]) {
        state.lists[listName] = state.lists[listName].filter(m => m.id !== movieId);
      }
    },
    deleteWatchlist: (state, action) => {
      const listName = action.payload;
      delete state.lists[listName];
    },
  },
});

export const {
  createWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  deleteWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;

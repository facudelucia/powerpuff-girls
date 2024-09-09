import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Show, Episode } from "../types/showTypes";

export interface ShowState {
  show: Show | null;
  episodes: Episode[];
  selectedEpisode: Episode | null;
  status: "idle" | "loading" | "failed";
}

const initialState: ShowState = {
  show: null,
  episodes: [],
  selectedEpisode: null,
  status: "idle",
};

export const fetchShowDetails = createAsyncThunk(
  "show/fetchShowDetails",
  async () => {
    const response = await axios.get("https://api.tvmaze.com/shows/6771");
    return response.data;
  }
);

export const fetchEpisodes = createAsyncThunk(
  "show/fetchEpisodes",
  async () => {
    const response = await axios.get(
      "https://api.tvmaze.com/shows/6771/episodes"
    );
    return response.data;
  }
);

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    selectEpisode: (state, action) => {
      state.selectedEpisode =
        state.episodes.find(
          (episode: Episode) => episode.id === action.payload
        ) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.show = action.payload;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.episodes = action.payload;
      });
  },
});

export const { selectEpisode } = showSlice.actions;
export default showSlice.reducer;

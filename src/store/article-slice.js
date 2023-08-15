import { createSlice } from '@reduxjs/toolkit';

const initialArticelState = {
  loading: false,
  articles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState: initialArticelState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setArticles(state, action) {
      state.articles = action.payload;
    },
  },
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;

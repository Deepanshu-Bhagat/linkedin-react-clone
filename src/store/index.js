import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import articleReducer from './article-slice';

const store = configureStore({
  reducer: { user: userReducer, article: articleReducer },
});

export default store;

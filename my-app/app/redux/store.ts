import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import productsReducer from "./productSlice";
import addToCartReducer from "./addToCartSlice";
import fetchCartReducer from "./fetchCartSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    products: productsReducer,
    addToCart: addToCartReducer,
    fetchCart: fetchCartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import productsReducer from "./productSlice";
import addToCartReducer from "./addToCartSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    products: productsReducer,
    cart: addToCartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

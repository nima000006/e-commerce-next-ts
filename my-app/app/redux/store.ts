// store.ts
import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice";
import productsReducer from "./productSlice";
import addToCartReducer from "./addToCartSlice";

// Create and configure the store
const store = configureStore({
  reducer: {
    language: languageReducer,
    products: productsReducer,
    cart: addToCartReducer,
  },
  // Enable Redux DevTools in development mode only
  devTools: process.env.NODE_ENV !== "production",
});

// Define RootState type (represents the entire state of the Redux store)
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type (for dispatching actions)
export type AppDispatch = typeof store.dispatch;

// Export the store itself for use in the app
export default store;

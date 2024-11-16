import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addToCart as addToCardService } from "@/app/component/sections/products/Product.service";
import { Product } from "../models/productsModel";

// Define async thunk for adding a product to the cart
export const addToCart = createAsyncThunk<
  Product, // Type of returned data (single product added to the cart)
  Product, // Type of argument passed to the thunk (product to be added)
  { rejectValue: string } // Rejection type
>("products/addToCart", async (productData, { rejectWithValue }) => {
  try {
    const data = await addToCardService(productData); // Call the service with productData
    return data; // Resolve with the added product
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message); // Handle the error properly and pass the error message
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

interface ProductsState {
  items: Product[]; // Array of products in the cart
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

// Create the slice
const addToCardSlice = createSlice({
  name: "addToCard",
  initialState,
  reducers: {
    // Add product directly to cart without calling API
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An error occurred";
      });
  },
});

// Export actions
export const { addProductToCart } = addToCardSlice.actions;

// Export the reducer
export default addToCardSlice.reducer;

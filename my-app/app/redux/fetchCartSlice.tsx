import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCartItems } from "@/app/component/sections/products/Product.service"; // Import service function
import { Product } from "../models/productsModel"; // Product type

interface CartState {
  items: Product[]; // Array of products in the cart
  status: "idle" | "loading" | "succeeded" | "failed"; // Status of cart fetching
  error: string | null; // Error message if fetching fails
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};

// Create async thunk to fetch cart items
export const fetchCartList = createAsyncThunk<
  Product[], // Type of returned data (cart items)
  void, // No argument needed to fetch the cart
  { rejectValue: string } // Reject type (error message)
>("cart/fetchCartList", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCartItems(); // Fetch cart items from service
    return data; // Return fetched cart items
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message); // Handle the error message
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCartList.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload; // Add fetched items to state
        }
      )
      .addCase(fetchCartList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "An error occurred"; // Set error message
      });
  },
});

export default cartSlice.reducer;

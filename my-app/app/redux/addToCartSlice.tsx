import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCartItems
} from "@/app/component/sections/products/Product.service";
import { Product } from "../models/productsModel";

// Extended Product type to include `count`
interface ProductWithCount extends Product {
  count: number;
}

interface CartState {
  items: ProductWithCount[]; // Cart items with counts
  status: "idle" | "loading" | "succeeded" | "failed"; // Fetching/Updating status
  error: string | null; // Error message for failures
}

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null,
};


// Fetch cart items
export const fetchCartList = createAsyncThunk<
  ProductWithCount[],
  void,
  { rejectValue: string }
>("cart/fetchCartList", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCartItems();
    return data.map((item) => ({ ...item, count: 1 })); // Initialize count
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCartList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCartList.fulfilled,
        (state, action: PayloadAction<ProductWithCount[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchCartList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch cart items.";
      })
  },
});

// Export actions
export const { resetCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

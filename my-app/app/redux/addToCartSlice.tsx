import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCartItems } from "@/app/component/sections/products/Product.service"; // Adjust the import path if needed
import { Product } from "../models/productsModel"; // Assuming you have a Product model

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

// Fetch cart items (async)
export const fetchCartList = createAsyncThunk<
  ProductWithCount[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejected value type
>("cart/fetchCartList", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCartItems(); // Assume this fetches the cart items
    return data.map((item) => ({ ...item, count: 1 })); // Initialize count to 1
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

// Create cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add item to the cart
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        // If the item exists, increment its count
        existingItem.count += 1;
      } else {
        // If the item doesn't exist, add it to the cart with a count of 1
        state.items.push({ ...item, count: 1 });
      }
    },
    // Action to reset the cart
    resetCart: (state) => {
      state.items = [];
    },
    // Action to remove an item from the cart
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id.toString() !== action.payload);
    },
    // Action to update item count
    updateItemCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const { id, count } = action.payload;
      const item = state.items.find((product) => product.id.toString() === id);
      if (item) {
        item.count = count;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch cart items
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
      });
  },
});

// Export actions
export const { addItemToCart, resetCart, removeItemFromCart, updateItemCount } =
  cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

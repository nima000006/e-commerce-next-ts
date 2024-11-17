import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addToCart as addToCartService,
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

// Utility function: find product index by ID
const findProductIndex = (items: ProductWithCount[], id: number) =>
  items.findIndex((item) => item.id === id);

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

// Add a product to the cart
export const addToCart = createAsyncThunk<
  ProductWithCount,
  Product,
  { rejectValue: string }
>("cart/addToCart", async (productData, { rejectWithValue }) => {
  try {
    const data = await addToCartService(productData);
    return { ...data, count: 1 }; // Initialize count
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
    incrementCount: (state, action: PayloadAction<number>) => {
      console.log("Current State:", state.items);
      console.log("Payload:", action.payload);
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.count += 1;
      }
    },
    decrementCount: (state, action: PayloadAction<number>) => {
      console.log("Current State:", state.items);
      console.log("Payload:", action.payload);
      const product = state.items.find((item) => item.id === action.payload);
      if (product && product.count > 1) {
        product.count -= 1;
      }
    },

    // Remove a product from the cart
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<ProductWithCount>) => {
          const index = findProductIndex(state.items, action.payload.id);
          if (index !== -1) {
            state.items[index].count += action.payload.count; // Increment if exists
          } else {
            state.items.push(action.payload); // Add if new
          }
          state.status = "succeeded";
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to add product to cart.";
      });
  },
});

// Export actions
export const { incrementCount, decrementCount, removeProduct } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

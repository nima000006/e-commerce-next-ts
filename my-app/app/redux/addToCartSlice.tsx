import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
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

// Utility function: find product by ID
const findProductById = (items: ProductWithCount[], id: number) =>
  items.find((item) => item.id === id);

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

// Remove a product from the cart
export const removeProductFromCart = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("cart/removeProductFromCart", async (productId, { rejectWithValue }) => {
  try {
    await removeFromCartService(productId); // API call to remove product
    return productId; // Return ID of removed product
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});
// Remove all counts of products
export const removeAllCountsOfProducts = createAsyncThunk<
  number[], // Array of Product IDs
  number[], // Payload: Array of Product IDs
  { rejectValue: string }
>("cart/removeAllCountsOfProducts", async (productIds, { rejectWithValue }) => {
  try {
    // Simulate API call to remove products
    await Promise.all(productIds.map(id => removeFromCartService(id)));
    return productIds; // Return array of product IDs after successful removal
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

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<ProductWithCount>) => {
          const product = findProductById(state.items, action.payload.id);
          if (product) {
            product.count += action.payload.count; // Increment count if product exists
          } else {
            state.items.push(action.payload); // Add new product
          }
          state.status = "succeeded";
        }
      )
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to add product to cart.";
      })

      // Remove from Cart
      .addCase(removeProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeProductFromCart.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload
          );
          state.status = "succeeded";
        }
      )
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to remove product from cart.";
      })
      // Remove All Counts of Products
      .addCase(
        removeAllCountsOfProducts.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          // Remove all products with matching IDs
          const idsToRemove = new Set(action.payload); // Set for faster lookup
          state.items = state.items.filter((item) => !idsToRemove.has(item.id)); // Filter out all matching products
          state.status = "succeeded";
        }
      )
      .addCase(removeAllCountsOfProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload ?? "Failed to remove all counts of the products.";
      });
  },
});

// Export actions
export const { resetCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

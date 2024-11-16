// productService.ts
import { Product } from "@/app/models/productsModel";
import { fetchData, postData } from "../../api/apiUtils";
import { getProducts, addProduct } from "../../api/api";

// Fetch products from the API
export const fetchProducts = async () => {
  try {
    const products = await fetchData(getProducts);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Add a product to the cart (POST to API)
export const addToCart = async (productData: Product) => {
  try {
    const addedProduct = await postData(addProduct, productData);
    return addedProduct;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const fetchCartItems = async (): Promise<Product[]> => {
  try {
    const cartItems = await fetchData(addProduct); // Assuming getCartItems API fetches cart data
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};



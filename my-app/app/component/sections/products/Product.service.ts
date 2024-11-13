import { getProducts } from "../../api/api";

export const fetchProducts = async () => {
  const response = await fetch(getProducts);
  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }
  return response.json();
};
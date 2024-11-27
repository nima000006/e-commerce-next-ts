const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-next-ts-two.vercel.app/api" // Vercel API endpoint
    : "http://localhost:3001"; // Local development API

export const languages = `${baseUrl}/language`;
export const languagesSelected = `${baseUrl}/selected`;
export const getProducts = `${baseUrl}/products`;
export const addProduct = `${baseUrl}/addtocart`;
export const deleteProduct = `${baseUrl}/addtocart`;

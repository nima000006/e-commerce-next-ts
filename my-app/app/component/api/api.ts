const getBaseUrl = (): string => {
  if (typeof window === "undefined") {
    // Server-side
    return process.env.API_BASE_URL || "http://localhost:3001";
  } else {
    // Client-side
    const domain = window.location.hostname;
    if (domain === "yourdomain.com") {
      return "https://api.yourdomain.com";
    } else if (domain === "anotherdomain.com") {
      return "https://api.anotherdomain.com";
    } else {
      return "http://localhost:3001"; // Default for local development
    }
  }
};

const baseUrl = getBaseUrl();

export const languages = `${baseUrl}/language`;
export const languagesSelected = `${baseUrl}/selected`;
export const getProducts = `${baseUrl}/products`;
export const addProduct = `${baseUrl}/addtocart`;
export const deleteProduct = `${baseUrl}/addtocart`;

const getBaseUrl = (): string => {
  if (typeof window === "undefined") {
    // Server-side
    return (
      process.env.API_BASE_URL ||
      "https://clean-successful-tachometer.glitch.me"
    );
  } else {
    // Client-side
    const domain = window.location.hostname;
    if (domain === "https://clean-successful-tachometer.glitch.me") {
      return "https://clean-successful-tachometer.glitch.me";
    } else if (domain === "https://clean-successful-tachometer.glitch.me") {
      return "https://clean-successful-tachometer.glitch.me";
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

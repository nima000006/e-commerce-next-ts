import { languages } from "../api/api";
import { languagesSelected } from "../api/api";

export const fetchLanguages = async () => {
  const response = await fetch(languages);
  if (!response.ok) {
    throw new Error("Failed to fetch languages");
  }
  return response.json();
};
export const saveLanguage = async (language: string) => {
  try {
    const response = await fetch(languagesSelected, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedLanguage: language }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save selected language: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error in saveLanguage:", error);
    throw error; 
  }
};
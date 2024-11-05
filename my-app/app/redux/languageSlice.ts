
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  selectedLanguage: string;
}
export interface RootState {
  language: LanguageState;
}
const initialState: LanguageState = {
  selectedLanguage: "En",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

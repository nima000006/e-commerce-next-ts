/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useContext, createContext, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import en from "@/public/locales/en.json";
import fa from "@/public/locales/fa.json";
import { RootState } from "@/app/redux/languageSlice";
export type TranslationData = Record<string, any>;

const LanguageContext = createContext<TranslationData>(en); 
export const useTranslation = () => {
  const translations = useContext(LanguageContext);
  const translate = (key: string) => {
    return key.split(".").reduce((acc, part) => acc?.[part], translations);
  };

  return translate;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const languageData = selectedLanguage === "Fa" ? fa : en;

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      selectedLanguage === "Fa" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute(
      "lang",
      selectedLanguage === "Fa" ? "fa" : "en"
    );
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider value={languageData}>
      {children}
    </LanguageContext.Provider>
  );
};


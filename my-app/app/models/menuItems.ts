"use client";
import { useTranslation } from "../component/languageProvider/LanguageProvider";
export const MenuItems = () => {
  const t = useTranslation();
  return [
    { id: 1, label: t("MENU.PERFUME"), href: "/perfume" },
    { id: 2, label: t("MENU.CANDLES"), href: "/candles" },
    { id: 3, label: t("MENU.HOME"), href: "/" },
    { id: 4, label: t("MENU.HANDS"), href: "/hands" },
    { id: 5, label: t("MENU.PANTRY"), href: "/pantry" },
    { id: 6, label: t("MENU.COLLECTIONS"), href: "/collections" },
    { id: 7, label: t("MENU.GIFTS"), href: "/gifts" },
  ];
};


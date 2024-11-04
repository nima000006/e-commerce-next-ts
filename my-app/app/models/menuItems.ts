import Text from "@/public/locales/en.json";

export type MenuItem = {
  id: number;
  label: string;
  href: string;
};

const MenuItems: MenuItem[] = [
  { id: 1, label: Text.MENU.PERFUME, href: "/perfume" },
  { id: 2, label: Text.MENU.CANDLES, href: "/candles" },
  { id: 3, label: Text.MENU.HOME, href: "/home" },
  { id: 4, label: Text.MENU.HANDS, href: "/hands" },
  { id: 5, label: Text.MENU.PANTRY, href: "/pantry" },
  { id: 6, label: Text.MENU.COLLECTIONS, href: "/collections" },
  { id: 7, label: Text.MENU.GIFTS, href: "/gifts" },
];

export default MenuItems;

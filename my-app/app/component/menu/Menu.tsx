import React from "react";
import Logo from "../logo/Logo";
import { MenuItems } from "@/app/models/menuItems";
import Link from "next/link";
import Style from "./Menu.module.scss";
import Languages from "../languages/Languages";
import Search from "../search/Search";
import { TranslationData } from "../languageProvider/LanguageProvider";
const Menu = () => {
  const menuItems = MenuItems();
  return (
    <div
      className={`${Style.container} flex items-center justify-between font-semibold h-[84px] px-[50px] `}
    >
      <Logo />
      <ul className="flex items-center justify-center">
        {menuItems.map((item: TranslationData) => (
          <li
            className={`px-[15px] text-brown-normal relative ${Style.items}`}
            key={item.id}
          >
            <Link href={item.href}>{item.label}</Link>
            <span
              className={`h-[1px] absolute bottom-[-5px] left-0 w-full bg-brown-normal ${Style.hover_line}`}
            ></span>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <Languages />
        <Search />
      </div>
    </div>
  );
};
export default Menu;

import React, { useState, useRef } from "react";
import Logo from "../logo/Logo";
import { MenuItems } from "@/app/models/menuItems";
import Link from "next/link";
import Style from "./Menu.module.scss";
import Languages from "../languages/Languages";
import Search from "../search/Search";
import { TranslationData } from "../languageProvider/LanguageProvider";
import MiniCart from "../miniCart/MiniCart";

const Menu = () => {
  const menuItems = MenuItems();
  const [hoveredItem, setHoveredItem] = useState<TranslationData | null>(null);

  const megaMenuRef = useRef<HTMLDivElement | null>(null); // Create a ref for mega menu

  const handleMenuItemMouseEnter = (item: TranslationData) => {
    setHoveredItem(item); // Show mega menu when hovering over menu item
  };

  const handleMenuItemMouseLeave = () => {
    // Close the mega menu when the mouse leaves all items, but only if the mouse isn't over the mega menu
    if (
      megaMenuRef.current &&
      !megaMenuRef.current.contains(document.querySelector(":hover"))
    ) {
      setHoveredItem(null);
    }
  };

  const handleMegaMenuMouseEnter = () => {
    // When hovering the mega menu, keep it visible
    if (hoveredItem) {
      setHoveredItem(hoveredItem);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    // Close the mega menu if the mouse leaves both the mega menu and menu items
    setHoveredItem(null);
  };

  return (
    <div
      className={`${Style.container} relative flex items-center justify-between font-semibold h-[84px] px-[50px]`}
    >
      <Logo />
      <ul className="flex items-center justify-center h-[100%]">
        {menuItems.map((item: TranslationData) => (
          <li
            className={`px-[15px] relative text-brown-normal font-thin ${Style.items} h-[100%] flex flex-col justify-center`}
            key={item.id}
            onMouseEnter={() => handleMenuItemMouseEnter(item)}
            onMouseLeave={handleMenuItemMouseLeave}
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
        <MiniCart menuItems={menuItems} />
      </div>
      {hoveredItem && (
        <div
          ref={megaMenuRef} // Attach the ref to the mega menu
          className={`left-0 z-10 backdrop-blur-[10px] max-w-[100vw] w-full absolute top-[100%] ${Style.mega_menu}`}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        >
          <div className="p-4">
            <div className="grid grid-cols-4">
              {hoveredItem.columns.map(
                (column: TranslationData, columnIndex: number) => (
                  <ul key={columnIndex} className="px-[60px]">
                    <li className="text-brown-normal underline mb-2 font-light">
                      <Link href={column.href}>{column.title}</Link>
                    </li>
                    {column.items.map(
                      (item: TranslationData, itemIndex: number) => (
                        <li
                          className="text-brown-normal text-[14px] mb-2 font-thin"
                          key={itemIndex}
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      )
                    )}
                  </ul>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

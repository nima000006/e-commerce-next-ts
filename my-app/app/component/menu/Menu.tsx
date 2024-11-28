import React, { useState, useRef } from "react";
import Logo from "../logo/Logo";
import { MenuItems } from "@/app/models/menuItems";
import Link from "next/link";
import Style from "./Menu.module.scss";
import Languages from "../languages/Languages";
import Search from "../search/Search";
import { TranslationData } from "../languageProvider/LanguageProvider";
import MiniCart from "../miniCart/MiniCart";
import { useBreakpoint } from "@/app/tools/CheckBreakPoint";
import HamburgerIcon from "../hamburgerIcon/HamburgerIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import CloseIcon from "../closeIcon/CloseIcon";

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeCart = () => setIsOpen(false);
  const menuItems = MenuItems();
  const breakpoint = useBreakpoint();
  const toggleCart = () => setIsOpen(!isOpen);
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const positionClass =
    selectedLanguage === "Fa" ? "translate-x-full" : "-translate-x-full";
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
      className={`${Style.container} relative flex items-center justify-between font-semibold h-[84px] px-[25px]`}
    >
      {/* Hamburger Icon for smaller breakpoints */}
      {breakpoint && ["sm", "md", "lg"].includes(breakpoint) && (
        <>
          <div className="flex items-center justify-center">
            <button onClick={toggleCart}>
              <HamburgerIcon />
            </button>

            {breakpoint && ["sm", "md"].includes(breakpoint) && <Search />}
          </div>
          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-10"
              onClick={closeCart}
            />
          )}
          {/* Cart Sidebar */}
          <div
            className={`fixed top-0 p-5 ${
              selectedLanguage === "Fa" ? "right-0" : "left-0"
            } w-[300px] h-full bg-white-normal border border-l-brown-normal shadow-lg z-20 transform ${
              isOpen ? "translate-x-0" : positionClass
            } ${
              isOpen !== null
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
          >
            <div className="flex items-center justify-end">
              <CloseIcon onClick={closeCart} />
            </div>

            <ul className="flex flex-col">
              {menuItems.map((item: TranslationData) => (
                <li key={item.id} className={Style.menulist_mobile_container}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 text-[18px] border border-transparent border-b-brown-normal justify-between uppercase text-brown-normal font-thin mb-5"
                  >
                    {item.label} <span>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <Logo />

      {/* Regular Menu for larger screens */}
      {breakpoint === "xl" && (
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
      )}

      <div className="flex items-center">
        <Languages />
        {breakpoint && ["lg", "xl"].includes(breakpoint) && (
          <>
            <Search />
          </>
        )}
        <MiniCart menuItems={menuItems} />
      </div>

      {/* Mega Menu */}
      {hoveredItem && (
        <div
          ref={megaMenuRef} // Attach the ref to the mega menu
          className={`left-0 z-20 backdrop-blur-[10px] max-w-[100vw] w-full absolute top-[100%] ${Style.mega_menu}`}
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

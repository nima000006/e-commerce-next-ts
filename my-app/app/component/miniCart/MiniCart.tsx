import React, { FC, useState } from "react";
import BagIcon from "../bagIcon/BagIcon";
import {
  TranslationData,
  useTranslation,
} from "../languageProvider/LanguageProvider";
import CloseIcon from "../closeIcon/CloseIcon";
import Link from "next/link";
import Style from "./MiniCart.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/languageSlice";

interface Props {
  menuItems: TranslationData;
}

const MiniCart: FC<Props> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const t = useTranslation();

  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  // Set the initial position based on language without transition effect
  const cartPositionClass =
    selectedLanguage === "Fa" ? "-translate-x-full" : "translate-x-full";

  return (
    <div className="px-[12px]">
      <button onClick={toggleCart}>
        <BagIcon />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-10"
          onClick={closeCart}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 ${
          selectedLanguage === "Fa" ? "left-0" : "right-0"
        } w-[300px] h-full bg-white-normal border border-r-brown-normal shadow-lg z-20 ${
          isOpen
            ? "transform translate-x-0 transition-transform duration-500 ease-in-out"
            : cartPositionClass
        }`}
      >
        <div className="h-full">
          <div className="border border-b-[#8c735338] p-[15px] flex justify-between">
            <span className="text-brown-normal font-thin text-[14px]">
              {`${t("CART")}`} (0)
            </span>
            <CloseIcon onClick={closeCart} />
          </div>
          <div className="p-[15px] flex flex-col w-full h-full justify-center ">
            <p className="text-brown-normal text-center mb-5 text-[14px] font-thin">{`${t(
              "CART_EMPTY"
            )}`}</p>
            <div className={`w-full ${Style.grid_container}`}>
              {menuItems.map((item: TranslationData) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className="h-[43px] border border-brown-normal text-brown-normal text-[14px] font-thin flex items-center justify-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;

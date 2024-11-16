import React, { FC, useEffect, useState } from "react";
import BagIcon from "../bagIcon/BagIcon";
import {
  TranslationData,
  useTranslation,
} from "../languageProvider/LanguageProvider";
import CloseIcon from "../closeIcon/CloseIcon";
import Link from "next/link";
import Style from "./MiniCart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartList } from "@/app/redux/fetchCartSlice";
import { AppDispatch, RootState } from "@/app/redux/store";

interface Props {
  menuItems: TranslationData;
}

const MiniCart: FC<Props> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const t = useTranslation();
  // Access cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.fetchCart.items);
  // const cartStatus = useSelector((state: RootState) => state.fetchCart.status);
  // const cartError = useSelector((state: RootState) => state.fetchCart.error);

  const dispatch = useDispatch<AppDispatch>();

  // Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCartList()); // Dispatch fetchCartList to load cart items
  }, [cartItems, dispatch]);

  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  // Set the initial position based on language without transition effect
  const cartPositionClass =
    selectedLanguage === "Fa" ? "-translate-x-full" : "translate-x-full";

  return (
    <div className="px-[12px]">
      <button className="relative" onClick={toggleCart}>
        <BagIcon />
        {cartItems.length > 0 && (
          <span className="absolute top-[-5px] w-[16px] h-[16px] rounded-full flex items-center justify-center right-[-5px] text-[10px] text-white-normal bg-brown-normal">
            {cartItems.length > 9 ? "9+" : cartItems.length}
          </span>
        )}
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
              {`${t("CART")}`} ({cartItems.length})
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

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
import { fetchCartList } from "@/app/redux/addToCartSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import ProductRecommender from "./ProductRecommender";
import AddToCartProducts from "./AddToCartProducts";
import Button from "../button/Button";

interface Props {
  menuItems: TranslationData;
}

const MiniCart: FC<Props> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);
  const t = useTranslation();
  // Access cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch cart items when the component mounts
  useEffect(() => {
    dispatch(fetchCartList()); // Dispatch fetchCartList to load cart items
  }, [dispatch]);

  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  // Set the initial position based on language without transition effect
  const cartPositionClass =
    selectedLanguage === "Fa" ? "-translate-x-full" : "translate-x-full";
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.count, 0)
    .toFixed(2);;

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
        } w-[300px] h-full bg-white-normal border border-r-brown-normal shadow-lg z-20 transform ${
          isOpen ? "translate-x-0" : cartPositionClass
        } ${
          isOpen !== null ? "transition-transform duration-500 ease-in-out" : ""
        }`}
      >
        <div className="h-[100vh] overflow-hidden flex flex-col">
          <div className="border border-b-[#8c735338] p-[15px] flex justify-between">
            <span className="text-brown-normal font-thin text-[14px]">
              {`${t("CART")}`} ({cartItems.length})
            </span>
            <CloseIcon onClick={closeCart} />
          </div>
          <div
            className={`p-[15px] flex flex-grow-0 flex-shrink-0 flex-col overflow-auto ${
              cartItems.length < 1
                ? Style.container_content
                : Style.container_cart_items
            }`}
          >
            {cartItems.length > 0 ? (
              <AddToCartProducts />
            ) : (
              <>
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
              </>
            )}
            {cartItems.length > 0 ? (
              <div className="absolute bg-white-normal bottom-0 p-[12px] w-full left-0 border border-t-brown-normal border-b-transparent border-l-transparent border-r-transparent">
                <div className="capitalize text-brown-normal font-thin flex items-center justify-between">
                  {`${t("TOTALPRICE")}`}
                  <span>${totalPrice}</span>
                </div>
                <Button>
                  <Link href={"/checkout"}>{`${t("CHECKOUT")}`}</Link>
                </Button>
              </div>
            ) : (
              <ProductRecommender />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;

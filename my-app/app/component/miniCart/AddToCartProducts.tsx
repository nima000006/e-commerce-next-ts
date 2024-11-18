/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/models/productsModel";
import React, { useState, useMemo } from "react";
import { useTranslation } from "../languageProvider/LanguageProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeAllCountsOfProducts,
  removeProductFromCart,
} from "@/app/redux/addToCartSlice";
import { AppDispatch, RootState } from "@/app/redux/store";

const FALLBACK_IMAGE =
  "https://www.perfumerh.com/cdn/shop/files/INKRewritten50mlBottleFRONT.jpg?crop=center&height=3431&v=1729121232&width=3431";

const AddToCartProducts = () => {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const t = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.cart.items);

  // Using useMemo to optimize and avoid recalculating grouped products on each render
  const groupedProducts = useMemo(() => {
    return products.reduce<Record<number, Product & { count: number }>>(
      (acc, product) => {
        if (acc[product.id]) {
          acc[product.id].count += 1; // Increment count if `id` already exists
        } else {
          acc[product.id] = { ...product, count: 1 }; // Add new product with count = 1
        }
        return acc;
      },
      {}
    );
  }, [products]);

  // Handle image loading errors (fallback image)
  const handleImageError = (id: number) => {
    setImageError((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };
  const handleRemoveAll = (id: number) => {
    // Dispatching an array of IDs to remove all instances of the product
    dispatch(removeAllCountsOfProducts([id]));
  };

  return (
    <div>
      {Object.values(groupedProducts).map((item) => (
        <div key={item.id} className="flex my-10">
          <img
            className="w-[90px] h-[90px]"
            src={imageError[item.id] ? FALLBACK_IMAGE : item.image}
            alt={item.name}
            onError={() => handleImageError(item.id)}
          />
          <div>
            <p className="text-[14px] font-thin text-brown-normal">
              {item.name}
            </p>
            <p className="text-[14px] font-thin text-brown-normal mt-2">
              {item.price} x {item.count}
            </p>
            <div className="flex h-[30px] w-[70px] mt-3 items-center border border-brown-100 justify-around text-brown-normal text-[16px]">
              <div
                onClick={() => dispatch(removeProductFromCart(item.id))}
                className="cursor-pointer"
              >
                -
              </div>
              <div className="cursor-pointer font-thin">{item.count}</div>
              <div
                onClick={() => dispatch(addToCart(item))}
                className="cursor-pointer"
              >
                +
              </div>
            </div>
            <div
              className="cursor-pointer my-3 text-brown-normal font-thin"
              onClick={() => handleRemoveAll(item.id)}
            >
              {`${t("MINICART.REMOVE")}`.toUpperCase()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddToCartProducts;

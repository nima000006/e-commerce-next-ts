/* eslint-disable @next/next/no-img-element */
"use client";
import { AppDispatch, RootState } from "@/app/redux/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "../../languageProvider/LanguageProvider";
import { Product } from "@/app/models/productsModel";
import { fetchCartList } from "@/app/redux/addToCartSlice";
import { addToCart } from "../products/Product.service";
import Style from "./Gift.module.scss";
import Link from "next/link";

const Gift = () => {
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToCart = (product: Product) => {
    dispatch(fetchCartList());
    addToCart(product);
  };
  const handleImageError = (id: string) => {
    setImageError((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };
  const t = useTranslation();
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <div className="grid max-w-[1525px] mx-[50px] grid-cols-1 lg:grid-cols-2 mb-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {products
          .filter((item) => item.new) // Filter only new products
          .slice(0, 4) // Limit to the first 4 items
          .map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer flex-col h-full items-center justify-center text-center relative"
            >
              <div className="h-[30px] absolute top-0 left-5 z-10 w-[45px] bg-brown-normal text-white-normal text-[14px] font-bold flex items-center justify-center">
                <p className="pb-1">{`${t("NEW")}`}</p>
              </div>
              <Link
                href={`/products/${item.id}`}
                className={Style.container_image}
              >
                <img
                  onError={() => handleImageError(`${item.id}`)}
                  width={200}
                  height={200}
                  loading="lazy"
                  src={
                    imageError[item.id]
                      ? "https://www.perfumerh.com/cdn/shop/files/INKRewritten50mlBottleFRONT.jpg?crop=center&height=3431&v=1729121232&width=3431"
                      : item.image
                  }
                  alt={item.name}
                />
                <div
                  className={`flex font-semibold text-brown-normal w-full items-center justify-center backdrop-blur-[10px] ${Style.quick_add}`}
                  onClick={() => handleAddToCart(item)} // Pass the product to the handler
                >
                  {`${t("QUICKADD")}`}
                </div>
              </Link>

              <p className="font-semibold text-brown-normal">{item.name}</p>
              <p className="font-thin text-brown-normal mt-2">{item.brand}</p>
              <div className="flex justify-between mt-3">
                <span className="font-thin text-[12px] mx-3 text-brown-100">
                  {`${t("GIFTHEADER")}`}
                </span>
                <span className="font-thin text-[12px] mx-3 text-brown-normal">
                  ${item.price}
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className="bg-gift bg-cover bg-center flex flex-col justify-center items-center">
        <h6 className="text-white-normal font-semibold max-w-[333px] text-[14px]">
          {`${t("GIFTHEADER")}`}
        </h6>
        <em className="text-white-normal font-semibold mt-3 max-w-[333px] text-[14px]">
          {`${t("GIFTDESC")}`}
        </em>
      </div>
    </div>
  );
};

export default Gift;

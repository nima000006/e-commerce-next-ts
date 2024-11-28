/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { fetchProducts } from "@/app/redux/productSlice";
import Style from "./Products.module.scss";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "../../languageProvider/LanguageProvider";
import { Product } from "@/app/models/productsModel";
import { fetchCartList } from "@/app/redux/addToCartSlice";
import { addToCart } from "./Product.service";
import Link from "next/link";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );

  const swiperRef = useRef<any>();
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(false);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  const t = useTranslation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Update Swiper navigation state on slide change
  const handleSlideChange = (swiper: any) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product); // Wait for the item to be added to the cart
      dispatch(fetchCartList()); // Fetch the updated cart list from the server
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleImageError = (id: string) => {
    setImageError((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const renderNavigationButtons = () => {
    const nextButtonDisabled = isLastSlide ? `${Style.disabled}` : "";
    const prevButtonDisabled = isFirstSlide ? `${Style.disabled}` : "";

    return (
      <>
        <button
          className={`h-[40px] w-[40px] ${Style.next} ${Style.button_arrow} ${nextButtonDisabled}`}
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isLastSlide}
        >
          <img
            src="https://www.perfumerh.com/cdn/shop/t/16/assets/icon-arrow-right.svg?v=150928298113663093401724758221"
            alt="Next"
          />
        </button>
        <button
          className={`h-[40px] w-[40px] ${Style.prev} ${Style.button_arrow} ${prevButtonDisabled}`}
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isFirstSlide}
        >
          <img
            src="https://www.perfumerh.com/cdn/shop/t/16/assets/icon-arrow-right.svg?v=150928298113663093401724758221"
            alt="Previous"
            className="rotate-180"
          />
        </button>
      </>
    );
  };

  return (
    <div className={`p-[25px] relative ${Style.container}`}>
      {status === "loading" && (
        <div className="grid grid-cols-5 gap-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton height={200} width={200} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </div>
            ))}
        </div>
      )}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div>
          <Swiper
            key={selectedLanguage}
            dir={selectedLanguage === "Fa" ? "rtl" : "ltr"}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={2.5}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className={`flex flex-col justify-between cursor-pointer ${Style.swiper_slide}`}
                >
                  <Link
                    href={`/products/${item.id}`}
                    className={Style.swiper_slide_image}
                  >
                    <img
                      src={
                        imageError[item.id]
                          ? "https://www.perfumerh.com/cdn/shop/files/INKRewritten50mlBottleFRONT.jpg?crop=center&height=3431&v=1729121232&width=3431"
                          : item.image
                      }
                      alt={item.brand}
                      width={200}
                      height={200}
                      loading="lazy"
                      onError={() => handleImageError(`${item.id}`)}
                    />
                    <div
                      className={`flex font-semibold text-brown-normal w-full items-center justify-center backdrop-blur-[10px] ${Style.quick_add}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleAddToCart(item);
                      }}
                    >
                      {`${t("QUICKADD")}`}
                    </div>
                  </Link>
                  <h3 className="text-center mt-5 font-semibold text-brown-normal">
                    {item.brand}
                  </h3>
                  <p className="text-center font-thin mt-3 text-brown-normal">
                    {item.name}
                  </p>
                  <p className="text-center font-thin text-brown-normal">
                    ${item.price.toFixed(2)}
                  </p>
                  {item.new && (
                    <div className="h-[30px] absolute t-0 left-0 w-[45px] bg-brown-normal text-white-normal text-[14px] font-bold flex items-center justify-center">
                      <p className="pb-1">{`${t("NEW")}`}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-between">
            {renderNavigationButtons()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

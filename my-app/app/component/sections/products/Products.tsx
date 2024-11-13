/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
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
import Skeleton from "react-loading-skeleton"; // Import the skeleton loader
import { useTranslation } from "../../languageProvider/LanguageProvider";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  ); // Assuming you store the direction in Redux

  const swiperRef = useRef<any>();
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [swiperInstance, setSwiperInstance] = useState<any>(null); // To store the swiper instance
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(false); // To track if it's the first slide
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false); // To track if it's the last slide

  const t = useTranslation();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update(); // Ensure Swiper recalculates layout on language change
    }
  }, [selectedLanguage, swiperInstance]);

  useEffect(() => {
    // Set initial state on first render
    if (swiperInstance) {
      handleSlideChange(); // Ensure correct initial disabled state
    }
  }, [swiperInstance]);

  const handleImageError = (id: string) => {
    setImageError((prevState: { [key: string]: boolean }) => ({
      ...prevState,
      [id]: true,
    }));
  };

  const handleSlideChange = () => {
    if (swiperInstance) {
      const isFirst = swiperInstance.isBeginning; // Check if it's the first slide
      const isLast = swiperInstance.isEnd; // Check if it's the last slide
      setIsFirstSlide(isFirst);
      setIsLastSlide(isLast);
    }
  };

  // Custom navigation buttons for RTL/LTR
  const renderNavigationButtons = () => {
    const nextButtonDisabled = isLastSlide ? `${Style.disabled}` : "";
    const prevButtonDisabled = isFirstSlide ? `${Style.disabled}` : "";

    if (selectedLanguage === "Fa") {
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
    }

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
    <div className={`p-[50px] relative ${Style.container}`}>
      {status === "loading" && (
        <div className="grid grid-cols-5 gap-4">
          {/* Skeleton Loader for Products */}
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
            key={selectedLanguage} // This forces re-render when language changes
            dir={selectedLanguage === "Fa" ? "rtl" : "ltr"} // Set the direction based on language
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
              setSwiperInstance(swiper); // Save swiper instance
            }}
            spaceBetween={50}
            slidesPerView={5}
            navigation={false} // Disable default navigation
            pagination={false}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={handleSlideChange} // Update slide status on change
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className={`flex flex-col justify-between cursor-pointer ${Style.swiper_slide}`}
                >
                  <div className={Style.swiper_slide_image}>
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
                      onError={() => handleImageError(`${item.id}`)} // Trigger error handler
                    />
                    <div
                      className={`flex font-semibold text-brown-normal w-full items-center justify-center backdrop-blur-[10px] ${Style.quick_add}`}
                    >
                      {`${t("QUICKADD")}`}
                    </div>
                  </div>

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

          {/* Custom Navigation Buttons based on Direction */}
          <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-between">
            {renderNavigationButtons()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

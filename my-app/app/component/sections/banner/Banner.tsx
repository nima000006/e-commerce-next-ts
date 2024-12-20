"use client";
import React from "react";
import Button from "../../button/Button";
import { useTranslation } from "../../languageProvider/LanguageProvider";

const Banner = () => {
  const t = useTranslation();
  return (
    <div className="grid max-w-[1525px] md:mx-[25px] mx-0 grid-cols-1 lg:grid-cols-2 h-[650px] mb-[50px]">
      <div className="bg-banner bg-cover bg-center  lg:min-h-0 min-h-[200px]"></div>
      <div className="bg-[#1a3d94] flex px-5 flex-col justify-center items-center text-center">
        <h6 className="text-brown-light font-thin max-w-[333px] text-[14px]">
          {`${t("BANNERHEADER")}`}
        </h6>
        <p className="text-brown-light font-thin mt-3 max-w-[333px] text-[14px]">
          {`${t("BANNERDESC")}`}
        </p>
        <Button width="w-32 mt-3">{`${t("SHOPNOW")}`}</Button>
      </div>
    </div>
  );
};

export default Banner;

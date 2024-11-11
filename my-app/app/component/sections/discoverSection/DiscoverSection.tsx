"use client";
import React, { useState } from "react";
import { useTranslation } from "../../languageProvider/LanguageProvider";
import Link from "next/link";
import PlayIcon from "../../playIcon/PlayIcon";
import CloseIcon from "../../closeIcon/CloseIcon";
const DiscoverSection = () => {
  const [openPopOp, setOpenPopOp] = useState<boolean>(false);
  const t = useTranslation();

  const OpenPopUp = () => {
    setOpenPopOp(true);
  };
  const ClosePopUp = () => {
    setOpenPopOp(false);
  };
  return (
    <div className="bg-white-normal mb-5">
      <div
        className={`max-w-[1525px]  mx-[50px] max-h-[400px] flex justify-center relative`}
      >
        <div className="image-overlay bg-[#2c200433] absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <div className="max-w-[225px] m-auto z-10">
            <h5 className="text-center text-[16px] text-white-normal font-semibold">{`${t(
              "DISCOVER.HEAD"
            )}`}</h5>
            <p className="text-center text-[12px] text-white-normal  mt-2">{`${t(
              "DISCOVER.DESC"
            )}`}</p>
            <div className="flex justify-between mt-10">
              <button className="w-[121px] h-[40px] flex justify-center items-center text-[12px] font-thin bg-white-normal cursor-pointer">
                <Link href={"/more"}>{`${t("DISCOVER.MORE")}`}</Link>
              </button>
              <button
                onClick={OpenPopUp}
                className="w-[40px] h-[40px] flex justify-center items-center text-[12px] font-thin bg-white-normal cursor-pointer"
              >
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
        <video
          playsInline
          autoPlay
          loop
          muted
          preload="metadata"
          className="w-full object-cover"
        >
          <source
            src="//www.perfumerh.com/cdn/shop/videos/c/vp/c1eb73b7594040269626378c076ed806/c1eb73b7594040269626378c076ed806.HD-720p-4.5Mbps-37290860.mp4?v=0"
            type="video/mp4"
          ></source>
        </video>
      </div>
      {openPopOp && (
        <div className="fixed flex flex-col justify-center items-end z-30 top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)]">
          <button
            className="w-[40px] h-[40px] flex justify-center items-center text-[12px] font-thin bg-white-normal cursor-pointer"
            onClick={ClosePopUp}
          >
            <CloseIcon />
          </button>
          <video
            playsInline
            controls
            preload="metadata"
            className="object-cover w-[60%] h-[60%] m-auto"
          >
            <source
              src="//www.perfumerh.com/cdn/shop/videos/c/vp/c1eb73b7594040269626378c076ed806/c1eb73b7594040269626378c076ed806.HD-720p-4.5Mbps-37290860.mp4?v=0"
              type="video/mp4"
            ></source>
          </video>
        </div>
      )}
    </div>
  );
};

export default DiscoverSection;

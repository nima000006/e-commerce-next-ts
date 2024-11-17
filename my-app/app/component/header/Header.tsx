"use client";
import React, { useEffect, useState } from "react";
import BoxLine from "../boxLine/BoxLine";
import Menu from "../menu/Menu";
import { useTranslation } from "../languageProvider/LanguageProvider";

const Header = () => {
  const t = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 32) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <BoxLine
        className={`flex justify-center items-center h-[32px] text-white-normal bg-brown-normal text-[16px]`}
      >
        {`${t("TEXT_ABOVE")}`}
      </BoxLine>
      <div className={`${isSticky ? "fixed top-0 left-0 right-0 z-50 bg-white-normal" : ""}`}>
        <Menu />
      </div>
      <BoxLine
        className={`flex justify-center items-center bg-white-normal text-brown-normal h-[41px] text-[14px]`}
      >
        {`${t("TEXT_UNDER")}`}
      </BoxLine>
    </div>
  );
};

export default Header;

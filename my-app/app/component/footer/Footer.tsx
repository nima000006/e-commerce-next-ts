"use client";
import React from "react";
import FooterForm from "../footerForm/FooterForm";
import MenuFooter from "../menuFooter/MenuFooter";

import AboutFooter from "../aboutFooter/AboutFooter";
import { menuItems1, menuItems2 } from "@/app/models/menuFooterItemsModel";
import { useTranslation } from "../languageProvider/LanguageProvider";
import Link from "next/link";

const Footer: React.FC = () => {
  const t = useTranslation();
  return (
    <>
      <footer className="grid border border-t-1 border-l-0 border-r-0 border-b-0 border-brown-normal grid-cols-4 gap-[32px] max-w-[1525px] px-[25px] m-auto pt-[75px] pb-[35px]">
        <FooterForm />
        <MenuFooter items={menuItems1} />
        <MenuFooter items={menuItems2} />
        <AboutFooter />
      </footer>
      <footer className="flex justify-between items-center text-brown-normal font-thin text-[14px] w-full h-[40px] max-w-[1525px] px-[25px] m-auto">
        <div className="flex w-[50%]  items-center ">
          <p className="mx-2">{`${t("POWERED_BY")}`}</p>

          <Link href={"/terms"} className="mx-2">{`${t("TERMS")}`}</Link>
          <Link href={"/cookies"} className="mx-2">{`${t("COOKIES")}`}</Link>
          <Link href={"/privacy"} className="mx-2">{`${t("PRIVACY")}`}</Link>
        </div>
        <p>{`${t("COPYRIGHT")}`}</p>
      </footer>
    </>
  );
};

export default Footer;

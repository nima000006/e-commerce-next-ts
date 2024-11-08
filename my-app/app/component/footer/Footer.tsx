"use client";
import React from "react";
import FooterForm from "../footerForm/FooterForm";
import MenuFooter from "../menuFooter/MenuFooter";

import AboutFooter from "../aboutFooter/AboutFooter";
import { menuItems1, menuItems2 } from "@/app/models/menuFooterItemsModel";

const Footer: React.FC = () => {
  return (
    <footer className="grid border border-t-1 border-l-0 border-r-0 border-b-0 border-brown-normal grid-cols-4 gap-[32px] max-w-[1525px] px-[50px] m-auto pt-[75px] pb-[35px]">
      <FooterForm />
      <MenuFooter items={menuItems1} />
      <MenuFooter items={menuItems2} />
      <AboutFooter />
    </footer>
  );
};

export default Footer;

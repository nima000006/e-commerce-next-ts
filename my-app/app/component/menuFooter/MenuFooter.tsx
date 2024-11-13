import React from "react";
import { MenuFooterModel } from "@/app/models/menuFooterItemModel";
import Link from "next/link";
import { useTranslation } from "../languageProvider/LanguageProvider";

const MenuFooter: React.FC<MenuFooterModel> = ({ items }) => {
    const t = useTranslation();
    
  return (
    <div className="flex justify-around">
      <ul>
        {items.map((item, index) => (
          <li className="mb-3 text-brown-normal" key={index}>
            {item.path ? (
              <Link href={item.path}>{`${t(item.label)}`}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuFooter;

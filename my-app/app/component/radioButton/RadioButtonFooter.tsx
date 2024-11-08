"use client";
import React from "react";
import { useTranslation } from "../languageProvider/LanguageProvider";
import RadioGroup from "./RadioGroup";
const RadioButtonFooter = () => {
  const t = useTranslation();

  return (
    <div>
      <p className={`capitalize text-brown-normal text-[14px] mt-5`}>{`${t(
        "FOOTER.SELECT_LANG"
      )}`}</p>
      <RadioGroup />
    </div>
  );
};

export default RadioButtonFooter;

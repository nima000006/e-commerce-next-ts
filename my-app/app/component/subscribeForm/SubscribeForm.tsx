"use client";
import React from "react";
import { useTranslation } from "../languageProvider/LanguageProvider";
import ErrorMandatory from "../errorMandatory/ErrorMandatory";

const SubscribeForm = () => {
  const t = useTranslation();

  return (
    <div>
      <p className={`uppercase text-brown-normal text-[14px]`}>{`${t(
        "FOOTER.SIGN_UP"
      )}`}</p>
      <div className="relative inline-block w-full">
        <input
          className={`w-full mt-5 border h-[50px] px-[16px] border-gray-500 text-[14px] placeholder:text-gray-500`}
          type="email"
          placeholder={`${t("FOOTER.PLACEHOLDER_EMAIL")}`}
        />
        <ErrorMandatory />
      </div>
    </div>
  );
};

export default SubscribeForm;

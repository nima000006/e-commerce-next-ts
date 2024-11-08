"use client";
import React, { FC, useState } from "react";
import { useTranslation } from "../languageProvider/LanguageProvider";
import ErrorMandatory from "../errorMandatory/ErrorMandatory";

interface Props {
  mandatory: boolean;
}
const SubscribeForm: FC<Props> = ({ mandatory }) => {
  const t = useTranslation();
  const [email, setEmail] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const showError = mandatory && email.trim() === "";
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
          value={email}
          onChange={handleInputChange}
        />
        {showError && <ErrorMandatory />}
      </div>
    </div>
  );
};

export default SubscribeForm;

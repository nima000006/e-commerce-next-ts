"use client";
import React from "react";
import Style from "./ErrorMandatory.module.scss";
import { useTranslation } from "../languageProvider/LanguageProvider";
const ErrorMandatory = () => {
  const t = useTranslation();
  return (
    <div className={`${Style.container}`}>
      <div className={`${Style.container_box}`}>
        <span role="alert">{`${t("ERROR.MANDATORY")}`}</span>
      </div>
    </div>
  );
};

export default ErrorMandatory;

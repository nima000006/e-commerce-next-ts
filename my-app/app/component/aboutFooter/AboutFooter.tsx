"use client";
import React from 'react';
import { useTranslation } from '../languageProvider/LanguageProvider';

const AboutFooter = () => {
    const t = useTranslation();
    return (
      <div>
        <h2 className="text-brown-normal text-[24px]">{`${t(
          "FOOTER.ABOUTUS"
        )}`}</h2>
        <p className="mt-5 text-brown-normal text-[14px]">
          {`${t("FOOTER.DESCRIBE")}`}
        </p>
      </div>
    );
}

export default AboutFooter;

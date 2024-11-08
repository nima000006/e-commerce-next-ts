"use client";
import React from 'react';
import { useTranslation } from '../languageProvider/LanguageProvider';

const Button = () => {
    const t = useTranslation();
    return <button className='bg-brown-normal mt-4 h-[43px] w-full text-white-normal text-[14px]' type="submit">{`${t("FOOTER.SUBSCRIBE")}`}</button>;
}

export default Button;

"use client";
import BoxLine from "./component/boxLine/BoxLine";
import { useTranslation } from "./component/languageProvider/LanguageProvider";
import Menu from "./component/menu/Menu";

export default function Home() {
    const t = useTranslation();
  return (
    <div>
      <BoxLine
        className={`flex justify-center items-center h-[32px] text-white-normal bg-brown-normal text-[16px]`}
      >
        {`${t("TEXT_ABOVE")}`}
      </BoxLine>
      <Menu />
      <BoxLine
        className={`flex justify-center items-center bg-white-normal text-brown-normal h-[41px] text-[14px]`}
      >
        {`${t("TEXT_UNDER")}`}
      </BoxLine>
    </div>
  );
}

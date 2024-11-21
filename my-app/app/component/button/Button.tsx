"use client";
import React, { FC } from "react";
import Style from "./Button.module.scss";
interface Props {
  children: string;
}
const Button: FC<Props> = ({ children }) => {
  return (
    <button
      className={`bg-brown-normal mt-4 h-[43px] w-full text-white-normal text-[14px] ${Style.button}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;

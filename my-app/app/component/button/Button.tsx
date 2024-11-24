"use client";
import React, { FC, ReactNode } from "react";
import Style from "./Button.module.scss";
interface Props {
  children: ReactNode;
  width?: string
}
const Button: FC<Props> = ({ children, width }) => {
  return (
    <button
      className={`bg-brown-normal mt-4 h-[43px] ${
        width ? width : "w-full"
      } text-white-normal text-[14px] ${Style.button}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;

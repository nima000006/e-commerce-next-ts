import React, { FC } from "react";
import Style from "./CloseIcon.module.scss";
interface Props {
  onClick?: () => void;
}
const CloseIcon: FC<Props> = ({ onClick }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className={`icon icon-cancel text-brown-normal cursor-pointer ${Style.svg}`}
      viewBox="0 0 24 24"
      height={24}
      width={24}
      onClick={onClick}
    >
      <path
        d="M6.758 17.243 12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default CloseIcon;

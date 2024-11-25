import React from "react";

const HamburgerIcon = () => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      className="text-brown-normal stroke-brown-normal"
      viewBox="0 0 24 24"
      width={20}
      height={20}
    >
      <path
        d="M3 5h18M3 12h18M3 19h18"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default HamburgerIcon;

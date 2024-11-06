import React, { FC } from "react";
interface Props {
  onClick: () => void;
}
const SearchIcon: FC<Props> = ({ onClick }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      className="text-brown-normal text-[20px] cursor-pointer"
      fill="#fff"
      height={24}
      width={24}
      onClick={onClick}
    >
      <g stroke="currentColor">
        <path d="M10.85 2c2.444 0 4.657.99 6.258 2.592A8.85 8.85 0 1 1 10.85 2ZM17.122 17.122 22 22"></path>
      </g>
    </svg>
  );
};

export default SearchIcon;

"use client";
import React, { FC, useState } from "react";
import ErrorMandatory from "../errorMandatory/ErrorMandatory";
import ArrowIcon from "../arrowIcon/ArrowIcon";
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
];
interface Props {
  mandatory: boolean;
}
const Autocomplete: FC<Props> = ({ mandatory }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };
  const showError = mandatory && selectedCountry === null;
  return (
    <div className="relative inline-block w-full">
      <div
        onClick={handleToggle}
        className={`w-full mt-5 h-[50px] cursor-pointer text-brown-normal border border-gray-500 text-[14px] placeholder:text-gray-500 px-[16px] flex items-center justify-between`}
      >
        {selectedCountry || "Select a country"}
        <ArrowIcon isOpen={isOpen} />
      </div>
      {isOpen && (
        <ul className="absolute w-full mt-1 border bg-white-normal z-10 border-gray-300 bg-white rounded-md max-h-[120px] overflow-y-auto">
          {countries.map((item) => (
            <li
              key={item}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer p-2 text-brown-normal ${
                selectedCountry === item ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {showError && <ErrorMandatory />}
    </div>
  );
};

export default Autocomplete;

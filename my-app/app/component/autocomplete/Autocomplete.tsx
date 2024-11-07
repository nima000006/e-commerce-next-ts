"use client";
import React from "react";
import ErrorMandatory from "../errorMandatory/ErrorMandatory";
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "India",
];

const Autocomplete = () => {
  return (
    <>
      <div className="relative inline-block w-full">
        <select
          className={`w-full mt-5 border h-[50px] pl-[16px] border-gray-500 text-[14px] placeholder:text-gray-500`}
        >
          {countries.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ErrorMandatory />
      </div>
    </>
  );
};

export default Autocomplete;

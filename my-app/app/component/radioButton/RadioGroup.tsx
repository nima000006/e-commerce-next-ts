import React, { FC, useState } from "react";
import styles from "./RadioButtonFooter.module.scss";

interface Props {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
}
const CustomRadioButton: FC<Props> = ({
  label,
  value,
  selectedValue,
  onChange,
}) => {
  return (
    <label className={styles.container}>
      {label}
      <input
        type="radio"
        value={value}
        checked={selectedValue === value}
        onChange={() => onChange(value)}
        name="customRadio"
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

const RadioGroup = () => {
  const [selectedValue, setSelectedValue] = useState("One");

  return (
    <div className="mt-5">
      {["English", "Local Language"].map((label) => (
        <CustomRadioButton
          key={label}
          label={label}
          value={label}
          selectedValue={selectedValue}
          onChange={setSelectedValue}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

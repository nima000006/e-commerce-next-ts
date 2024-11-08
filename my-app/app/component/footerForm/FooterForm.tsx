"use client";
import React, { useState } from "react";
import SubscribeForm from "../subscribeForm/SubscribeForm";
import Autocomplete from "../autocomplete/Autocomplete";
import RadioButtonFooter from "../radioButton/RadioButtonFooter";
import Button from "../button/Button";

const FooterForm = () => {
  const [validation, setValidation] = useState<boolean>(false);
  const FormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidation(true);
  };
  return (
    <>
      <form onSubmit={FormHandler}>
        <SubscribeForm mandatory={validation} />
        <Autocomplete mandatory={validation} />
        <RadioButtonFooter />
        <Button />
      </form>
    </>
  );
};

export default FooterForm;

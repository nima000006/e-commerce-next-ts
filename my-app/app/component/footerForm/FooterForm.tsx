"use client";
import React, { useState } from "react";
import SubscribeForm from "../subscribeForm/SubscribeForm";
import Autocomplete from "../autocomplete/Autocomplete";
import RadioButtonFooter from "../radioButton/RadioButtonFooter";
import Button from "../button/Button";
import { useTranslation } from "../languageProvider/LanguageProvider";

const FooterForm = () => {
  const [validation, setValidation] = useState<boolean>(false);
    const t = useTranslation();
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
        <Button>{`${t("FOOTER.SUBSCRIBE")}`}</Button>
      </form>
    </>
  );
};

export default FooterForm;

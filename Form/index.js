import React from "react";
import { ClLayout, ClForm } from "mp-colorui";
import FormButton from "../FormButton";

import useValidate from "../../hooks/useValidate";

import "./index.scss";

function Form(props) {
  const btnText = props.btnText || '提交'
  
  const formData = props.formData || {}
  const rules = props.rules || {}
  const messages = props.messages || {}

  const [form, setForm, validateForm, formRules, formRef] = useValidate(
    formData,
    rules,
    messages
  );

  function handleSubmit() {
    if (typeof props.onClick === "function") {
      props.onClick(form);
    }
  }

  return (
    <ClLayout className="wrapper">
      <ClForm ref={formRef} model={form} rules={formRules}>
        {/* <props.children form={form} setForm={setForm} /> */}
        {React.Children.map(props.children, child => {
          return React.cloneElement(child, {
            form,
            setForm,
          })
        })}
      </ClForm>

      <FormButton
        btnText={btnText}
        validateForm={validateForm}
        onClick={handleSubmit}
      />
    </ClLayout>
  );
};

export default Form;

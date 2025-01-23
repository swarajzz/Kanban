import React from "react";

interface FormProps {
  submitHandler: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

function Form({ submitHandler, children }: FormProps) {
  return (
    <form
      onSubmit={submitHandler}
      className="txt-xs flex flex-col gap-4 px-8 pb-4"
    >
      {children}
    </form>
  );
}

export default Form;

import React from "react";

function Form({ submitHandler, children }) {
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

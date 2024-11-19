import React from "react";

function Input({
  register,
  name,
  validationSchema,
  element = "input",
  ...rest
}) {
  return (
    <>
      {element === "input" && (
        <input
          className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
          {...register(name, validationSchema)}
          {...rest}
        />
      )}
      {element === "select" && (
        <>
          <select
            className="border-grey-300 w-full max-w-xl rounded bg-primary-500 px-4 py-2 text-white"
            {...register(name, validationSchema)}
            {...rest}
          />

          <svg
            width="10"
            height="7"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </>
      )}
      {element === "textarea" && (
        <textarea
          className="border-grey-300 rounded bg-primary-500 px-4 py-2 text-white"
          {...register(name, validationSchema)}
          {...rest}
        />
      )}
    </>
  );
}

export default Input;

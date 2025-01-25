import { RegisterOptions, UseFormRegister, Controller } from "react-hook-form";

type RestProps = {
  placeholder?: string;
  type?: string;
  rows?: number;
  cols?: number;
};

type InputProps = {
  register: UseFormRegister<any>;
  name: string;
  validationSchema?: RegisterOptions;
  element?: "input" | "select" | "textarea";
  value?: string;
  defaultValue?: string;
  control?: any;
  children?: React.ReactNode;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
} & RestProps;

function Input({
  register,
  name,
  validationSchema,
  element = "input",
  type = "input",
  defaultValue,
  control,
  onChange,
  children,
  ...rest
}: InputProps) {
  return (
    <>
      {element === "input" && (
        <input
          className={
            type === "checkbox"
              ? "border-blue-gray-200 shadow-input peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-opacity-20 font-semibold transition-all checked:border-primary-300 checked:bg-accent-200"
              : "shadow-input w-full max-w-xl rounded border-primary-300 border-opacity-20 bg-content_bkg px-4 py-2 font-semibold text-theme_white transition duration-300 ease-in-out hover:border-accent-200"
          }
          type={type}
          {...register(name, validationSchema)}
          {...rest}
        />
      )}
      {element === "select" && (
        <>
          <Controller
            name={name}
            control={control}
            rules={validationSchema}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="shadow-input text-theme_grey w-full max-w-xl cursor-pointer rounded border-primary-300 border-opacity-20 bg-content_bkg px-4 py-2 text-[13px] font-semibold transition duration-300 ease-in-out hover:border-accent-200"
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e);
                  }}
                >
                  {children}
                </select>

                {/* <svg
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
                </svg> */}
              </>
            )}
          />
        </>
      )}
      {element === "textarea" && (
        <textarea
          className="shadow-input cursor-pointer rounded border-primary-300 border-opacity-20 bg-content_bkg px-4 py-2 text-[13px] font-semibold leading-6 text-theme_white transition duration-300 ease-in-out hover:border-accent-200"
          {...register(name, validationSchema)}
          {...rest}
        />
      )}
    </>
  );
}

export default Input;

{
  /* <select
            className="border-grey-300 bg-content_bkg w-full max-w-xl cursor-pointer rounded px-4 py-2 text-white"
            {...register(name, validationSchema)}
            defaultValue={defaultValue}
            onChange={onChange}
            {...rest}
          >
            {children}
          </select> */
}

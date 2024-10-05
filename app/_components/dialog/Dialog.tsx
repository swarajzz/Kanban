import { forwardRef, ReactNode } from "react";
import DialogBackdrop from "./DialogBackdrop";

type DialogProps = {
  children: ReactNode;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children }, ref) => {
    return (
      <dialog
        className="relative z-10 transition delay-100 duration-300 ease-in-out"
        ref={ref}
      >
        <DialogBackdrop />
        {children}
      </dialog>
    );
  },
);

Dialog.displayName = "MyComponent";

export default Dialog;

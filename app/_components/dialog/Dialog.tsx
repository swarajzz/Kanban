import { forwardRef, ReactNode } from "react";
import DialogBackdrop from "./DialogBackdrop";

type DialogProps = {
  children: ReactNode;
  toggleDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, toggleDialog }, ref) => {
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
      if (e.currentTarget === e.target) {
        toggleDialog();
      }
    }

    return (
      <dialog
        className="relative z-10 transition delay-100 duration-300 ease-in-out"
        ref={ref}
      >
        <DialogBackdrop />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            onClick={handleClick}
          >
            {children}
          </div>
        </div>
      </dialog>
    );
  },
);

Dialog.displayName = "MyComponent";

export default Dialog;

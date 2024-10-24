import React, { ReactNode } from "react";
import DialogHeading from "./DialogHeading";

type DialogPanelProps = {
  title: string;
  children: ReactNode;
  toggleDialog?: () => void;
  toggleShowDropdown?: () => void;
  icon?: string;
};

function DialogPanel({
  toggleDialog,
  toggleShowDropdown,
  title,
  icon = "close",
  children,
}: DialogPanelProps) {
  return (
    <div className="relative min-w-[480px] my-8 w-full max-w-md transform overflow-hidden rounded-lg bg-primary-500 text-left shadow-xl transition-all">
      <DialogHeading
        title={title}
        toggleDialog={toggleDialog}
        toggleShowDropdown={toggleShowDropdown}
        icon={icon}
      />
      {children}
    </div>
  );
}

export default DialogPanel;

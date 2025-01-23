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
    <div className="relative my-8 w-full min-w-[480px] max-w-md transform cursor-default rounded-lg bg-content_bkg text-left shadow-xl transition-all">
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

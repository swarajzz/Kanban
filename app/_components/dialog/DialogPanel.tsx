import React, { ReactNode } from "react";
import DialogHeading from "./DialogHeading";

type DialogPanelProps = {
  className: string;
  title: string;
  children: ReactNode;
  toggleDialog?: () => void;
  toggleShowDropdown?: () => void;
  icon?: string;
};

function DialogPanel({
  className,
  toggleDialog,
  toggleShowDropdown,
  title,
  icon = "close",
  children,
}: DialogPanelProps) {
  return (
    <div className={className}>
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

import React, { ReactNode } from "react";
import DialogHeading from "./DialogHeading";

type DialogPanelProps = {
  className: string;
  title: string;
  children: ReactNode;
  toggleDialog: () => void;
  toggleIsShow?: () => void;
  icon?: string;
};

function DialogPanel({
  className,
  toggleDialog,
  toggleIsShow,
  title,
  icon,
  children,
}: DialogPanelProps) {
  return (
    <div className={className}>
      <DialogHeading
        title={title}
        toggleDialog={toggleDialog}
        toggleIsShow={toggleIsShow}
        icon={icon}
      />
      {children}
    </div>
  );
}

export default DialogPanel;

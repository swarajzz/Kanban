import React, { ReactNode } from "react";
import DialogHeading from "./DialogHeading";

type DialogPanelProps = {
  className: string;
  title: string;
  children: ReactNode;
  toggleDialog: () => void;
};

function DialogPanel({
  className,
  toggleDialog,
  title,
  children,
}: DialogPanelProps) {
  return (
    <div className={className}>
      <DialogHeading title={title} toggleDialog={toggleDialog} />
      {children}
    </div>
  );
}

export default DialogPanel;

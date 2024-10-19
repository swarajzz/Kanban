import React from "react";
import CloseIcon from "../ui/CrossIcon";

function DialogHeading({
  title,
  toggleDialog,
  toggleIsShow,
  icon,
}: {
  title: string;
  toggleDialog: () => void;
  toggleIsShow?: () => void;
  icon?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-7">
      <h2 className="text-lg text-white">{title}</h2>
      <CloseIcon
        width={24}
        height={24}
        toggleDialog={toggleDialog}
        toggleIsShow={toggleIsShow}
        icon={icon}
      />
    </div>
  );
}

export default DialogHeading;

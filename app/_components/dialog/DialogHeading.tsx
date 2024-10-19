import React from "react";
import CloseIcon from "../ui/CloseIcon";
import EllipsesVertical from "../ui/EllipsesVertical";

function DialogHeading({
  title,
  toggleDialog,
  toggleIsShow,
  icon = "close",
}: {
  title: string;
  toggleDialog?: () => void;
  toggleIsShow?: () => void;
  icon?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-7">
      <h2 className="text-lg text-white">{title}</h2>
      {icon === "close" ? (
        <CloseIcon width={24} height={24} toggleDialog={toggleDialog} />
      ) : (
        <EllipsesVertical toggleIsShow={toggleIsShow} />
      )}
    </div>
  );
}

export default DialogHeading;

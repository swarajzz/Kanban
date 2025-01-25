import React from "react";
import CloseIcon from "../ui/CloseIcon";
import EllipsesVertical from "../ui/EllipsesVertical";

function DialogHeading({
  title,
  toggleDialog,
  toggleShowDropdown,
  icon = "close",
}: {
  title: string;
  toggleDialog?: () => void;
  toggleShowDropdown?: () => void;
  icon?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-7">
      <h2 className="text-lg text-theme_white">{title}</h2>
      {icon === "close" ? (
        <CloseIcon width={24} height={24} toggleDialog={toggleDialog} />
      ) : (
        <EllipsesVertical toggleShowDropdown={toggleShowDropdown} />
      )}
    </div>
  );
}

export default DialogHeading;

import React from "react";
import CrossIcon from "../ui/CrossIcon";

function DialogHeading({
  title,
  toggleDialog,
}: {
  title: string;
  toggleDialog: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-7">
      <h2 className="text-lg text-white">{title}</h2>
      <CrossIcon width={24} height={24} toggleDialog={toggleDialog} />
    </div>
  );
}

export default DialogHeading;

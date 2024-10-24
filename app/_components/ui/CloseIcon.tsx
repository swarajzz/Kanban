import React from "react";

function CloseIcon({
  width = 15,
  height = 15,
  toggleDialog,
  handleRemove,
}: {
  width?: number;
  height?: number;
  toggleDialog?: () => void;
  handleRemove?: () => void;
}) {
  return (
    <div
      className="cursor-pointer fill-primary-300 transition delay-75 hover:fill-red-400"
      onClick={toggleDialog ? toggleDialog : handleRemove}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default CloseIcon;

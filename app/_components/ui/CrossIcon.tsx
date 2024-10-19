import React from "react";

function CrossIcon({
  width = 15,
  height = 15,
  toggleDialog,
  toggleIsShow,
  icon = "close",
}: {
  width?: number;
  height?: number;
  toggleDialog?: () => void;
  toggleIsShow?: () => void;
  icon?: string;
}) {
  return (
    <>
      {icon === "close" ? (
        <div
          className="cursor-pointer fill-primary-300 transition delay-75 hover:fill-red-400"
          onClick={toggleDialog}
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
      ) : (
        <div
          className="cursor-pointer fill-primary-300 transition delay-75 hover:fill-red-400"
          onClick={toggleIsShow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis-vertical"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </div>
      )}
    </>
  );
}

export default CrossIcon;

import React from "react";

function EllipsesVertical({ toggleIsShow }: { toggleIsShow?: () => void }) {
  return (
    <div
      className="cursor-pointer fill-primary-300 stroke-primary-300 stroke-2 transition delay-75 hover:fill-accent-200 hover:stroke-accent-200"
      onClick={toggleIsShow}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-ellipsis-vertical"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </div>
  );
}

export default EllipsesVertical;

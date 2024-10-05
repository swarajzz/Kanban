import React from "react";

function DialogBackdrop() {
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
  );
}

export default DialogBackdrop;

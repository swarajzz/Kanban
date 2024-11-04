import React from "react";
import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-primary-600">
      <Spinner />
      <p className="text-xl font-med">Loading board data...</p>
    </div>
  );
}

export default loading;

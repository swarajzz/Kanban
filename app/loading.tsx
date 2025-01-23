import React from "react";
import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="flex size-full flex-col items-center justify-center bg-main_bkg">
      <Spinner />
      <p className="font-med text-xl">Loading board data...</p>
    </div>
  );
}

export default loading;

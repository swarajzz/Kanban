import React from "react";
import Spinner from "./_components/Spinner";

function loading() {
  return (
    <div className="h-full w-full bg-primary-600">
      <Spinner />
    </div>
  );
}

export default loading;

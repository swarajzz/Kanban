import React from "react";

export default function Header() {
  return (
    <div className="bold bg-background-dark flex">
      <h1>Platform Launch</h1>
      <div>
        <button>+ Add new task</button>
        <div>dropdown</div>
      </div>
    </div>
  );
}

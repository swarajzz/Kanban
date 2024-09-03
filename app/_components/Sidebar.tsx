import React from "react";
import logo from "@/public/logo-light.svg";
import Image from "next/image";

function Sidebar() {
  return (
    <section className="flex min-h-screen w-80 flex-col items-center justify-between justify-items-center bg-background-dark">
      <div>
        <Image src={logo} alt="logo" className="mt-8" />
        <span>User</span>

        <div className="mt-12">
          <h2 className="text-heading-l text-text-metallic-grey">All Boards (X)</h2>
          <ul>
            <li>Web Design</li>
            <li>Machine Learning</li>
            <li>Data Structures</li>
          </ul>
          <div>+ Create New Board</div>
        </div>
      </div>
      <div>
        <div>Toggle Dark Mode</div>
        <div>Hide Sidebar</div>
      </div>
    </section>
  );
}

export default Sidebar;

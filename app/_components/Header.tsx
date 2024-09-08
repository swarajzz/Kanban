import React from "react";
import ellipses from "@/public/icon-vertical-ellipsis.svg"
import Image from "next/image";
import { Button } from "./Button";

export default function Header() {
  return (
    <div className="bg-primary-400 flex justify-between items-center p-5">
      <h1 className="text-xl font-bold">Platform Launch</h1>
      <div className="flex items-center gap-5">
        <Button size="md" intent={"primary"}>+ Add new task</Button>
        <Image src={ellipses} alt="ellipses icon" />
      </div>
    </div>
  );
}

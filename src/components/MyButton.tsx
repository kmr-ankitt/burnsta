import React from "react";
import { Button } from "./ui/button";

export default function MyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div>
      <Button
        variant={"outline"}
        className={`${
          className || ""
        } px-7 border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]`}
      >
        {text}
      </Button>
    </div>
  );
}

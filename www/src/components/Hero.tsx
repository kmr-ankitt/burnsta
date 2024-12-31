"use client";

import { Button } from "./ui/button";
import WordRotate from "./ui/word-rotate";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full mx-5">
      <div className="flex flex-col gap-3 text-4xl mx-auto font-semibold text-zinc-900">
        <span className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Get your insta
        </span>
        <WordRotate
          words={["roasted", "praised"]}
          className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20"
        />
      </div>
      <div className="flex justify-center gap-3 px-5 w-full">
        <Button
          variant={"default"}
          className="w-full border-2 border-black dark:border-white uppercase bg-zinc-200 text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
        >
          Roast me
        </Button>
        <Button variant={"outline"} className="w-full border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
          Praise me
        </Button>
      </div>
    </div>
  );
}

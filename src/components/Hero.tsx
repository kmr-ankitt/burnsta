"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import WordRotate from "./ui/word-rotate";
import { AuroraText } from "./ui/aurora-text";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[80vh] mx-5">
      <div className="tracking-normal font-myFont1 flex flex-col gap-3 text-4xl text-zinc-900 uppercase dark:text-zinc-200 leading-none font-bold">
        <AuroraText>Get your insta</AuroraText>
        <WordRotate words={["roasted", "praised"]} />
      </div>
      <div className="flex justify-center gap-3">
        <Link href="/roast">
          <Button
            variant={"outline"}
            className="px-7 border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Roast me
          </Button>
        </Link>
        <Link href="/praise">
          <Button
            variant={"outline"}
            className="px-7 border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] "
          >
            Praise me
          </Button>
        </Link>
      </div>
    </div>
  );
}

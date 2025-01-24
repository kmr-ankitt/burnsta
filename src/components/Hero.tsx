"use client";

import Link from "next/link";
import WordRotate from "./ui/word-rotate";
import { AuroraText } from "./ui/aurora-text";
import MyButton from "./MyButton";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-[80vh] mx-5">
      <div className="tracking-normal font-myFont1 flex flex-col gap-3 text-4xl text-zinc-900 uppercase dark:text-zinc-200 leading-none font-bold">
        <AuroraText>Get your insta</AuroraText>
        <WordRotate words={["roasted", "praised"]} />
      </div>
      <div className="flex justify-center gap-3">
        <Link href="/roast">
          <MyButton text="Roast me" className="font-bold" />
        </Link>
        <Link href="/praise">
          <MyButton text="Praise me" className="font-bold" />
        </Link>
      </div>
    </div>
  );
}

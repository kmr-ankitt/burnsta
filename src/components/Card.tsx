import React, { useState, useEffect, useRef, Suspense } from "react";
import { Download, RefreshCw } from "lucide-react";
import html2canvas from "html2canvas";
import { SparklesText } from "./ui/sparkleText";
import { BlurFade } from "./ui/blurAnimaton";

const backgrounds = [
  "bg-gradient-to-tl from-orange-900 via-red-600 to-yellow-500",
  "bg-gradient-to-tl from-black via-gray-800 to-black",
  "bg-gradient-to-tl from-rose-900 via-rose-400 to-rose-900",
  "bg-gradient-to-tl from-indigo-900 via-indigo-400 to-indigo-900",
  "bg-gradient-to-tl from-emerald-900 via-emerald-400 to-emerald-900",
  "bg-gradient-to-tl from-violet-900 via-violet-400 to-violet-900",
  "bg-gradient-to-tl from-cyan-900 via-cyan-400 to-cyan-900",
  "bg-gradient-to-tl from-amber-900 via-amber-400 to-amber-900",
  "bg-gradient-to-tl from-fuchsia-900 via-fuchsia-400 to-fuchsia-900",
];

export default function Card({
  text,
  loading,
  error,
  type,
  pfp,
  setLoading,
}: {
  text: string;
  loading: boolean;
  error: string;
  type: string;
  pfp: string;
  setLoading: (loading: boolean) => void;
}) {
  const [currentBg, setCurrentBg] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preload the profile picture on a canvas
  useEffect(() => {
    const loadPfp = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = pfp;

        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setLoading(false);
        };
        img.onerror = () => {
          console.error("Failed to load profile picture");
          setLoading(false);
        };
      }
    };

    loadPfp();
  }, [pfp, setLoading]);

  const downloadImage = async () => {
    const element = document.getElementById(`${type}-card`);
    if (element) {
      const canvas = await html2canvas(element, { useCORS: true });
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = `${type}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const cycleBackground = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-0">
      {/* Instagram Story Card Container */}
      <div className="w-full max-w-[450px] mb-6">
        <div className="relative" style={{ paddingTop: "177.78%" }}>
          {/* 9:16 aspect ratio */}
          <div
            id={`${type}-card`}
            className={`absolute top-0 left-0 w-full h-full ${backgrounds[currentBg]} overflow-hidden`}
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <p>Loading...</p>
                </div>
              }
            >
              {loading ? (
                <div className="relative h-full flex flex-col justify-center items-center p-8 text-white">
                  <div className="bg-black/30 backdrop-blur-sm p-5 rounded-3xl flex flex-col items-center">
                    <SparklesText
                      className="text-lg w-full capitalize"
                      text={`Generating ${type}`}
                    />
                  </div>
                </div>
              ) : error ? (
                <div className="relative h-full flex flex-col justify-center items-center p-8 text-white">
                  <div className="bg-black/30 backdrop-blur-sm p-5 rounded-3xl flex flex-col items-center">
                    <BlurFade>
                      <p className="text-lg font-semibold">User not found 😥</p>
                    </BlurFade>
                  </div>
                </div>
              ) : (
                <div className="relative h-full flex flex-col justify-center p-10 text-white">
                  <BlurFade>
                    <div className="bg-black/30 backdrop-blur-sm p-8 rounded-3xl flex flex-col items-center">
                      <canvas
                        ref={canvasRef}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4 border-zinc-700 mb-6"
                      />
                      <p className="text-md font-semibold leading-tight text-justify lowercase">
                        {text.split(" ").map((word, index) =>
                          word.startsWith("*") && word.endsWith("*") ? (
                            <span key={index} className="font-extrabold">
                              {word.slice(1, -1)}{" "}
                            </span>
                          ) : (
                            <span key={index}>{word} </span>
                          )
                        )}
                      </p>
                    </div>
                  </BlurFade>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={cycleBackground}
          className="flex items-center gap-2 px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-black transition-all duration-300 hover:scale-105 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          <RefreshCw size={20} />
          <span>Change Style</span>
        </button>
        <button
          onClick={downloadImage}
          className="flex items-center gap-2 px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-black transition-all duration-300 hover:scale-105 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
        >
          <Download size={20} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}

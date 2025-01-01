import Hero from "@/components/Hero";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Home() {
  return (
    <div className="h-screen w-full">

      <BackgroundGradientAnimation  className="z-10 fixed h-full w-full ">
        <Hero />
      </BackgroundGradientAnimation>
    </div>
  );
}

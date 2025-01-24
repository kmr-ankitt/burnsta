import Hero from "@/components/Hero";
import { ModeToggle } from "@/components/ui/modeToggle";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <Hero />
    </div>
  );
}

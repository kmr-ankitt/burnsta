import { FormComp } from "@/components/FormComp";

export default function page() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-5/6 mb-52 md:w-1/4 lg:w-2/3">
        <FormComp type="roast" />
      </div>
    </div>
  );
}
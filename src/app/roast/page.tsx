import { FormComp } from "@/components/FormComp";

export default function page() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-5/6 mb-52">
        <FormComp type="roast" />
      </div>
    </div>
  );
}
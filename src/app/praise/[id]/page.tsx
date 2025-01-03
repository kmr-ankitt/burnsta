import GetResponse from "@/components/GetResponse";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const type = "praise";
  return (
    <div className="h-full flex items-center justify-center">
      <GetResponse id={id} type={type} />
    </div>
  );
}

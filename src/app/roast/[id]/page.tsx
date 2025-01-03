import GetResponse from "@/components/GetResponse";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const type = 'roast'
  return (
    <div className="h-full w-full">
      <GetResponse id={id} type={type}/>
    </div>
  );
}

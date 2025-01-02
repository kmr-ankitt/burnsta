import { roaster } from "@/ai/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id }: { id: string } = await req.json();
    const roast = await roaster(id);
    console.log(roast);
    return NextResponse.json(roast, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching Instagram details." },
      { status: 500 }
    );
  }
}

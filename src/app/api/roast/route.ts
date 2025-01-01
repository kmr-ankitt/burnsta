import { roaster } from "@/ai/ai";
import { NextResponse } from "next/server";

export async function GET() {
  const id = "kmr_ankitt";
  try {
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

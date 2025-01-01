import { praiser } from "@/ai/ai";
import { NextResponse } from "next/server";

export async function GET() {
  const id = "kmr_ankitt";
  try {
    const praise = await praiser(id);
    console.log(praise);
    return NextResponse.json(praise, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching Instagram details." },
      { status: 500 }
    );
  }
}

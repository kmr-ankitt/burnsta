import { praiser } from "@/ai/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
  try {
    const { id }: { id: string } = await req.json();
    const praise = await praiser(id);
    console.log([praise]);
    return NextResponse.json(praise, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching Instagram details." },
      { status: 500 }
    );
  }
}

import { roaster } from "@/ai/ai";
import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 20; // Max requests
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = (forwardedFor?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
    const currentTime = Date.now();

    // Rate limiting logic
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      const { count, lastRequest } = rateData;
      if (currentTime - lastRequest < TIME_WINDOW) {
        if (count >= RATE_LIMIT) {
          return NextResponse.json(
            { error: "Rate limit exceeded. Please try again later." },
            { status: 429 }
          );
        }
        rateLimitMap.set(ip, { count: count + 1, lastRequest: currentTime });
      } else {
        rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastRequest: currentTime });
    }

    // Parse JSON request body
    let id: string;
    try {
      const body = await req.json();
      id = body.id;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    // Call the `roaster` function
    const roast = await roaster(id);
    return NextResponse.json(roast, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}

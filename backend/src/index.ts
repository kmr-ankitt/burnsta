import express from "express";
import { praiser, roaster } from "./ai/ai";

const app = express();
const port = 4000;

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 20; // Max requests
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

app.use(express.json());

app.post("/roast", async (req: any, res: any) => {
  try {
    const forwardedFor = req.headers["x-forwarded-for"] as string;
    const ip = (forwardedFor?.split(",")[0] || req.headers["x-real-ip"] || "unknown").trim();
    const currentTime = Date.now();

    // Rate limiting logic
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      const { count, lastRequest } = rateData;
      if (currentTime - lastRequest < TIME_WINDOW) {
        if (count >= RATE_LIMIT) {
          return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
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
      const body = req.body;
      id = body.id;
    } catch {
      return res.status(400).json({ error: "Invalid JSON body." });
    }

    // Call the `roaster` function
    const roast = await roaster(id);
    return res.status(200).json(roast);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

app.post("/praise", async (req : any, res : any) => {
  try {
    // Extract client IP
    const forwardedFor = req.headers["x-forwarded-for"] as string;
    const ip = (forwardedFor?.split(",")[0] || req.headers["x-real-ip"] || "unknown").trim();
    const currentTime = Date.now();

    // Rate limiting logic
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      const { count, lastRequest } = rateData;
      if (currentTime - lastRequest < TIME_WINDOW) {
        if (count >= RATE_LIMIT) {
          return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
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
      const body = req.body;
      id = body.id;
    } catch {
      return res.status(400).json({ error: "Invalid JSON body." });
    }

    // Call the `praiser` function
    const praise = await praiser(id);
    console.log([praise]); // Log as an array for consistency
    return res.status(200).json(praise);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

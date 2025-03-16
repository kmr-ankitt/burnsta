import express from "express";
import { praiser, roaster } from "./ai/ai";

const app = express();
const port = 4000;

app.use(express.json());

app.post("/roast", async (req: any, res: any) => {
  try {
    let id: string;
    try {
      const body = req.body;
      id = body.id;
    } catch {
      return res.status(400).json({ error: "Invalid JSON body." });
    }
    console.log(id)

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

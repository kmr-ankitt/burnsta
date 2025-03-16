import { GoogleGenerativeAI } from "@google/generative-ai";
import { getInstaDetails } from "../utils/regexParser";

const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const basePrompt = {
  roastPrompt: "Roast this instgram user within 60 - 64 words.",
  praisePrompt: "Praise this instgram user withing 60 - 64 words.",
};

export async function roaster(id: string) : Promise<{ roast: string, userpfp: string }> {
  try {
    const user = await getInstaDetails(id);
    const prompt =
      basePrompt.roastPrompt +
      `A instagram user with the name ${user.username}
                and instagram id ${id} has their account with
                ${user.followers} followers and ${user.following}
                followings and they've posted ${user.posts} posts.
                ${user.bio != "" ? `Their bio says ${user.bio}` : " "}`;

    const response = await model.generateContent(prompt);
    const roast = response.response.text();
    const userpfp = user.userpfp;
    return { roast, userpfp };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while generating roast.");
  }
}

export async function praiser(id: string) : Promise<{ praise: string, userpfp: string }> {
  try {
    const user = await getInstaDetails(id);
    const prompt =
      basePrompt.praisePrompt +
      `A instagram user with the name ${user.username}
                and instagram id ${id} has their account with
                ${user.followers} followers and ${user.following}
                followings and they've posted ${user.posts} posts.
                ${user.bio != "" ? `Their bio says ${user.bio}` : " "}`;

    const response = await model.generateContent(prompt);
    const praise = response.response.text();
    const userpfp = user.userpfp;
    return { praise, userpfp };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while generating praise.");
  }
}

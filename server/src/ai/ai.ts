import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
import { getInstaDetails } from "../utils/details";

configDotenv()
const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const basePrompt = {
    roastPrompt: "Roast this instgram user in 8 - 12 lines at max.",
    praisePrompt: "Praise this instgram user in 8 - 12 lines at max."
}

export async function roaster(id: string){
    try {
        const user = await getInstaDetails(id);
        const prompt = basePrompt.roastPrompt +
                `A instagram user with the name ${user.username}
                and instagram id ${id} has their account with
                ${user.followers} followers and ${user.following}
                followings and they've posted ${user.posts} posts.
                ${user.bio != '' ? `Their bio says ${user.bio}` : " "}`

        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.error(error);
        return "An error occurred while generating roast.";
    }
}

export async function praiser(id: string) {
    try {
        const user = await getInstaDetails(id);
        const prompt = basePrompt.roastPrompt +
                `A instagram user with the name ${user.username}
                and instagram id ${id} has their account with
                ${user.followers} followers and ${user.following}
                followings and they've posted ${user.posts} posts.
                ${user.bio != '' ? `Their bio says ${user.bio}` : " "}`

        const response = await model.generateContent(prompt);
        return response.response.text();
    } catch (error) {
        console.error(error);
        return "An error occurred while generating praise.";
    }
}

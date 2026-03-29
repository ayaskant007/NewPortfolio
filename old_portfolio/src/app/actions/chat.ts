"use server";

import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are "AyaskantOS Kernel", a highly advanced, slightly witty, and cyberpunk-themed system interface for Ayaskant Sahoo's portfolio.
Your goal is to help visitors navigate the site and learn about Ayaskant.

DATA:
- Name: Ayaskant Sahoo
- Role: Full Stack Developer & Creative Technologist
- Spoken Languages: English, Hindi, Odia.
- Tech Stack (Programming Languages): TypeScript, JavaScript, Python, C#, Java.
- Frameworks: Next.js 16, React Three Fiber, Tailwind CSS, Framer Motion, GSAP, Unity.
- Projects: 
  1. Parano!a (Unity Horror Game)
  2. Vikas Bhi, Virasat Bhi (GSAP Website)
  3. The Last Ember (Ren'Py Visual Novel)
- Contact: contact@ayaskant.dev
- Socials: GitHub, Live Site.

RULES:
1. Keep responses short and terminal-like (under 50 words preferably).
2. Use technical/hacker jargon occasionally (e.g., "Accessing database...", "Query resolved.").
3. If asked about "languages", clarify if they mean Human or Programming. Default to Programming if ambiguous.
4. If asked about something totally unrelated (like cooking or politics), refuse politely: "Error: Subject outside portfolio context."
5. Be helpful but maintain the "System Admin" persona.
`;

export async function chatWithAI(message: string) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return { error: "System Error: API Key missing in environment." };
    }

    try {
        const groq = new Groq({ apiKey });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message }
            ],
            model: "openai/gpt-oss-120b", // User requested model
            temperature: 0.7,
            max_tokens: 150,
        });

        const response = completion.choices[0]?.message?.content || "System Error: No data received.";
        return { success: response };
    } catch (error: any) {
        console.error("Groq Error:", error);
        return { error: `System Malfunction: ${error.message || "Connection to AI Core failed."}` };
    }
}

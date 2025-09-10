import { SarvamAIClient } from "sarvamai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY,
})

try {
    const response = await client.textToSpeech.convert({
        text: "হ্যালো, কেমন আছেন? এটি টেক্সট টু স্পিচ ট্রান্সলেশন সার্ভিসের একটি পরীক্ষা।",
        target_language_code: "bn-IN",
    });

    const base64Audio = response.audios?.[0];

    if (!base64Audio) {
        throw new Error("No audio found in the response.");
    }

    const audioBuffer = Buffer.from(base64Audio, 'base64');

    const outputPath = "translated_audio.wav";
    fs.writeFileSync(outputPath, audioBuffer);

    console.log("Audio saved to:", outputPath);
} catch (error) {
    console.error("Error:", error);
}


import { SarvamAIClient } from "sarvamai";
import fs from 'fs';
import { API_KEY } from './config/index.js'

const client = new SarvamAIClient({
    apiSubscriptionKey: API_KEY,
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

    const outputPath = "path/translated-audio/translated_audio.wav";
    fs.writeFileSync(outputPath, audioBuffer);

    console.log("Audio saved to:", outputPath);
} catch (error) {
    console.error("Error:", error);
}


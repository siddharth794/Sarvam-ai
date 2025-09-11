import { SarvamAIClient } from "sarvamai";
import fs from "fs";
import { API_KEY } from './config/index.js'

const FILE_PATH = "./path/to/audio.wav"; // or .mp3

async function main() {
  const client = new SarvamAIClient({ apiSubscriptionKey: API_KEY });
  const response = await client.speechToText.transcribe({
    file: fs.createReadStream(FILE_PATH)
  });

  console.log(response);
}

main().catch(console.error);



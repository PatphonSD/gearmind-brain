import dotenv from "dotenv";
dotenv.config();
import { OpenAI, Settings } from "llamaindex";

/**
 * ใช้ในการตั้งค่า Large Language Model รวมถึงการตั้งค่า dotenv
 */
const init = () => {
  Settings.llm = new OpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export default init;

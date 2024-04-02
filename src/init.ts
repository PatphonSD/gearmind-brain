import dotenv from "dotenv";
dotenv.config();
import { OpenAI, Settings } from "llamaindex";

const init = () => {
  Settings.llm = new OpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export default init;

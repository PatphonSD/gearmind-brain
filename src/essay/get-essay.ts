import { readFile } from "fs/promises";
import path from "path";

const file = "/main.txt";

export const getEssay = async () => {
  const essay = await readFile(path.join(__dirname, file), "utf-8");
  return essay;
};

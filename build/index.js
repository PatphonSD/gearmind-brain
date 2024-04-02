"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const llamaindex_1 = require("llamaindex");
// Use the OpenAI LLM
llamaindex_1.Settings.llm = new llamaindex_1.OpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const document = new llamaindex_1.Document({ text: "essay", id_: "essay" });
        // Load and index documents
        const index = yield llamaindex_1.VectorStoreIndex.fromDocuments([document]);
        // get retriever
        const retriever = index.asRetriever();
        // Create a query engine
        const queryEngine = index.asQueryEngine({
            retriever,
        });
        const query = "What is the meaning of life?";
        // Query
        const response = yield queryEngine.query({
            query,
        });
        // Log the response
        console.log(response.response);
    });
}
main();

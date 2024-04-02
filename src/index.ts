import { Document, VectorStoreIndex , storageContextFromDefaults } from "llamaindex";
import init from "./init";
import { getEssay } from "./essay/get-essay";

init();

async function main() {
  const essay = await getEssay();

  const document = new Document({ text: essay, id_: "essay" });

  const storageContext = await storageContextFromDefaults({
    persistDir: "./storage",
  });
  const index = await VectorStoreIndex.fromDocuments([document], {
    storageContext,
  });
  
  // get retriever
  const retriever = index.asRetriever();

  // Create a query engine
  const queryEngine = index.asQueryEngine({
    retriever,
  });

  const query = "SECOM คืออะไรครับ";

  // Query
  const response = await queryEngine.query({
    query,
  });

  // Log the response
  console.log(response.response);
}

main();

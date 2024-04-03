import { Document, VectorStoreIndex , storageContextFromDefaults } from "llamaindex";
import init from "./init";
import { getEssay } from "./essay/get-essay";

init();

async function main() {
 // ดึงเนื้อหาเรียงความ
 const essay = await getEssay();

 // สร้าง Document object จากเนื้อหาเรียงความ 
 // ตั้ง ID ว่า "essay"
 const document = new Document({ text: essay, id_: "essay" });

 // สร้าง Storage Context 
 // ตั้งค่า persistDir เป็น "./storage"
 const storageContext = await storageContextFromDefaults({
  persistDir: "./storage",
 });
 // สร้าง VectorStoreIndex จาก Document 
 // ตั้งค่า Storage Context
 const index = await VectorStoreIndex.fromDocuments([document], {
  storageContext,
 });
  
 // ดึง Retriever จาก Index
 const retriever = index.asRetriever();

 // สร้าง Query Engine 
 // ตั้งค่า Retriever
 const queryEngine = index.asQueryEngine({
  retriever,
 });

 // ตั้งค่า Query ว่า "SECOM คืออะไรครับ"
 const query = "SECOM คืออะไรครับ";

 // ทำ Query
 // รอผลลัพธ์
 const response = await queryEngine.query({
  query,
 });

 // พิมพ์ผลลัพธ์
 console.log(response.response);
}

main();

const fs = require('fs');
const path = require('path');

// ฟังก์ชันสำหรับอ่านข้อความจากไฟล์ markdown
function readMarkdown(filename) {
  const text = fs.readFileSync(filename, 'utf-8');

  // ลบเครื่องหมาย markdown ออก
  const regex = /^(#+)|(-+)|(\*+)\s/gm;
  return text.replace(regex, '');
}

// วนลูปผ่านโฟลเดอร์ย่อยทั้งหมดใน `data/`
const allText = [];
const dataFolderPath = path.resolve(__dirname, './data');
for (const foldername of fs.readdirSync(dataFolderPath)) {
  const folderPath = path.join(dataFolderPath, foldername);
  if (fs.lstatSync(folderPath).isDirectory()) {
    // ค้นหาไฟล์ README.md ในโฟลเดอร์ย่อย
    const filePath = path.join(folderPath, 'README.md');
    if (fs.existsSync(filePath)) {
      const text = readMarkdown(filePath);

      // เพิ่มชื่อโฟลเดอร์ย่อยเป็นหัวข้อ
      allText.push(`## ${foldername}\n\n`);
      allText.push(text + '\n\n');
    }
  }
}

// เขียนข้อความทั้งหมดลงในไฟล์ `./src/essay/main.txt`
const outputFilePath = path.resolve(__dirname, './src/essay/main.txt');
fs.writeFileSync(outputFilePath, allText.join('\n'));

console.log('ข้อความจากไฟล์ README.md ทั้งหมดถูกเขียนลงในไฟล์ ./src/essay/main.txt เรียบร้อยแล้ว');

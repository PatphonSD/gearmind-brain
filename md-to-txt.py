import os
import re

# ฟังก์ชันสำหรับอ่านข้อความจากไฟล์ markdown
def read_markdown(filename):
  with open(filename, "r") as f:
    text = f.read()
  # ลบเครื่องหมาย markdown ออก

    """
    text = re.sub(r"(#+)(.*)", "", text)
    text = re.sub(r"(-+)(.*)", "", text)
    text = re.sub(r"\*+\s(.*)", "", text)
    """
  return text

# วนลูปผ่านโฟลเดอร์ย่อยทั้งหมดใน `data/`
all_text = ""
for foldername in os.listdir("data/"):
  folderpath = os.path.join("data/", foldername)
  if os.path.isdir(folderpath):
    # ค้นหาไฟล์ README.md ในโฟลเดอร์ย่อย
    filepath = os.path.join(folderpath, "README.md")
    if os.path.isfile(filepath):
      text = read_markdown(filepath)
      # เพิ่มชื่อโฟลเดอร์ย่อยเป็นหัวข้อ
      all_text += f"## {foldername}\n\n"
      all_text += text + "\n\n"

# เขียนข้อความทั้งหมดลงในไฟล์ `./src/essay/main.txt`
with open("./src/essay/main.txt", "w") as f:
  f.write(all_text)

print("ข้อความจากไฟล์ README.md ทั้งหมดถูกเขียนลงในไฟล์ ./src/essay/main.txt เรียบร้อยแล้ว")

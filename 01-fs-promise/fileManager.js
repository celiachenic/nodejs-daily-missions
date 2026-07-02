// 引入內建的 fs/promises 模組。
// 建立 saveData(fileName, content)：非同步寫入檔案，若成功則印出成功訊息。
// 建立 loadData(fileName)：非同步讀取檔案，需指定 utf-8 編碼，並回傳檔案文字內容。
// 使用 module.exports 將這兩個函式打包匯出。
const fs = require("fs/promises");

async function saveData(fileName, content) {
  try {
   await fs.writeFile(fileName, content);
   console.log("寫入成功");
  } catch (e) {
    console.log("寫入失敗", e.message);
  }
}

async function loadData(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf-8");
    return data;
  } catch (e) {
    console.log("讀取失敗", e.message);
  }
}
module.exports = {
  saveData,
  loadData,
};

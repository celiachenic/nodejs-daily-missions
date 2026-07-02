//使用 require() 正確引入 ./fileManager.js 模組。
// 依序呼叫函式：先寫入一個名為 user.txt 的檔案，內容為 "Hello Node.js!"；
// 寫入成功後，再讀取該檔案並將內容 console.log 印出來。
const { saveData, loadData } = require("./fileManager");

async function main() {
  await saveData("./user.txt", "Hello Node.js!");
  const data = await loadData("./user.txt");
  console.log(data);
}

main();

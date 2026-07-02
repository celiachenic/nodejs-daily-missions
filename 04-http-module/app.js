/*
引入 dotenv 與內建的 http 模組。
宣告 serverPort 變數去讀取環境變數的 PORT，若環境變數不存在，則預設值為 3000。
使用 http.createServer 建立伺服器：
回傳狀態碼設定為 200。
Header 的 Content-Type 請設定為網頁格式並支援中文（text/html; charset=utf-8）。
網頁內容請輸出：「<h2>歡迎來到我的第一個 Node.js 網站！</h2>」。
讓伺服器成功監聽讀取到的 Port 號，並在終端機印出啟動提示。
*/

const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

function requestListener(req, res) {
  const data = "<h2>歡迎來到我的第一個 Node.js 網站！</h2>";
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  res.write(data);
  res.end();
}

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

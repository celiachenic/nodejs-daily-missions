// 任務要求：

// 安裝並引入 express 與 cors 套件。
// 依照正確順序掛載以下兩個 Middleware：
// cors()：解決跨域問題
// express.json()：解析請求內容，確保 req.body 能正確取得資料
// 建立 GET / 路由，回傳狀態碼 200 與：{ "status": "success", "message": "API 運作中" }
// 建立 POST /members 路由，從 req.body 取出 name 欄位，回傳狀態碼 201 與：{ "status": "success", "data": { "name": "取出的 name 值" } }
// 監聽 3000 Port。

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "API 運作中" });
});

app.post("/members", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ status: "success", data: { name } });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running.");
});

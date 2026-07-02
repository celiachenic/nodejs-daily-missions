const express = require("express");
const app = express();

// === 請在此處設計你的路由 ===

// 路由一：GET /，回傳狀態碼 200，以 res.json 回傳：
// { "status": "success", "message": "歡迎來到健身房 API" }

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "歡迎來到健身房 API" });
});

// 路由二：GET /api/v1/members，回傳狀態碼 200，以 res.json 回傳：
// { "status": "success", "data": [{ "name": "王小明" }, { "name": "李小花" }] }
app.get("/api/v1/members", (req, res) => {
  res.status(200).json({
    status: "success",
    data: [{ name: "王小明" }, { name: "李小花" }],
  });
});

// 路由三：其他任何未定義路徑（使用 app.use），回傳狀態碼 404，以 res.json 回傳：
// { "status": "error", "message": "路由不存在" }
app.use((req, res) => {
  res.status(404).json({ status: "error", message: "路由不存在" });
});

// ==========================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`伺服器啟動中：http://localhost:${PORT}`);
});

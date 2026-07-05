const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/members", (req, res) => {
  res.status(200).json({ status: "success", data: "會員列表" });
});

app.get("/error-test", (req, res, next) => {
  next(new Error("這是一個測試錯誤"));
});

app.use((req, res) => {
  res.status(404).json({ status: "error", message: "路由不存在" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

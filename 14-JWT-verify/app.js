const dotenv = require("dotenv");
const path = require("node:path");
dotenv.config({
  path: path.join(__dirname, ".env"),
});
const SECRET = process.env.JWT_SECRET;

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  //練習用，所以先把payload寫死。實務上登入成功後會去資料庫抓取基本所需內容當作payload
  const payload = {
    userId: 1,
    email: "member@gym.com",
  };
  const token = jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
  res.status(200).json({ status: "success",  token });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ status: "success", data: req.user });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "找不到頁面",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

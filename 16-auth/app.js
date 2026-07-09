const path = require("node:path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const express = require("express");
const cors = require("cors");

const app = express();
const authMiddleware = require("./middleware/auth");
const auth = require("./routes/auth");
const notes = require("./routes/notes");

app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/notes", authMiddleware, notes);

app.use((req, res) => {
  return res.status(404).json({ status: "error", message: "404：此頁面不存在" });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ status: "error", message: "500：內部伺服器錯誤" });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// 建立 app.js，安裝並引入 express、cors
// 依正確順序掛載 Middleware，並將 routes/members.js 掛載到 /members 前綴，監聽 3000 Port。
// 確認以下實際對應 URL 皆能正常回應：
// GET /members → 回傳所有會員列表
// GET /members/5 → 回傳 memberId: "5"
const express = require("express");
const cors = require("cors");
const app = express();
const memberRouter = require('./routes/member')


app.use(cors());
app.use(express.json())

app.use('/members',memberRouter)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`router is running on port ${PORT}`);
});

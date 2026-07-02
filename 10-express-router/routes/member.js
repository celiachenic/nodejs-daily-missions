// GET /：回傳狀態碼 200 與 { "status": "success", "message": "所有會員列表" }
// GET /:id：從路徑取出 id，回傳狀態碼 200 與 { "status": "success", "memberId": "取出的 id 值" }
// 最後使用 module.exports 將 router 匯出。
const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "所有會員列表" });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: "success", memberId: id });
});
module.exports = router;

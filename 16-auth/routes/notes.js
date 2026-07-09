const express = require("express");
const router = express.Router();

const notes = [
  { id: 1, userId: 1, title: "Node.js 學習筆記" },
  { id: 2, userId: 1, title: "Express 路由整理" },
];

router.get("/", (req, res) => {
  const user = req.user;
  const userNotes = notes.filter((item) => item.userId === user.id);
  return res.status(200).json({
    status: "success",
     data: userNotes,
  });
});
module.exports = router;

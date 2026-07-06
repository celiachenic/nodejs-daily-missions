const express = require("express");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const users = [
  {
    id: 1,
    email: "abc@gmail.com",
    password: bcrypt.hashSync("123456", 10), // 測試用密碼：123456，使用 bcrypt.hashSync() 雜湊；和 bcrypt.hash() 差在同步/非同步
  },
];
let nextId = 2;

//註冊
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  //未填寫 email 或 password
  if (
    email == null ||
    email.toString().trim() === "" ||
    !email.toString().includes("@") ||
    password == null ||
    password.toString().trim() === ""
  ) {
    return res.status(400).json({
      status: "error",
      message: "請填寫 email 與 password",
    });
  }
  //email 已被使用
  const isRegistered = users.find((user) => user.email === email);
  if (isRegistered) {
    return res.status(409).json({
      status: "error",
      message: "email 已被使用",
    });
  }
  //註冊成功
  const newUser = {
    id: nextId++,
    email,
    password: await hashPassword(password),
  };
  users.push(newUser);
  res.status(201).json({
    status: "success",
    message: "註冊成功",
    data: {
      id: newUser.id,
      email: newUser.email,
    },
  });
});

//登入
router.post("/login", (req, res) => {});

module.exports = router;

const express = require("express");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const normalizeAuthInput = (body) => {
  const { email, password } = body;
  const emailValue = email?.toString().trim().toLowerCase();
  const passwordValue = password?.toString().trim();
  return {
    emailValue,
    passwordValue,
  };
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
  const { emailValue, passwordValue } = normalizeAuthInput(req.body);
  //未填寫 email 或 password
  if (!emailValue || !emailValue.includes("@") || !passwordValue) {
    return res.status(400).json({
      status: "error",
      message: "請填寫 email 與 password",
    });
  }
  //email 已被使用
  const isRegistered = users.find((user) => user.email === emailValue);
  if (isRegistered) {
    return res.status(409).json({
      status: "error",
      message: "email 已被使用",
    });
  }
  //註冊成功
  const newUser = {
    id: nextId++,
    email: emailValue,
    password: await hashPassword(passwordValue),
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
router.post("/login", async (req, res) => {
  const { emailValue, passwordValue } = normalizeAuthInput(req.body);
  if (!emailValue || !emailValue.includes("@") || !passwordValue) {
    return res.status(400).json({
      status: "error",
      message: "請填寫 email 與 password",
    });
  }
  const user = users.find((user) => user.email === emailValue);
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "email 或密碼錯誤",
    });
  }
  const isMatch = await verifyPassword(passwordValue, user.password);
  if (isMatch) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      status: "success",
      message: "登入成功",
      token,
    });
  }
  return res.status(400).json({
    status: "error",
    message: "email 或密碼錯誤",
  });
});

module.exports = router;

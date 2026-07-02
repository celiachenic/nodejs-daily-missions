const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");
dotenv.config({
  path: path.join(__dirname, ".env"),
}); //在app.js同一層資料夾 找.env

const SECRET = process.env.JWT_SECRET;
//console.log(SECRET);

const generateToken = (user) => {
  const { id, email } = user;
  const payload = {
    userId: id,
    email,
  };
  const token = jwt.sign(payload,SECRET, { expiresIn: '7d' });
  return token;
};    

console.log("簽發的Token："+generateToken({ id: 1, email: 'member@gym.com' }))
# JWT 簽發練習

練習資料來源：[六角 node.js 每日任務 Day 13 JWT 概念與簽發](https://hackmd.io/gI-k28j2RJWxQgGPCrwvpg?view)

---

## 情境
健身房系統的會員成功登入後，後端需要簽發一個 JWT Token 給前端，讓後續請求可以攜帶此 Token 進行身份驗證。

---

## 任務要求

- 建立 `.env`，設定變數 `JWT_SECRET` 為任意字串（例如：`my-gym-secret`）。
- 安裝並引入 `jsonwebtoken` 與 `dotenv`。
- 建立 `generateToken(user)` 函式：
    * 從參數 `user` 物件中取出 `id` 與 `email`。
    * 使用 `jwt.sign` 將 `{ userId, email }` 簽發成 Token，`secret` 從 `process.env.JWT_SECRET` 讀取，過期時間設為 `'7d'`。
    * 回傳簽發好的 Token。
- 在主程式呼叫 `generateToken({ id: 1, email: 'member@gym.com' })` 並印出 Token。

---


## 使用套件

- **dotenv**：讀取 `.env` 中的環境變數，避免將密鑰直接寫在程式碼中。
- **jsonwebtoken**：簽發與驗證 JWT。
- **path（Node.js 內建）**：組合 `.env` 的完整路徑，確保每個每日任務都能讀取自己的 `.env`。

---
## 學習重點

- JWT 的組成（Header、Payload、Signature）
- 使用 `jwt.sign()` 簽發 Token
- 使用 `.env` 管理 Secret
- 理解 Payload 不應存放敏感資料
- 設定 Token 過期時間 (`expiresIn`)
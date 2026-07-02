# JWT 驗證、自訂 Middleware

練習資料來源：[六角 node.js 每日任務 Day 14 JWT 驗證與自訂 Middleware](https://hackmd.io/QEFjZzKARr6OW6aS_F9AcA?view)

---

## 情境
健身房系統需要保護「取得個人資料」這支 API，只有攜帶合法 JWT Token 的請求才能取得資料。請實作驗證 Middleware 並掛載到指定路由上。

---

## 任務要求

- 建立 `.env`，設定 `JWT_SECRET`（與簽發時相同的字串）。
- 建立 `middleware/auth.js`，實作 `authMiddleware`：
    * 從 `req.headers.authorization` 取出 Token，若不存在或格式不符，回傳 `401` 與錯誤訊息。
    * 使用 `jwt.verify` 驗證 Token，驗證成功將 `decoded` 資料掛到 `req.user` 並呼叫 `next()`。
    * 驗證失敗回傳 `401` 與錯誤訊息。
    * 使用 `module.exports` 匯出。
- 建立 `app.js`：
    * 掛載 `cors()`、`express.json()`。
    * 建立公開路由 `POST /login`：直接回傳狀態碼 `200` 與一組用 `jwt.sign` 簽發的 Token，payload 為：
        ```js
        {
            userId: 1,
            email: "member@gym.com"
        }
        ```
    * Token 有效期限設定為 7d。
    * 建立受保護路由 `GET /profile` ：掛上 `authMiddleware`，驗證通過後回傳狀態碼 `200` 與 `req.user` 的內容。

---

## 使用套件

- **dotenv**：讀取 `.env` 中的環境變數，避免將密鑰直接寫在程式碼中。
- **cors**：解決跨域問題。
- **jsonwebtoken**：簽發與驗證 JWT。
- **path（Node.js 內建）**：組合 `.env` 的完整路徑，確保每個每日任務都能讀取自己的 `.env`。

---

## 學習重點


- 理解 JWT 的驗證流程與運作原理。
- 使用 `jwt.verify()` 驗證 Token 的合法性。
- 將驗證邏輯抽離為 `authMiddleware`，提升程式碼的重用性與維護性。
- 在受保護路由掛載 `authMiddleware`，限制只有通過驗證的請求才能存取資源。
- 驗證成功後，`authMiddleware` 會將解碼後的 `payload` 掛載至 `req.user`，因此後續路由可直接透過 `req.user` 取得登入使用者資訊，而無需再次解析 JWT。
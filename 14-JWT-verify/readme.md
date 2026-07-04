# JWT 驗證、自訂 Middleware

練習資料來源：[六角 node.js 每日任務 Day 14 JWT 驗證與自訂 Middleware](https://hackmd.io/QEFjZzKARr6OW6aS_F9AcA?view)

---

## 情境

健身房系統需要保護「取得個人資料」這支 API，只有攜帶合法 JWT Token 的請求才能取得資料。請實作驗證 Middleware 並掛載到指定路由上。

---

## 任務要求

- 建立 `.env`，設定 `JWT_SECRET`（與簽發時相同的字串）。
- 建立 `middleware/auth.js`，實作 `authMiddleware`：
  - 從 `req.headers.authorization` 取出 Token，若不存在或格式不符，回傳 `401` 與錯誤訊息。
    ```json
    { "status": "error", "message": "未提供 Token" }
    ```
  - 使用 `jwt.verify` 驗證 Token，驗證成功將 `decoded` 資料掛到 `req.user` 並呼叫 `next()`。
  - 驗證失敗回傳 `401` 與錯誤訊息。
    ```json
    { "status": "error", "message": "Token 無效或已過期" }
    ```
  - 使用 `module.exports` 匯出。
- 建立 `app.js`：
  - 掛載 `cors()`、`express.json()`。
  - 建立公開路由 `POST /login`：回傳狀態碼 `200` 與一組用 `jwt.sign` 簽發的 Token。
    payload 為：

    ```js
    { userId: 1, email:"member@gym.com"}
    ```

    - Token 有效期限設定為 7d。

    回傳格式：

    ```json
    { "status": "success", "token": "<JWT_TOKEN>" }
    ```

  - 建立受保護路由 `GET /profile` ：掛上 `authMiddleware`。驗證通過後回傳狀態碼 `200` 與 `req.user` 的內容。
    回傳格式：
    ```json
    { "status": "success", "data": "<req.user>" }
    ```

---

### 測試方式

先呼叫 `POST /login` 取得 JWT，再於 `GET /profile` 的 `Authorization` Header 中使用：

  ```
  Bearer <JWT_TOKEN>
  ```

以模擬實際登入後攜帶 Token 存取受保護 API 的流程。
>模擬：
> 使用者登入 → Server 簽 Token → 前端保存 Token → 後續請求帶著 Token。

---

## 使用套件

- **express**：Node.js 的框架，提供路由、Middleware 等功能，讓建立 RESTful API 更快速、更容易維護。
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

---

## 補充知識

記錄實作過程中的疑問與整理後的筆記。  

### 1. `auth.js` 需要再次載入 `.env` 嗎？

#### 疑問：

`auth.js` 中也會使用 `process.env.JWT_SECRET`，是否需要再次引入 `dotenv` 並執行：

```js
const dotenv = require("dotenv");
const path = require("node:path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});
```

#### 回答：

**不需要。**

`dotenv.config()` 的作用是將 `.env` 中的內容載入到全域的 `process.env`。只要在專案的入口檔（例如 `app.js` 或 `server.js`）執行一次，整個 Node.js 應用程式都可以透過 `process.env` 存取環境變數。

因此，`auth.js` 可以直接使用：

```js
process.env.JWT_SECRET;
```

而不需要再次呼叫 `dotenv.config()`。

#### 實務作法

一般會在專案的入口檔先完成環境變數的載入，再依序引入各個路由、Middleware 或其他模組，例如：

```js
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = require("./middleware/auth");
```

如此一來，所有模組都能直接透過 `process.env` 存取環境變數，不僅避免重複載入，也符合大多數 Node.js 專案的實務開發習慣。

# Auth 流程整合

練習資料來源：[六角 node.js 每日任務 Day 16 Auth 流程整合](https://hackmd.io/qbFwHRwiQwWW-sn4ae_AvQ?view)

---

## 情境

前四天我們分別學了 bcrypt 加密、JWT 簽發、JWT 驗證與 Middleware。今天將這些內容整合，實作一個具備完整 Auth 流程的「個人筆記系統」，包含註冊、登入，以及取得受保護的個人筆記。

---

## 專案結構

```
project/
├── .env
├── app.js
├── middleware/
│   └── auth.js ← JWT 驗證 Middleware（Day 14）
└── routes/
    ├── auth.js ← Register / Login
    └── notes.js ← 受保護的筆記路由
```

資料皆使用伺服器記憶體（In-memory）陣列模擬資料庫。

- `users`：儲存註冊會員資料
- `notes`：儲存筆記資料
- `nextId`：作為使用者 `id` 的流水號 `nextId` = 2;
---

## 使用套件

- express
- cors
- dotenv
- path (node 內建)
- bcrypt
- jsonwebtoken

---

## API

| Method | Route          | 說明                                |
| ------ | -------------- | ----------------------------------- |
| POST   | /auth/register | 註冊帳號                            |
| POST   | /auth/login    | 登入並取得 JWT                      |
| GET    | /notes         | 取得目前登入使用者的筆記（需 Bearer Token） |

### Auth 流程 

#### 註冊 `/auth/register`

1. 驗證 email、password
2. 檢查 email 是否重複
3. 使用 bcrypt 雜湊密碼
4. 建立使用者


| 情境 | HTTP Status | 回傳內容 |
|------|-------------|----------|
| 註冊成功 | `201 Created` | `{"status":"success","message":"註冊成功","data":{"id":2,"email":"test@example.com"}}` |
| 未填寫 `email` 或 `password` | `400 Bad Request` | `{"status":"error","message":"請填寫 email 與 password"}` |
| `email` 已被使用 | `409 Conflict` | `{"status":"error","message":"email 已被使用"}` |

#### 登入 `/auth/login`

1. 找到使用者
2. 使用 `bcrypt.compare` 驗證密碼
3. `jwt.sign` 並回傳 `<Token>`
   - payload 格式：`{id:<user.id>, email:<user.email>}`
   - 設定七天後過期： `{ expiresIn: '7d' }`

| 情境 | HTTP Status | 回傳內容 |
|------|-------------|----------|
| 登入成功 | `200 OK` | `{"status":"success","message":"登入成功","token":"<Token>"}` |
| 未填寫 `email` 或 `password` | `400 Bad Request` | `{"status":"error","message":"請填寫 email 與 password"}` |
| `email` 或 `password` 錯誤 | `400 Bad Request` | `{"status":"error","message":"email 或密碼錯誤"}` |

#### 存取筆記 (受保護路由) `/notes`

1. 在 Authorization Header 加上：
`Bearer <Token>`
2. `authMiddleware` 驗證
3. `req.user` 取得 `userId`
4. 回傳該使用者的所有筆記 `notes`

| 情境 | HTTP Status | 回傳內容 |
|------|-------------|----------|
| 取得筆記成功 | `200 OK` | `{"status":"success","data":[{"id":1,"userId":1,"title":"Node.js 學習筆記"},{"id":2,"userId":1,"title":"Express 路由整理"}]}` |
| 未提供 Token | `401 Unauthorized` | `{"status":"error","message":"未提供 Token"}` |
| Token 無效或已過期 | `401 Unauthorized` | `{"status":"error","message":"Token 無效或已過期"}` |

## 實作步驟

1. 建立 `.env`，設定 `JWT_SECRET=your_secret_key`
2. 建立 `middleware/auth.js`，實作 JWT 驗證 Middleware
3. 建立 `routes/auth.js`
   - `POST /auth/register`
   - `POST /auth/login`
4. 建立 `routes/notes.js`
   - 建立筆記資料
   - 掛上 `authMiddleware`
   - 建立 `GET /notes`
5. 在 `app.js` 依序掛載：
   - 全域 Middleware
   - 路由
   - 404 處理 Middleware
   - Error-handling Middleware

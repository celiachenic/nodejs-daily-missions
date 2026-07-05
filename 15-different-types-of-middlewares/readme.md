# Express Middleware 三種類型

練習資料來源：[六角 node.js 每日任務 Day 15 Middleware 三種類型](https://hackmd.io/vJ5gim84Sv2LXdInP1Xe-w?view)

---

## 情境
健身房系統的 API 目前缺少統一的錯誤處理與 `404` 防呆。請依照正確順序建立完整的 Middleware 結構，並讓錯誤處理 Middleware 能正確攔截 `next(err)` 傳入的錯誤。

---

## 任務要求

- 安裝並引入 `express`、`cors`，掛載全域 Middleware。
- 建立 `GET /members` 路由，直接回傳狀態碼 `200` 與 `{ "status": "success", "data": "會員列表" }`。
- 建立 `GET /error-test` 路由，使用 `next(err)` 傳遞一個 `new Error('這是一個測試錯誤')`，觸發錯誤處理 Middleware。
- 依正確順序加入以下兩層：
    - 404 catch-all：回傳狀態碼 `404` 與 `{ "status": "error", "message": "路由不存在" }`。
    - 錯誤處理 Middleware：回傳狀態碼 `500` 與 `{ "status": "error", "message": "<err.message>" }`。

---

## 使用套件

- **express**：Node.js 的框架，提供路由、Middleware 等功能，讓建立 RESTful API 更快速、更容易維護。
- **cors**：解決跨域問題。

---

## 學習重點

- 理解 Express Middleware 的三種類型：
  - Global Middleware
  - Route Middleware
  - Error Middleware

- 理解 Middleware 的掛載順序：
  > Global Middleware → Routes → 404 → Error Middleware

- 理解請求的執行流程：
    ```
    Request
        │
        ▼
    Global Middleware
    (cors、express.json...)
        │
        ▼
    Route
        │
        ├── 成功 → Response
        │
        ├── 找不到路由 → 404
        │
        └── next(err)
                │
                ▼
        Error Middleware
                │
                ▼
            Response
    ```
---

## 補充知識

記錄實作過程中的疑問與整理後的筆記。  


### 1. 為什麼 Route Handler 可以有 `next` 參數？

#### 疑問

```js
app.get("/error-test", (req, res, next) => {
  next(new Error("這是一個測試錯誤"));
});
```

這段 Route Handler 為什麼會有 `next` 參數？有 `next` 參數是不是就變成 Middleware 了？

#### 解答

`next` 是否存在，**不會決定一個函式是不是 Middleware**，而是由它在 Express 中扮演的角色決定。

上面的函式仍然是 **Route Handler（路由處理函式）**，因為它是用來處理 `GET /error-test` 這個路由。只是這次它沒有自行回傳 `res.json()`，而是透過：

```js
next(new Error("這是一個測試錯誤"));
```

將錯誤交給後面的 **Error Middleware** 統一處理。

另外，**Route Handler 本身就可以使用 `req`、`res`、`next` 三個參數**：

```js
app.get("/", (req, res, next) => {
  // ...
});
```

只是大部分情況下，Route Handler 都會直接回傳回應，因此通常只會看到：

```js
app.get("/", (req, res) => {
  res.json({ status: "success" });
});
```

只有在需要將控制權交給下一個處理流程，或是將錯誤交給 Error Middleware 時，才會使用 `next()` 或 `next(err)`。

因此，**Route Handler 可以使用 `next`，但這並不會改變它的角色，它仍然是一個 Route Handler。**


### 2. 為什麼 Error Middleware 回傳 `500`？

#### 疑問
為何這題要狀態碼要使用 `500` ?

#### 解答

> 500 = Server Internal Error（伺服器內部錯誤）

意思是：

「這次請求本身沒有問題，是伺服器在處理過程中發生了預期外的錯誤。」

例如：

```js
app.get("/error-test", (req, res, next) => {
  next(new Error("這是一個測試錯誤"));
});
```
這不是 Client 請求格式錯誤，也不是找不到路由，而是在伺服器處理請求的過程中主動建立並傳遞了一個 Error，因此適合回傳 `500 Internal Server Error`。

搭配：
```js
{
  "status": "error",
  "message": "這是一個測試錯誤"
}
```
#### 補充

實務上不會所有錯誤都回 500，而是依錯誤類型回不同狀態碼：
| 情況 | HTTP Status |
|------|------------:|
| 成功取得資料 | `200 OK` |
| 新增成功 | `201 Created` |
| 請求格式錯誤 | `400 Bad Request` |
| 未登入（JWT 不存在或無效） | `401 Unauthorized` |
| 已登入但沒有權限 | `403 Forbidden` |
| 找不到資源 | `404 Not Found` |
| 伺服器未預期錯誤（程式 Bug、資料庫異常等） | `500 Internal Server Error` |

所以 `500` 可以理解成最後的保底錯誤：當伺服器發生了非預期的問題，而沒有更適合的狀態碼時，就回傳 `500`。這也是為什麼 Error Middleware 常常預設使用 `res.status(500)`。
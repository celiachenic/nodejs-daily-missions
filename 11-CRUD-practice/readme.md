# Express CRUD 練習：健身房會員管理 API

練習資料來源：[六角 node.js 每日任務 Day 11](https://hackmd.io/gMFdvWuCRR21CWDcQI5rSw)

## 專案情境

健身房系統需要一套完整的會員管理 API。

使用 Express 建立一個 in-memory 會員 CRUD API，並加入基本資料驗證，確保新增或更新會員時，`name` 欄位不能為空。

---

## 練習重點

- 使用 Express Router 拆分路由
- 使用 in-memory Array 模擬資料庫
- 使用 `nextId` 管理會員流水號
- 將會員查詢與欄位驗證拆成 Helper Functions
- 使用 `express.json()` 解析 Request Body
- 依 RESTful API 回傳適當 HTTP Status Code

---

## 專案架構

```text
.
├── app.js              # Express 應用程式入口
├── package.json        
├── .gitignore          
└── routes/
    └── members.js      # 會員 CRUD API 路由
```

---

## 功能說明

### 1. 建立 `routes/members.js`

#### 初始化會員資料

建立一個會員陣列，預設包含兩筆資料：

```js
[
  { id: 1, name: "王小明" },
  { id: 2, name: "李小花" },
];
```
#### ID 管理

會員 `id` 由 `nextId` 變數統一管理。

```js
let nextId = 3;
```

每次新增會員時：

1. 使用目前的 `nextId` 作為新會員 `id`
2. 新增完成後 `nextId++`

如此可避免因刪除會員而重複使用相同 `id`。



#### Helper Functions

建立以下兩個輔助函式：

- `findById(list, id)`
  - 根據會員 `id` 尋找會員資料。
  - 找不到回傳 undefined。

- `validateFields(body, requiredFields)`
  - 驗證請求資料。
  - `name` 欄位不得為空。
  - 回傳缺少的欄位陣列。

---

#### API

##### API 一覽

| Method | Endpoint       | 說明         | 成功狀態碼 |
| ------ | -------------- | ------------ | ---------- |
| GET    | `/members`     | 取得所有會員 | `200`      |
| POST   | `/members`     | 新增會員     | `201`      |
| PUT    | `/members/:id` | 更新會員     | `200`      |
| DELETE | `/members/:id` | 刪除會員     | `204`      |


> 路由前綴由 `app.use('/members', ...)` 提供，因此以下皆省略 `/members`。

---

##### GET `/`

取得所有會員。

**Response**

- Status Code：`200 OK`

```json
{
  "status": "success",
  "data": [
    { "id": 1, "name": "王小明" },
    { "id": 2, "name": "李小花" }
  ]
}
```

---

##### POST `/`

新增會員。

**Request Body**

```json
{
  "name": "Cheni"
}
```
> `id` 由伺服器自動產生，請求時無需提供。


**Response**

- Status Code：`201 Created`

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "name": "Cheni"
  }
}
```

---

##### PUT `/:id`

更新指定會員。

**Request Body**

```json
{
  "name": "Cheniiii"
}
```

**Response**

- Status Code：`200 OK`

```json
{
  "status": "success",
  "data": {
    "id": 3,
    "name": "Cheniiii"
  }
}
```
---

##### DELETE `/:id`

刪除指定會員。

**Response**

- Status Code：`204 No Content`

成功刪除時不會回傳任何內容。

---

### 2. 建立 `app.js`

完成以下設定：

- 掛載 `cors()`
- 掛載 `express.json()`
- 將 `members` Router 掛載至 `/members`
- 監聽 `3000` Port


---

### 3. 錯誤處理

所有 members API 共用錯誤格式如下：

| 情況            | 狀態碼 |
| --------------- | ------ |
| `name` 欄位缺失 | `400`  |
| 找不到指定會員  | `404`  |

**`name` 欄位缺失時：**

- Status Code：`400 Bad Request`

```json
{
  "status": "error",
  "message": "缺少必填欄位：name"
}
```


**找不到指定會員時：**

- Status Code：`404 Not Found`

```json
{
  "status": "error",
  "message": "找不到此會員"
}
```

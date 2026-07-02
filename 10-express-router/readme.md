情境：
健身房系統的 API 規模逐漸擴大，需要將路由從 app.js 拆分出來獨立管理。請使用 express.Router() 建立會員路由模組，並在 app.js 中正確掛載。

任務要求：

建立 routes/members.js，使用 express.Router() 設計以下兩條路由：
GET /：回傳狀態碼 200 與 { "status": "success", "message": "所有會員列表" }

GET /:id：從路徑取出 id，回傳狀態碼 200 與 { "status": "success", "memberId": "取出的 id 值" }

最後使用 module.exports 將 router 匯出。

建立 app.js，安裝並引入 express、cors，依正確順序掛載 Middleware，並將 routes/members.js 掛載到 /members 前綴，監聽 3000 Port。
確認以下實際對應 URL 皆能正常回應：
GET /members → 回傳所有會員列表
GET /members/5 → 回傳 memberId: "5"
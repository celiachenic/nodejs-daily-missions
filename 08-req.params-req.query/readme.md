安裝並引入 express，建立應用程式實例，監聽 3000 Port。
設計以下 2 條路由：
路由一：GET /coaches/:id，從路徑中取出教練 ID，回傳狀態碼 200 與：{ "status": "success", "coachId": "取出的 id 值" }
路由二：GET /courses，從查詢字串取出 type 與 limit 兩個參數，回傳狀態碼 200 與：{ "status": "success", "filter": { "type": "取出的 type 值", "limit": "取出的 limit 值" } }
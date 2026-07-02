//情境：
//你正在開發健身房系統的基礎 API 路由，請利用 Node.js 內建的 http 模組，根據不同的請求給予相對應的回應。

const http = require("http");
const requestListener = (req, res) => {
  //情境一：當收到 GET 請求且路徑為 / 時，
  // 回傳狀態碼 200，網頁內容印出純文字：「歡迎來到健身房系統」。
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    return res.end("歡迎來到健身房系統");
  }
  // 情境二：當收到 GET 請求且路徑為 /api/v1/packages 時，
  // 回傳狀態碼 200，並以 JSON 格式 回傳以下軟體包資料（物件內容請參考初始碼）：
  // { "status": "success", "data": "方案列表" }
  if (req.method === "GET" && req.url === "/api/v1/packages") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    const data = { status: "success", data: "方案列表" };
    return res.end(JSON.stringify(data));
  }
  // 情境三：當使用者輸入上述以外的任何路徑時（例如：/hello）
  // 回傳狀態碼 404，印出純文字：「路由不存在」。

  res.writeHead(404, {
    "Content-Type": "text/plain; charset=utf-8",
  });
  return res.end("路由不存在");
};
const server = http.createServer(requestListener);
server.listen(3000, () => {
  console.log("server is running");
});

## 情境：
健身房系統要新增「會員註冊」功能，為了避免明文密碼直接存入資料庫，在儲存前必須先對密碼進行雜湊處理。登入時再使用 bcrypt.compare 比對，確認密碼是否正確。

## 任務要求：

- 安裝並引入 bcrypt。
- 建立 `hashPassword(password)` 函式：
    * 使用 `bcrypt.genSalt(10)` 產生 Salt。
    * 使用 `bcrypt.hash` 對密碼進行雜湊，並回傳雜湊後的結果。
- 建立 `verifyPassword(password, hash)` 函式：
    * 使用 `bcrypt.compare` 比對密碼與雜湊值，並回傳比對結果`（true / false）`。

### 在主程式依序執行：
- 呼叫 `hashPassword('hello123')` 並印出雜湊結果。
- 用正確密碼 `'hello123'` 呼叫 `verifyPassword`，印出比對結果。
- 用錯誤密碼 `'wrongPass'` 呼叫 `verifyPassword`，印出比對結果。
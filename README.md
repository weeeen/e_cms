**此檔案需與c_react前端檔案使用**

1.先在電腦中安裝MYSQL 並確認能正常使用

2.在電腦中安裝Node

3.在MYSQL中新增資料庫 e.g.mydb

4.更改config.json內容

   
    
    "db": '步驟3資料庫名稱',
    "dbUser": "存取資料庫的使用者 e.g.root",
    "dbPassword": "資料庫密碼",
    "apiUrl": "伺服器網址 e.g.http://localhost:3000",
    "secret": "管理員密碼加密文字 e.g.this is my super secret"`
    
5.npm knex -g 在電腦中安裝全域 knex

6.knex migrate:latest 將資料表寫入資料庫

7.npm i 安裝相依套件

8.node server 開啟伺服器

9.將前端檔案匯出dist夾後 替代預設dist空白資料夾

***為方便創造使用者而設定了特殊路由 測試完記得刪掉
app.use('/creator', require('./controllers/creator.controller'));**

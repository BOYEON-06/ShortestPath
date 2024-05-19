// lsof -i :3000  
// kill -9 <PID>

// 새로 고침하면 코드 업데이트 반영 O
// 기본 설정
const express = require("express");
const app = express();
const PORT = 3000;

// 정적 파일 불러오기
// app.use(express.static(__dirname + "/public"));

// 라우팅 정의
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
  });
app.get("/map.js", (req, res) => {
    res.sendFile(__dirname + "/map.js");
  });

// 서버 실행
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
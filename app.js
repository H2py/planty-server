var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// CORS 미들웨어 사용
var cors = require("cors");
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 임시 데이터 저장용 배열
let plantData = [];

// `app.locals`에 `plantData` 저장하여 다른 모듈에서 접근 가능하도록 설정
app.locals.plantData = plantData;

// 주기적으로 데이터 업데이트 (1시간마다)
setInterval(() => {
  const data = {
    humidity: Math.floor(Math.random() * 50 + 30), // 습도 (30~80%)
    wateringInterval: Math.floor(Math.random() * 7) + 1, // 물 주는 주기 (1~7일)
    temperature: Math.floor(Math.random() * 15) + 15, // 온도 (15~29도)
    timestamp: new Date().toISOString(),
    plantType: "Monstera", // 예시 식물 종류
  };
  plantData.push(data);
  if (plantData.length > 100) {
    plantData.shift();
  }
  console.log("New plant data added:", data);
}, 300000); // 1시간 = 3,600,000ms

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();
const logger = require("morgan");

const indexRouter = require("./routes/index");
// const { inMemoryRolesAndPermissions } = require("./helpers/rolesAndPermissions");

// INIT
// inMemoryRolesAndPermissions();
const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV !== "production") {
  app.use("/public", express.static("public"));
}

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 400).json({
    errorCode: err.code || "APP_ERROR",
    errorParams: err.params || [],
    message: err.message,
  });
});

module.exports = app;

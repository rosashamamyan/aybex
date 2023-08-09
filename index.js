const express = require("express");
const session = require('express-session')
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router/router");
const db = require("./models/index");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false ,
  saveUninitialized: true ,
}))
app.use("/api", router);

(async () => {
  await db.sequelize.sync();
})();

app.listen(process.env.PORT || 8080, () => {
  console.log(process.env.PORT);
});

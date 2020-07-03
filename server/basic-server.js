const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const router = require("./routes.js");

const cors = require("cors");

const app = express();
const port = 5000;


app.use(
    session({
      secret: "@acid-rain",
      resave: false,
      saveUninitialized: true
    })
  );

app.use(bodyParser.urlencoded({
    extended: true
    }));
  
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    })
  );


// 이거 main 해도 되는건지 체크하기!
app.use("/main", router)

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});


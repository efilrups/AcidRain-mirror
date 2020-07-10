const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const router = require("./routes.js");
const morgan = require("morgan")
const cors = require("cors");

const app = express();
const port = 5000;



app.use(
    session({
      secret: "",
      resave: false,
      saveUninitialized: false
    })
  );

app.use(bodyParser.urlencoded({
    extended: true
    }));
  
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cookieParser());

app.use(
    cors({
      origin: ['http://acidrain.s3-website.ap-northeast-2.amazonaws.com'],
      methods: ['GET', 'POST'],
      credentials: true
    })
  );

app.use("/main", router)

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});


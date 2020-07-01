const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const signupRouter = require("./routes/signupRouter");
const mypageRouter = require("./routes/mypageRouter");
const selectstageRouter = require("./routes/selectstageRouter");
const playstageRouter = require("./routes/playstageRouter");
const rankRouter = require("./routes/rankRouter");
const loginRouter = require("./routes/loginRouter");
const guestRouter = require("./routes/guestRouter");
const gameoverRouter = require("./routes/gameoverRouter");

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
      origin: ['http://13.125.249.230:5000'],
      methods: ['GET', 'POST'],
      credentials: true
    })
  );

app.use("/signup", signupRouter)

app.use("/mypage", mypageRouter)

app.use("/selectstage", selectstageRouter)

app.use("/playstage", playstageRouter)

app.use("/rank", rankRouter)

app.use("/login", loginRouter)

app.use("/guest", guestRouter)

app.use("/gameover", gameoverRouter)

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});


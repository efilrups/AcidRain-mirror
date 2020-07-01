var controller = require('./controllers');
var router = require('express').Router();

/*
const signupRouter = require("./routes/signupRouter");
const mypageRouter = require("./routes/mypageRouter");
const selectstageRouter = require("./routes/selectstageRouter");
const playstageRouter = require("./routes/playstageRouter");
const rankRouter = require("./routes/rankRouter");
const loginRouter = require("./routes/loginRouter");
const guestRouter = require("./routes/guestRouter");
const gameoverRouter = require("./routes/gameoverRouter");
*/

router.get("/signup", signupRouter)

router.get("/mypage", mypageRouter)

router.post("/mypage", mypageRouter)

router.get("/selectstage", selectstageRouter)

router.get("/playstage", playstageRouter)

router.get("/rank", rankRouter)

router.post("/login", loginRouter)

router.post("/guest", guestRouter)

router.post("/gameover", gameoverRouter)

module.exports = router;
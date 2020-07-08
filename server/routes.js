var controller = require("./controllers");
var router = require("express").Router();

router.post("/signup", controller.signup.post)

router.post("/mypage", controller.mypage.post)

router.get("/selectstage", controller.selectstage.get)

router.post("/playstage", controller.playstage.post)

router.get("/rank", controller.rank.get)

router.post("/login", controller.login.post)

router.post("/guest", controller.guest.post)

router.post("/gameover", controller.gameover.post)

router.post("/makestage", controller.makestage.post)

router.post("/confirm", controller.confirm.post)

module.exports = router;
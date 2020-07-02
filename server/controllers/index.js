const { mypage, signup, selectstage, playstage, rank, login, guest, gameover } = require("../models");

module.exports = {
    mypage: {
        get: function (req, res) {
            mypage.findAll({
                where: {
                    nickname: req.body.nickname
                }
            }).then((data, err) => {
                console.log(data)
                if (err) {
                    return res.status(404).send("정보가 존재하지 않습니다");
                } else {
                    // data가 어떻게 나오는지 console.log 해 보고 send할 내용 적고싶은뎅..
                    res.status(200).send({
                        "nickname": data.nickname
                    });
                }
            })
        },
        post: async function (req, res) {

            let nickname = await mypage.findOne({
                where: {
                    nickname: req.body.nickname
                }
            })
            .then(results => {
                results.dataValues.id
            })

            // mypage에서 post 기능은 유저 닉네임 변경에 필요한 기능
            // ****** user update를 써야겠다 (? 왜 안되지... database table을 어떻게 변경해야할까)
            users.update({
                nickname: req.body.nickname
            })
            .then((data, err) => {
                if (err) {
                    return res.status(404).send("이미 존재하는 닉네임입니다");
                } else {
                    res.status(200).send("닉네임이 변경되었습니다");
                }
            })
        }
    },
    signup: {
        get: function (req, res) {
            // models.signup.get((err, results) => {
            //     if (err) {
            //         res.status(404).send("회원가입에 실패했습니다");
            //     } else {
            //         // results 부분 API 문서+models 참고해서 다시 확인
            //         res.status(200).send(results);
            //     }
            // })
            
        }
    },
    selectstage: {
        get: function (req, res){
            // models.selectstage.get((err, results) => {
            //     if (err) {
            //         res.status(404).send("스테이지가 존재하지 않습니다");
            //     } else {
            //         // results 부분 API 문서+models 참고해서 다시 확인
            //         res.status(200).send(results);
            //     }
            // })
        }
    },
    playstage: {
        get: function (req, res){
            // models.playstage.get((err, results) => {
            //     if (err) {
            //         res.status(404).send("정보가 존재하지 않습니다");
            //     } else {
            //         // results 부분 API 문서+models 참고해서 다시 확인
            //         res.status(200).send(results);
            //     }
            // })
        }
    },
    rank: {
        get: function (req, res){
            // models.rank.get((err, results) => {
            //     if (err) {
            //         res.status(404).send("정보를 가져올 수 없습니다");
            //     } else {
            //          // results 부분 API 문서+models 참고해서 다시 확인
            //         res.stauts(200).send(results)
            //     }
            // })
        }
    },
    login: {
        post: function (req, res){
            // var contents = req.body.nickname;
            // * password도 추가해야함!
            // * email 추가
            // * nickname 빼기
            // models.login.post(contents, (err) => {
            //     if (err) {
            //         res.status(404).send("로그인에 실패했습니다")
            //     } else {
            //         res.status(200).send("로그인 되었습니다")
            //     }
            // })
        }
    },
    guest: {
        post: function (req, res){
            // * 여기서 닉네임에 default로 guest) 지정해주려면 어디서 해야하지?
            // * 컨트롤러에서 지정하기
            // var contents = req.body.nickname;
            // models.guest.post(contents, (err) => {
            //     if (err) {
            //         res.status(404).send("이미 존재하는 닉네임입니다")
            //     } else {
            //         res.status(200).send("접속 성공하였습니다")
            //     }
            // })
        }
    },
    gameover: {
        post: function (req, res){
            // var contents = [
            //     req.body.userid,
            //     req.body.missedCode,
            //     req.body.score,
            //     req.body.stageName
            // ]
            // models.gameover.post(contents, (err) => {
            //     if (err) {
            //         res.status(404).send("저장되지 않았습니다")
            //     } else {
            //         res.status(200).send("게임정보를 성공적으로 저장했습니다")
            //     }
            // })
        }
    }
}
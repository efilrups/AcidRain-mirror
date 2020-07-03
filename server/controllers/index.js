const { users, guests, playlogs, stages } = require("../models");

module.exports = {

  // users, playlogs
    mypage: {
        get: async function (req, res) {
            let checkUser = await users.findAll({
                attributes: ["email", "nickname"],
                where: {
                    nickname: 'ohmyGOD' //req.body.nickname
                },
                include: [{
                  model: playlogs,
                  attributes: ["score", "missedcode"],
                  include: [{
                    model: stages,
                    attributes: ["stagename"]
                  }]
                }
              ]
            })
            let result = []
            checkUser.forEach(ele => {
              let obj = {
                'email': ele.email,
                'nickname': ele.nickname,
                'playlogs': []
              }
              ele.playlogs.forEach(log => {
                let logEle = {
                  'score' : log.score,
                  'missedcode' : log.missedcode,
                  'stagename' : log.stage.stagename
                }
                obj.playlogs.push(logEle)
              })
              result.push(obj)
            });

            if(checkUser){
              // res.send(checkUser)
              res.send(result)
            } else {
              res.status(404).send("정보가 존재하지 않습니다");
            }
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
      get: (async (req, res) => {
        let a = await stages.findAll({
          attributes: ['stagename'],
          include: [{
            model: users,
            required: false,
            attributes: ["nickname"]
          }]
        })
        console.log('JSON.stringify(a): ', JSON.stringify(a));
        let result = [];
        for(let i=0; i<a.length; i++){
          let b = {}
          b.stagename = a[i].stagename
          b.nickname = a[i].user.nickname
          result.push(b)
        }



        res.send(result)
        // res.send(a)
      })
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
    // 닉네임, 스테이지, 점수, 일자
    rank: {
        get: (async (req, res) => {
            let ranks = await playlogs.findAll({
              attributes: ['score', 'createdat'],
              include: [{
                model: stages,
                attributes: ["stagename"]
              },{
                model: users,
                attributes: ["nickname"]
              },{
                model: guests,
                attributes: ["nickname"]
              }]
            })
            // stage객체의 stagename을 꺼내고
            // 만약에 guest가 null이라면 user객체의 nickname을 꺼내고, 아니라면 반대로
            let result = []
            ranks.forEach(ele => {
              result.push({
                'score': ele.score,
                'stagename': ele.stage.stagename,
                'createdat': ele.createdat,
                'nickname': ele.guest === null ? ele.user.nickname : ele.guest.nickname
              })
            });
            res.status(200).send(result)
        })
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
    // users, playlogs
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
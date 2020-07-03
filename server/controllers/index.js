const { users, guests, playlogs, stages } = require("../models");

module.exports = {

  // users, playlogs
    mypage: {
        get: async function (req, res) {
            let checkUser = await users.findAll({
                attributes: ["email", "nickname"],
                where: {
                    nickname: 'oyeon' //req.body.nickname
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
        post: function (req, res) {
            // * 여기서 들어온 req를 확인해서 원래 닉네임이 뭔지 찾아서 그 닉네임을 새로운 닉네임으로 바꿔주어야 하는데
            // * email, password를 req.body에 추가해야할지 생각해보기
            // * 로그인이 된 상태다?
            // * 클라이언트에서 oldnickname 이랑 newnickname을 따로 받아올 것
            users.update({
                nickname: req.body.newnickname
            }, {
                where: {
                    nickname: req.body.oldnickname
                }
            })
            .then(data => {
                console.log(data)
                if (data[0] === 1) {
                    // 중복된 닉네임 추가하기
                    return res.status(200).send("닉네임이 변경되었습니다");
                } else {
                    res.status(404).send("존재하지 않는 닉네임입니다");
                }
            })
        }
    },
    signup: {
        // 이건 왜 안되지 post라서 그런가.... 
        post: function (req, res) {
            users.build({
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickName
            }, {
                fields: ["email", "password", "nickname"]
            })
            .then((data) => {
                if (data) {
                    res.status(404).send({    
                        "message": "회원가입에 실패하였습니다"
                    });
                } else {
                    console.log('sdf')
                    res.status(200).send({    
                        "email": req.body.email, 
                        "nickname": req.body.nickName,
                        "message": "회원가입에 성공하였습니다"
                    });
                }
              });
        }
    },
    selectstage: {
        get: async function (req, res){
            let outputStages = await stages.findAll({
                attributes: [ "stagename" ],
                include: [{
                    model: users,
                    attributes: [ "nickname" ]
                }]
            })
            if (!outputStages) {
                return res.status(404).send({    
                    "message": "스테이지가 존재하지 않습니다"
                });
            } else {
                let result = [];
                outputStages.forEach(stage => {
                    result.push({
                        "stagename": stage.stagename,
                        "nickname": stage.user.nickname
                    })
                })
                res.status(200).send(result)
            }
        }
      },
    
    playstage: {
        get: function (req, res){
            stages.findOne({
                where: {
                    stagename: req.body.stagename
                }
              }).then(data => {
                  console.log(data)
                if (!data) {
                    res.status(404).send("정보가 존재하지 않습니다");
                } else {
                    res.status(200).send({    
                        "content": data.contents
                    })
                }
              })
        },
        post: async function(req, res) {

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
        //로그인이 post가 맞나..? 그럴려면 디비에 전달해주는게 있어야하는데 (세션)
        post: function (req, res){
            users.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({    
                        "message": "로그인에 실패하였습니다"
                    })
                } else {
                    res.status(200).send({    
                        "message": "로그인되었습니다"
                    })
                }
            })
        }
    },
    guest: {
        post: function (req, res){
            guests.findAll({
                where: {
                    nickname: `guest)${req.body.nickname}`
                }
            })
            .then(data => {
                if (data) {
                    guests.create({
                        nickname: `guest)${req.body.nickname}`
                    })
                    res.status(200).send({    
                        "message": "접속 성공하였습니다"
                    })
                } else {
                    res.status(404).send({    
                        "message": "이미 존재하는 닉네임입니다"
                    })
                }
            })
        }
    },
    // users, playlogs
    gameover: {
        post: function (req, res){
            playlogs.create({
                // userid에 join해서 넣어야함
                userid: req.body.email,
                missedCode: req.body.missedCode,
                score: req.body.score,
                stagename: req.body.stageName
            })
            .then((data, err) => {
                if (err) {
                    res.status(404).send({    
                        "message": "저장되지 않았습니다"
                    })
                } else {
                    res.status(200).send({    
                        "stageName": data.stagename,
                        "score": data.score,
                        "missedCode": data.missedCode,
                        "userid": data.userid,
                        "message": "게임정보를 성공적으로 저장하였습니다"
                    })
                }
            })
        }
    }
}
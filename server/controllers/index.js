const { users, guests, playlogs, stages } = require("../models");

module.exports = {

  // users, playlogs
    mypage: {
        get: async function (req, res) {
            let checkUser = await users.findAll({
                attributes: ["email", "nickname"],
                where: {
                    nickname: req.body.nickname
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
              res.send(result)
            } else {
              res.status(404).send("정보가 존재하지 않습니다");
            }
        },
        post: async function (req, res) {
          // * 여기서 req.body.nickname은 oldnickname을 말함
          // * 클라이언트에서 oldnickname 이랑 newnickname을 따로 받아올 것
          let result = await users.update({
            nickname: req.body.newnickname
          }, {
            where: {
                nickname: req.body.nickname
            }
          })
          if(result[0] === 0){
            res.status(404).send("존재하지 않는 닉네임입니다");
          } else {
            res.status(200).send("닉네임이 변경되었습니다");
          }
        }
    },
    signup: {
        // 이건 왜 안되지 post라서 그런가.... 
        post: async function (req, res) {
            await users.create({ 
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickname,
            })
            .then(user => {
                console.log(user)
                res.send(user.get({
                    plain: true
                }))
                if (!user) {
                    res.status(404).send({ 
                        "message": "회원가입에 실패하였습니다"
                    });
                } else {
                    console.log('sdf')
                    res.status(200).send(user);
                }
              })
            // function a (queryInterface, Sequelize) {
            //      queryInterface.bulkInsert('users', [{
            //       email: req.body.email,
            //       password: req.body.password,
            //       nickname: req.body.nickname,
            //       createdAt: new Date(),
            //       updatedAt: new Date()
            //     }], {});
            // }

            // const setNewUser = async() => {
            //     var newUser = {
            //         email: req.body.email,
            //         password: req.body.password,
            //         nickname: req.body.nickname,
            //     }
            //     const user = await users.create(newUser);

            //     if (!user) {
            //         res.status(404).send({ 
            //             "message": "회원가입에 실패하였습니다"
            //         });
            //     } else {
            //         console.log('sdf')
            //         res.status(200).send(user);
            //     }
            //   }

            //   setNewUser();
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
        get: async function (req, res){
          let result = await stages.findAll({
            attributes: ['contents'],
            where: {
              stagename: req.body.stagename
            }
          })
          if(result.length !== 0){
            res.status(200).send(result)
          } else {
            res.status(404).send("정보가 존재하지 않습니다");
          }
        },
    },
    // 닉네임, 스테이지, 점수, 일자
    rank: {
        get: async function(req, res) {
            let ranks = await playlogs.findAll({
              attributes: ['id', 'score', 'createdat'],
              include: [{
                model: stages,
                attributes: ["stagename"]
              },{
                model: users,
                attributes: ["nickname"]
              },{
                model: guests,
                attributes: ["nickname"]
              }],
              order: [
                ['createdat', 'ASC'],
              ]
            })
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
        }
    },
    login: {
        post: async function (req, res){
            let result = await users.findOne({
                where: {
                    email: req.body.email,
                    // 비밀번호를 해싱해야 한다
                    password: req.body.password
                }
            })
            if(result){
              // 세션 또는 토큰을 보내야 한다
              res.status(200).send({    
                "message": "로그인되었습니다"
              })
            } else {
              res.status(404).send({    
                  "message": "로그인에 실패하였습니다"
              })
            }
        }
    },
    guest: {
      post: async function (req, res){
        let findSame = await guests.findAll({
          where: {
            nickname: `guest)${req.body.nickname}`
          }
        })
        if(findSame.length === 0){
          await guests.create({
            nickname: `guest)${req.body.nickname}`
          })
          res.status(200).send({
            "message": "게스트 로그인되었습니다"
          })
        } else {
          res.status(404).send({
            "message": "이미 존재하는 닉네임입니다"
          })
        }
      }
    },
    gameover: {
      post: async function (req, res){
        if(req.body.userid){
          console.log('회원입니다')
        }
        let result = await playlogs.create({
          score: req.body.score,
          stageid: req.body.stageid,
          userid: req.body.userid,
          guestid: req.body.guestid,
          missedcode: req.body.missedCode,
        })
        res.send(result)
      }
    }
}
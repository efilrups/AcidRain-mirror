const { users, guests, playlogs, stages } = require("../models");
const { Op } = require("sequelize");

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
            if(checkUser.length !== 0){
              let result = []
              checkUser.forEach(ele => {
                let obj = {
                  'email': ele.email,
                  'nickname': ele.nickname,
                  'playlogs': []
                }
                ele.playlogs.forEach(log => {
                  let logEle = {
                    'stagename' : log.stage.stagename,
                    'score' : log.score,
                    'missedcode' : log.missedcode
                  }
                  obj.playlogs.push(logEle)
                })
                result.push(obj)
              });
              res.send(result)
            } else {
              res.status(404).send({
                "message": "정보가 존재하지 않습니다"
              });
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
            res.status(404).send("이미 존재하는 닉네임입니다");
          } else {
            res.status(200).send("닉네임이 변경되었습니다");
          }
        }
    },
    signup: {
      post: async function (req, res) {
        let findName = await users.findAll({
          where: {
            nickname: req.body.nickname,
          }
        })
        let findEmail = await users.findAll({
          where: {
            email: req.body.email,
          }
        })
        if(findName.length + findEmail.length === 0){
          await users.create({
            email: req.body.email,
            password: req.body.password,
            nickname: req.body.nickname
          })
          res.send({
            "message": "성공적으로 가입되었습니다"
          })
        } else if(findEmail.length === 0){
          res.send({
            "message": "이미 존재하는 닉네임입니다"
          })
        } else if(findName.length === 0){
          res.send({
            "message": "이미 존재하는 이메일입니다"
          })
        }
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
                        "createdBy": stage.user.nickname
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
            res.status(404).send({
              "message": "정보가 존재하지 않습니다"
            });
          }
        },
    },
    // 닉네임, 스테이지, 점수, 일자
    rank: {
        get: async function(req, res) {
            let ranks = await playlogs.findAll({
              attributes: ['id', 'score', 'createdat'],
              order: [
                ['score', 'DESC'],
              ],
              include: [{
                model: stages,
                attributes: ["stagename"],
                // 주어진 stagename와 일치하는 rank logs
                where: {
                  stagename: req.body.stagename 
                  ? {[Op.eq]: req.body.stagename} 
                  : {[Op.not]: null}
                }
              },{
                model: users,
                attributes: ["nickname"],
                // 주어진 nickname과 일치하는 rank logs
                where: {
                  nickname: req.body.nickname 
                  ? {[Op.eq]: req.body.nickname} 
                  : {[Op.not]: null}
                }
              },{
                model: guests,
                attributes: ["nickname"]
              }]
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

    // 만약에 게임하지 않고 데이터를 보낸다면?
    gameover: {
      post: async function (req, res){
        if(req.body.userid){
          console.log('회원입니다')
        }
        await playlogs.create({
          score: req.body.score,
          stageid: req.body.stageid,
          userid: req.body.userid,
          guestid: req.body.guestid,
          missedcode: req.body.missedCode,
        })
        res.send({
          "message": "게임정보를 성공적으로 저장하였습니다"
        })
      }
    }
}
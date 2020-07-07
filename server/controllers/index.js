const { users, guests, playlogs, stages } = require("../models");
const { Op } = require("sequelize");
//const { noExtendLeft } = require("sequelize/types/lib/operators");

module.exports = {
  // users, playlogs
    mypage: {
        post: async function (req, res) {

          // * newnickname으로 수정하는 post 요청이라면?
          if(req.body.newnickname){
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
              res.status(200).send({ nickname: req.body.nickname });
            }

            // componentDidMount() 로 mypage 불러오는 화면이라면?
          } else {
            let getMyplaylogs = await playlogs.findAll({
              attributes: ["score", "stagename"],
              where: {
                nickname: req.body.nickname
              }
            })
            if(getMyplaylogs.length){
              res.status(200).send(getMyplaylogs)
            } else {
              res.status(404).send("정보가 존재하지 않습니다")
            }
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
            "result": true,
            "message": "성공적으로 가입되었습니다"
          })
        } else if(findEmail.length === 0){
          res.send({
            "result": false,
            "message": "이미 존재하는 닉네임입니다"
          })
        } else if(findName.length === 0){
          res.send({
            "result": false,
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
        post: async function (req, res){

          if(req.body.userid){
            let find = await users.findOne({
              where: {
                nickname: req.body.userid
              }
            })
            console.log('find.id: ', find.id);
            console.log('find.id: ', req.body.stagename);

            // 삭제하는가
            if(req.body.delete){
              let result = await stages.destroy({
                where:{
                  userid: find.id,
                  stagename: req.body.stagename
                }
              })
              console.log('result: ', result);

              if(result === 0){
                res.status(404).send('다시 시도해주세요')
              } else {
                res.status(200).send('삭제되었습니다')
              }
            } else {
              let result = await stages.findAll({
                attributes: ['contents'],
                where: {
                  stagename: req.body.stagename
                }
              })
              if(result.length !== 0){
                res.status(200).send(result)
              }
            }
          }
          res.status(404).send({
            "message": "정보가 존재하지 않습니다"
          });
        },
    },
    // 닉네임, 스테이지, 점수, 일자 -> 가공해서 보내라
    rank: {
        get: async function(req, res) {
          
            var result = [];
            let play = await playlogs.findAll({
              attributes: ['nickname', 'stagename', 'score', 'createdAt'],
              order: [
                ['score', 'DESC'],
              ]
            })
            
              console.log(play[0].dataValues)
              play.forEach((ele, i) => {
                result.push({
                  'rank': i+1,
                  'score': ele.dataValues.score,
                  'stagename': ele.dataValues.stagename,
                  'createdAt': ele.dataValues.createdAt,
                  'nickname': ele.dataValues.nickname
                })
              })
            
            if (result.length){
              res.status(200).send(result)
            } else {
              res.status(404).send("게임기록이 없습니다")
            }
        }
    },
    login: {
        post: async function (req, res){
          // session
          if(req.body.session){
            req.sessionStore.sessions[req.body.session]
            let session = JSON.parse(req.sessionStore.sessions[req.body.session])
            res.send(session.nickname)
            return
          } else {
            let result = await users.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }

            })

            if(result){
              console.log('result: ', result.nickname);
              // 세션 또는 토큰을 보내야 한다
              req.session.isLogin = true
              req.session.nickname = result.nickname
              // req
              console.log(req.sessionStore.sessions)
              console.log('req: ', req.sessionID);

              res.status(200).send({
                "session": req.sessionID,
                "nickname": result.nickname,
                "message": "로그인되었습니다"
              })
              res.end()
            } else {
              res.status(404).send({
                  "message": "로그인에 실패하였습니다"
              })
              res.end()
            }
          }
        }
    },
    guest: {
      post: async function (req, res){
        let findSame = await guests.findAll({
          where: {
            nickname: `guest_${req.body.nickname}`
          }
        })
        if(findSame.length === 0){
          await guests.create({
            nickname: `guest_${req.body.nickname}`
          })
          res.status(200).send({
            "result": true,
            "message": "게스트 로그인되었습니다"
          })
        } else {
          res.status(200).send({
            "result": false,
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
          missedcode: req.body.missedcode,
          nickname: req.body.nickname,
          stagename: req.body.stagename,
          guestid: req.body.guestid,
        })
        res.status(200).send({
          "message": "게임정보를 성공적으로 저장하였습니다"
        })
      }
    },

    makestage: {
      post: async function (req, res) {
        console.log(req.body)
        let find = await users.findOne({
          attributes: ['id'],
          where: {
            nickname: req.body.userId
          }
        })

        let conflict = await stages.findAll({
          where: {
            stagename: req.body.stagename
          }
        })

        console.log('conflict: ', conflict);
        if(conflict.length === 0){
          await stages.create({
            userid: find.id,
            stagename: req.body.stagename,
            contents: JSON.stringify(req.body.contents)
          })
          res.status(200).send({
            'message': '성공적으로 생성되었습니다.'
          })
        } else {
          res.status(200).send({
            'message': '이미 존재하는 스테이지 이름입니다'
          })
        }
      }
    }
}

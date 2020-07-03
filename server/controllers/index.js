const { users, guests, playlogs, stages } = require("../models");

module.exports = {
    mypage: {
        get: function (req, res) {
            users.findOne({
                where: {
                    nickname: req.body.nickname
                }
            })
            .then(data => {
                console.log(data)
                if (!data) {
                    return res.status(404).send({    
                        "message": "정보가 존재하지 않습니다"
                    });
                } else {
                    res.status(200).send({
                        "nickname": data.nickname,
                        // playLog에서 join된 값을 적어줘야 하는데
                        "playLog": [
                            // {
                            //     "stage": 
                            //     "score":
                            //     "missedCode":
                            // }
                        ]
                    });
                }
            })
        },
        post: function (req, res) {
            // * 여기서 들어온 req를 확인해서 원래 닉네임이 뭔지 찾아서 그 닉네임을 새로운 닉네임으로 바꿔주어야 하는데
            // * email, password를 req.body에 추가해야할지 생각해보기
            // * 로그인이 된 상태다?
            users.findOne({
                where: {
                    nickname: req.body.nickname
                }
            })
            .then(results => {
                results.dataValues.id
            })
    
            users.update({
                nickname: req.body.nickname
            })
            .then(data => {
                if (!data) {
                    // 여기서 들어오는 err 값이 뭐지? 모델에서 닉네임 비교해서 똑같은게 있으면 에러를 가지고 오는 건가
                    return res.status(404).send("이미 존재하는 닉네임입니다");
                } else {
                    res.status(200).send("닉네임이 변경되었습니다");
                }
            })
        }
    },
    signup: {
        // 이건 왜 안되지 post라서 그런가.... 
        post: function (req, res) {
            users.create({
                email: req.body.email,
                password: req.body.password,
                nickname: req.body.nickName
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
        }
    },
    rank: {
        get: function (req, res){
            playlogs.findAll({
                where: {
                    //users table이랑 join 해서 수정
                    userid: '1'//req.body.id
                }
            })
            .then(data => {
                console.log(data)
                if (!data) {
                    res.status(404).send({    
                        "message": "정보를 가져올 수 없습니다"
                    });
                } else {
                    res.status(200).send({  
                        //playLog도 여러개가 나와야 하는데. . . . 어뜨케?  배열 반복문으로 해볼까
                        //그래서 playlog 테이블에 추가하려는데 안된다 자꾸
                        "playLog": [
                                    //   {
                                    //       "nickname": req.body.nickName
                                    //       "stageName":
                                    //       "score":
                                    //       "created_at":
                                    //   }
                                    ]
                    })
                }
            })
        }
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
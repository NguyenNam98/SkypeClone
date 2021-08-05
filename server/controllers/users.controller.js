const database = require('../models/firebaseConnect')
var users = database.db.collection('users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const rndToken = require('rand-token')


module.exports.getInfo = async function(req, res){
    const user= await users.where('username', '==', req.body.username).get();
    let sample =''
    if (user.empty) {
        res.status(403).send('not found')
      }  
      
      user.forEach(doc => {
        if(doc.data().password='12345'){
            sample = doc.data()
        }
      })
    res.send(sample)

}

module.exports.createUser = async function(req, res){
  let existPhone = false
  const phone = req.body.phoneNumber
  const gmail = req.body.gmail
  await users.get().then(snap=>{
    snap.forEach(doc =>{
      if(!phone && doc.data().gmail === gmail ){
        existPhone = true
      }else if(doc.data().phoneNumber === phone && doc.data().phoneNumber !== undefined ){
        existPhone = true
      }
    })
  })
  if(existPhone === true){
    res.status(403).send('unsuccessfull add user')
  }else{
    await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      var userData
      if(!phone){
        userData ={
          gmail:req.body.gmail,
          username: '',
          password:hash,
          avatar:''
        }
      }else{
        userData ={
          phoneNumber:req.body.phoneNumber,
          username: '',
          password:hash,
          avatar:''
        }
      }
      users.add(userData)
    });
  
    res.status(200).send(' add user successfull')
  }
  
}

module.exports.getGroupsInfoUser = async function(req, res){
  if(!req.body){
    res.status(404).send('Not found user')
  }
  var idUser = req.body.idUser
  var roomChat = []
  const user = await users.doc(idUser)
  const check = await user.get()
  if(check.exists){
    await user.collection('roomChat').get().then(snap =>{
      snap.forEach( doc => {
        roomChat.push(doc.data())
      })
    })
    res.status(200).send(roomChat)

  }else{
    res.status(404).send('Not found user')
  }
}

module.exports.login = async function(req, res){
  const phoneNumber = req.body.phoneNumber
  const gmail =  req.body.gmail
  const password = req.body.password
  let idUser =''
  let userData = {}
  let userExist = false

  if(!gmail){
    await users.get().then(snap =>{
      snap.forEach(item =>{
        if(phoneNumber === item.data().phoneNumber){
          idUser = item.id
          userData = item.data()
          return userExist = true
        }
      })
    })
  }else{
    await users.get().then(snap =>{
      snap.forEach(item =>{
        if(gmail === item.data().gmail){
          idUser = item.id
          userData = item.data()
          return userExist = true
        }
      })
    })
  }
  if(userExist === false){
      return res.status(404).send('User not exist')
  }
  
  const checkPass = await bcrypt.compare(password, userData.password).catch( (err)=>
    {return res.status(404).send('wrong password')}
  )
  if(!checkPass){
      return res.status(404).send('wrong password')
  }
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '2d'
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
  const data = {
    idUser :idUser
  }

  let accessToken = await jwt.sign(data, accessTokenSecret,{
    algorithm: 'HS256',
    expiresIn: accessTokenLife
  })
 
  if(!accessToken){
    return res.status(404).send('Login unsuccessfull ! please try again!')
  }
  let refreshToken = rndToken.generate(process.env.REFRESH_TOKEN_SIZE)

  if(!userData.refreshToken){
    users.doc(idUser).update({
      refreshToken:refreshToken
    })
  }else{
    refreshToken = userData.refreshToken
  }
 
  await res.cookie('x_authorization', accessToken,{
    httpOnly:true,
    expires : new Date(Date.now() + 1000*3600*24*7)
  })
  return res.json({
    msg:"login successfull !",
    accessToken ,
    refreshToken,
    userData
  })
}
module.exports.refreshToken = async function(req, res){
  try {
    
    const accessTokenHeader = req.cookies.x_authorization
    const refreshTokenBody = req.body.refreshToken
  
    if(!accessTokenHeader || !refreshTokenBody){
      return res.status(403).send('Erorr request !')
    }
  
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
    const decoded = jwt.verify(accessTokenHeader , accessTokenSecret,{
      ignoreExpiration:false
    })
  
    if(!decoded){
      return res.status(403).send('AcessToken invalid!')
    }
    const data = {
      idUser : decoded.idUser
    }
  
    const accessToken = await jwt.sign(data, accessTokenSecret,{
      algorithm: 'HS256',
      expiresIn: accessTokenLife
    })
  
    if(!accessToken){
      return res.status(403).send('Error genarate token !')
  
    }
    await res.cookie('x_authorization', accessToken,{
      httpOnly:true,
      expires : new Date(Date.now() + 1000*3600*24*7)
    })
    return res.json({
      accessToken
    })
  } catch (error) {
    return res.status(403).send('Erorr request !') 
  }
}
module.exports.checkLogin = async function(req, res){
  try {
    
    const accessTokenHeader = req.cookies.x_authorization
    const refreshTokenBody = req.body.refreshToken
  
    if(!accessTokenHeader || !refreshTokenBody){
      return res.status(403).send('Erorr request !')
    }
  
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
    const decoded = jwt.verify(accessTokenHeader , accessTokenSecret,{
      ignoreExpiration:false
    })
    if(!decoded){
      return res.status(403).send('AcessToken invalid!')
    }
  
    const data = {
      idUser : decoded.idUser
    }
  
    const userData =  await (await users.doc(decoded.idUser).get()).data()
  
    if (!userData) {
      return res.status(401).send('User  not exists');
    }
  
    if (refreshTokenBody !== userData.refreshToken) {
      return res.status(400).send('Refresh token invalid.');
    }
  
    const accessToken = await jwt.sign(data, accessTokenSecret,{
      algorithm: 'HS256',
      expiresIn: accessTokenLife
    })
  
    if(!accessToken){
      return res.status(403).send('Error genarate token !')
  
    }
    await res.cookie('x_authorization', accessToken,{
      httpOnly:true,
      expires : new Date(Date.now() + 1000*3600*24*7)
    })
    return res.json({
      userData,
      accessToken
    })
  } catch (error) {
    return res.status(403).send('Erorr request !')
  }
}
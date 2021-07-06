const database = require('../models/firebaseConnect')
var users = database.db.collection('users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
  await users.get().then(snap=>{
    snap.forEach(doc =>{
      console.log(doc.data().phoneNumber);
    if(doc.data().phoneNumber === req.body.phoneNumber){
      existPhone = true
    }
    })
  })
  if(existPhone === true){
    res.status(403).send('unsuccessfull add user')
  }else{
    await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      var userData ={
        phoneNumber:req.body.phoneNumber,
        username: req.body.username,
        password:hash,
        avatar:req.body.avatar
      }
      users.add(userData)
    });
  
   
    
    res.status(200).send(' add user successfull')
  }
  
}

module.exports.getGroups = async function(req, res){
  var idUser = req.body.idUser
  var roomChat = []
  var idRoomChat = []
  await users.doc(idUser).collection('roomChat').get().then(snap =>{
    snap.forEach(doc =>{
      roomChat.push(doc.data())
      idRoomChat.push(doc.id)
    })
  })
  res.send(roomChat)

}
module.exports.createGroup = async function (req, res){
  const dataGroup = req.body
  const idUser = req.params.idUser
  const user = await users.doc(idUser)
  const check = await user.get();
  if(check.exists){
    await user.collection('roomChat').add(dataGroup)
    res.status(200).send('add group successfull')
    
  }else{
    res.status(403).send('unsuccess to add group')
  }

}
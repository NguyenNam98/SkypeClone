const database = require('../models/firebaseConnect')
const admin = require('firebase-admin')
var groups = database.db.collection('groups')
var users = database.db.collection('users')

module.exports.createGroup = async function( req, res){
    if(!req.params.idUser && !req.body){
        res.status(403).send('invalid request')
    }
    const idUser = req.params.idUser
    const user = await users.doc(idUser)
    const check = await user.get();
    var idGroup=''
  
    if(check.exists){
        let groupData = {...req.body,timeCreated: new Date(),'createdBy':req.params.idUser, 'users':[req.params.idUser]}
        await groups.add(groupData).then(doc =>{idGroup = doc.id})
        await user.update({
            "groups" :admin.firestore.FieldValue.arrayUnion(idGroup)
        })
        res.status(200).send('create successfull !')
    }else{
        res.status(403).send('error request')
    }
}
module.exports.addMember = async function( req, res){
    if(!req.body){
        res.status(403).send('invalid request')
    }
    const idUser = req.body.idUser
    const idGroup = req.body.idGroup
    const user = await users.doc(idUser)
    const group = await groups.doc(idGroup)
    const checkUser = await user.get()
    const checkGroup = await group.get()
    if(checkUser.exists && checkGroup){
        await group.update({
            "users" : admin.firestore.FieldValue.arrayUnion(idUser),
            "numberOfUser": admin.firestore.FieldValue.increment(+1)
        })
        await user.update({
            "groups" :admin.firestore.FieldValue.arrayUnion(idGroup)
        })
        res.status(200).send('create successfull !')
    }else{
        res.status(403).send('error request')
    }
}

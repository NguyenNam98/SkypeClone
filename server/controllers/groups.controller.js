const database = require('../models/firebaseConnect')
const admin = require('firebase-admin')
var groups = database.db.collection('groups')
var users = database.db.collection('users')
var messages = database.db.collection('messages')

module.exports.createGroup = async function( req, res){
    if(!req.params.idUser || !req.body){
        res.status(403).send('invalid request')
    }
    const idUser = req.idUser
    const user = await users.doc(idUser)
    const check = await user.get();
    var idGroup=''

    if(check.exists){
        let groupData = {
            'numberUsers':1,
            'nameGroup': req.body.name,
            'timeCreated': new Date(),
            'createdBy':idUser, 
            'users':[req.params.idUser]
        }
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
module.exports.getGroup = async (req, res)=>{
 try {
    const idUser = req.idUser
    let groupsOfUser = []
    let dataGrUser = []
    const user = users.doc(idUser)

    await user.get().then(item =>{
        groupsOfUser = item.data().groups
    })

    for (let index = 0; index < groupsOfUser.length; index++) {
        let groupinFo = {}
        await groups.doc(groupsOfUser[index]).get().then(async (item) => {
            groupinFo = { id: groupsOfUser[index], ...item.data() }
        })
        dataGrUser.push(groupinFo)
    }
    for (let i = 0; i < dataGrUser.length; i++) {
        let idMessages = dataGrUser[i].lastMessage

        if(idMessages){
            await messages.doc(idMessages).get().then( async item =>{
                let idUser = item.data().idUser
                let usernameLastMessage = ''
                await users.doc(idUser).get().then(ex =>{
                    usernameLastMessage = ex.data().username
                })
                let date = item.data().timeCreated.toDate()
                let now = new Date().getTime()
                if((now - date.getTime())/86400000 < 1){
                    date = new Date(date).toLocaleString('en-US', { hour: 'numeric', hour12: true })
                }else if((now - date)/86400000 < 7){
                    date = new Date(date).toLocaleString('en-us', {  weekday: 'long' }).slice(0,3)
                }else{
                    date = new Date(date).toLocaleString('en-us', {year: "numeric",month: "2-digit",day: "numeric" })
                }

                dataGrUser[i]= {lastMessageInfo:{text : item.data().text ,timeCreated: date, idUser :item.data().idUser ,usernameLastMessage} , ...dataGrUser[i]}
            })
        }
    }
    return res.status(200).send(dataGrUser)
 }catch (error) {
    return res.status(404).send('Error request')
 }
}
module.exports.dataOneGroup = async (req, res)=>{
    try {
        const idGroup = req.params.idGroup
        
        await groups.doc(idGroup).get().then(item =>{
            let data = {idGroup,...item.data()}
            return res.status(200).send(data)
        })
        
    } catch (error) {
        return res.status(404).send('Error request')
    }

}

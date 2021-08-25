const database = require('../models/firebaseConnect')
var messages= database.db.collection('messages')
var groups = database.db.collection('groups')
var users =  database.db.collection('users')

module.exports.getMessageOfGroup = async function(req, res){
    const data = req.body
    if(!data || !data.idGroup ){
        res.status(403).send('Invalid request')
    }
    await messages.where("idGroup" ,"==", data.idGroup).get()
    .then(snap=>{
        let mes =[]
        snap.forEach(element => {
            mes.push(element.data())
        });
        res.send(mes)
    })
    
}
module.exports.sendMessage = async function(req, res){
    if(!req.body){
        res.status(403).send('Invalid request')
    }
    const data = req.body
    if(!data.idGroup || !data.idUser){
        res.status(403).send('Bad request')
    }else{
        await messages.add({...data, timeCreated : new Date()}).then(mess =>{
             groups.doc(data.idGroup).update({
                lastMessage : mess.id
            })
        })
        res.status(200).send('successfull sended messages')
    }

}
module.exports.getMessage = async function( req, res){
    const data = req.body
    if(!data || !data.idMessage ){
        res.status(403).send('Invalid request')
    }
    await messages.doc(data.idMessage).get().then(mes =>{
       res.status(200).send(mes.data())
    })
}
module.exports.dataRoomChat = async (req, res) =>{
    try {
        const idRoom = req.params.idRoom
        let usersGroup =[]
        let messagesGroup =[]
        let dataUsersGroup =[]

        await groups.doc(idRoom).get().then(item =>{
            usersGroup = item.data().users 
            })
        await messages.where('idGroup',"==",idRoom).get().then(snap =>{
            snap.forEach(item => {
                let data = {
                    text : item.data().text,
                    timeCreated : item.data().timeCreated.toDate(),
                    idUser : item.data().idUser
                }
                messagesGroup.push(data)
            })
        })
        for (let index = 0; index < usersGroup.length; index++) {
            await users.doc(usersGroup[index]).get().then(item =>{
                dataUsersGroup.push({id:usersGroup[index], username:item.data().username, avatar:item.data().avatar})
            })
        }

        messagesGroup = messagesGroup.sort((a, b) => a.timeCreated.getTime() - b.timeCreated.getTime())

        return res.status(200).json({
            messagesGroup,
            dataUsersGroup
        })
    } catch (error) {
        return res.status(404).send('Bad request')
    }
}
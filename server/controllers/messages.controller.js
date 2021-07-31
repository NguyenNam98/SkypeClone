const database = require('../models/firebaseConnect')
var messages= database.db.collection('messages')
var groups = database.db.collection('groups')

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
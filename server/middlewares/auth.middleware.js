const jwt = require('jsonwebtoken')

module.exports.authMiddle = async function (req, res){
    const accessTokenHeader = req.headers.x_authorization
    if(!accessTokenHeader){
        return res.status(404).send('Error authority')
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const verified = jwt.verify(accessTokenHeader, accessTokenSecret)
    if(!verified){
        return res.status(404).send('Error verify authority')

    }
    const idUser =  verified.idUser

    req.idUser = idUser

    next()
}
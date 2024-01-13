const jwt = require('jsonwebtoken')
const User = require('../Models/user')

exports.authenticate = async (req,res,next)=>{
    try{
        const token = req.header("Authorization");
        console.log(token)

        const id = jwt.verify(token,'secretkey')
        const user = await User.findByPk(id.userId)
        req.user = user
        next()
    }
    catch(err){
        console.log(err)
    }
}
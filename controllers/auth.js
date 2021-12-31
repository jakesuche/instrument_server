
const User = require('../models/user')

const jwt = require('jsonwebtoken')
exports.authUser = function(req,res,next){

    
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        
    }
    if(token == null){
        return res.status(442).send({message:'TOKEN IS REQIURED, Please provide a token'})
    }
    jwt.verify(token, 'this is mane is amazing', function(err,data){
        if(err){
            res.status(401).send({message:`Your access token has expired,  pls login again to have access`})
            console.log(err.message)
        }else{
            User.findById(data.id)
            //  .populate('addresses')
            //  .populate('primaryAddress')
             .exec((err,user)=>{
                 if(err){
                     return res.status(404).send(err)
                 }else{
                      req.user = user
                      
                     next()
                 }
             })
           
        }
        
        
    })

}
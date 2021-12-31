const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



exports.register = function(req,res){
    const registerData = req.body;
    console.log(registerData)
    if(!registerData.email){
        return res.status(422).json({
            errors:{
                email:'email is required'
            }
        })
    }

    if(!registerData.password){
        return res.status(422).json({
            errors:{
                password:'password is required'
            }
        })
    }
    if(!registerData.firstname){
        return res.status(422).json({
            errors:{
                password:'firstname is required'
            }
        })
    }
    if(!registerData.lastname){
        return res.status(422).json({
            errors:{
                password:'lastname is required'
            }
        })
    }

    const user = new User(registerData)

    user.save((err, data)=>{
        if(err){
            return  res.status(422).send({err})
        }else {
            return res.json({
                success:true,
                message:'User register Successfully',
                data
            })
        }
    })
}

exports.login = function(req, res){
    const { email, password } = req.body;
   

  
  
    if(!email || !password){
        res.status(400).send({ message: 'Please provide email and password'})
    }else {
        User.findOne({email:email})
        .select("+password")
        .exec((err, user)=>{
            if(err){
                return res.status(400).send({err})
            }
            if(!user || !user.comparePassword(password,err)){
                res.status(401).send({message:'Incorrect email or password'})
            }else {
                const token = jwt.sign({id:user._id}, 'this is mane is amazing',{
                    expiresIn:'2d'
                })
               const userdata = {
                   ...user._doc
               }
               delete userdata.password
                console.log(userdata)
                res.status(200).send({
                    message:'success',
                    userdata,
                    token

                })
            }
        })
    }
}


exports.updateUserData = (req, res) => {
    const userData = req.body;
    const id = req.user._id;
    productData.updatedAt = Date.now() 
    User.findByIdAndUpdate(id, {$set:userData}, {new : true},(err,updated)=>{
        if(err){
            return res.status(422).send({err})
        }else {
            res.status(200).send(updated)
        }
    })
}


exports.updateUserPassword = (req, res) => {
    const { oldpassword, newPassword } = req.body
    const id = req.user._id
    console.log(oldpassword, newPassword)
   
    if(!newPassword || !oldpassword){
        res.send(422).send({message:'passwords cannot be empty'})
    }else {
        User.findById(id).select("+password").exec((err, user)=>{
            if(err){
                return res.status(400).send({err})
            }if(!user || !user.comparePassword(oldpassword)){
                
               return  res.status(403).send({message:'Password is incorrect'})
            }else {
                
                const newUser = new User({password:newPassword})
                newUser.save((err, user)=>{
                    if(err){
                        console.log('coming from prev save')
                        return res.status(422).send({err})
                    }else {
                        return res.status(200).send({message:'Password updated successfull'})
                    }
                })

                // const Password =  newUser.encryptPassword(newPassword)
                // res.send({Password:Password})
            }
        })
    }
}
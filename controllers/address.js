const Address = require('../models/address')


exports.Addaddress = (req,res) => {
    
    const addressData = req.body

    console.log(addressData)
   

   
    const { country, type, address1, address2, state,city} = addressData
    if(!country || !address1 || !address2 || !state || !city){
        return res.status(400).send({message:'All fields required'})
    }else{
       

        const newAddress = new Address(addressData)
        newAddress.user = req.user._id

        newAddress.save((err, result) => {
            if(err){
                return res.status(422).send({err})
            }else{
                return res.status(200).send({result})
            }
        })
    }
    
    

}

exports.getUserAddress = function(req,res){
    console.log('kks')
    Address.find({user:req.user._id}).exec((err, address)=>{
        if(err){
            res.status(422).send({err})
        }else{
            return res.status(200).send({address})
        }
    })
}
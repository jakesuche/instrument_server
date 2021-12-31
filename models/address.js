const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Address = new Schema({
    city:{
        type:String
    },
    state:{
        type:String,

    },
    address:{
        type:String
    },
    address1:{
        type:String
    },
    type:{
        type:String
    },
    country:{
        type:String
    },
    user:{type:Schema.Types.ObjectId, ref:'User'},
    
})

module.exports = mongoose.model('Address', Address)
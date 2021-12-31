const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new Schema({
    paymentMethod:{
        type:String
    },
    createAt:{type:Date, default:Date.now},
    updateAt:{type:Date, default:Date.now},
    orderPaymentId:{type:String},
    user:{type:Schema.Types.ObjectId, ref:'User'},
    items:[],
    TotalPaid:{type:Number},
    address:{type:Schema.Types.ObjectId, ref:'Address'},
    status:{
        type:String,
        default:'Pending'
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredDate:{type:Date, }

})

module.exports = mongoose.model('Order', Order)
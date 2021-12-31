const res = require('express/lib/response')
const Product = require('../models/product')



 exports.getallProduct = function(req,res) {
    const category = req.query && req.query.category ?  req.query.category : ""


    Product.find({}).exec((err, products)=>{
        if(err){
            return res.status(422).send({err})
        }else {
            Product.countDocuments((err, count)=>{
                if(err)return res.status(422).send({err})
                res.status(200).send({
                    count:count,
                    products
                })
                console.log(products)
            })
        }
    })
    
}

exports.getProductById = (req,res) =>{

    const { id } = req.params
    Product.findById(id).exec((err,product) =>{
        if(err) return res.status(400).send(err)
        return res.status(200).send(product)
    })

}


exports.deleteProduct = (req,res)=> {
    const { id } = req.params;
    Product.findByIdAndDelete(id).exce((err)=>{
        if(err){
            return res.status(422).send({err})
        }else {
            return res.status(200).send({
                message:'product deleted'
            })
        }
    })
}

exports.updateProduct = (req, res) => {
    const productData = req.body;
    const { id } = req.params;
    const user = req.user;
    productData.updatedAt = Date.now() 
    Product.findByIdAndUpdate(id, {$set:productData}, {new : true},(err,updated)=>{
        if(err){
            return res.status(422).send({err})
        }else {
            res.status(200).send(updated)
        }
    })
}
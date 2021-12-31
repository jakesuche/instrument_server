const mongoose = require('mongoose');
// const Product = require('./models/')
const Product = require('./models/product.js')


const data = require('./data')

console.log(Product)
class DB {
    contructor() {
        this.products = data.products
        this.models = Product;
    }

    async cleanDb() {
        
       await Product.deleteMany({},()=>{})
        // for(let model of this.models){
        //     await model.deleteMany({}, ()=>{})
        //     console.log(`Data for model ${model.collection.collectionName} Deleted!`)
        // }
    }

    async pushDataTodoDb() {

        console.log(this.products)
        await data.products.forEach(async (product) => {
            await(new Product(product)).save((err)=>{
                console.log('product')
                console.log(err)
            })
        })

        console.log('Data base populated')
    }

    async seedDb(){
        await this.cleanDb();
        await this.pushDataTodoDb()
    }

}

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser:true})
.then(async ()=>{
    const db = new DB();
    await db.seedDb();
    console.log('You can close connection now')
})
.catch(err=>console.log(err))
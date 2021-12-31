const Category = require('../models/category');

exports.getCategories = function(req, res) {
  Category.find({})
        .exec((errors, categories) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(categories);
  });
}

exports.createCategory = function(req,res){
    const { name, image } =  req.body

    if(!image) return res.status(422).send({err:'Image require'})
    if(!name) return res.status(422).send({err:'Name is required'})
    const cat = new Category({
        name:name,
        image:image
    })

    cat.save((err, data) => {
        if(err) return res.status(422).send({err})
        else{return res.status(200).send({message:'category'})}
    })
}
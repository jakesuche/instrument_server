const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstname: {
    type: String,
    // required: "Firstname is Required",
    // unique: false,
  },
  lastname: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    indexminlength: [4, "Too short, min is 4 characters"],
    maxlength: [32, "Too long, max is 32 characters"],
    required: "Password is required",
    select:false
  },
  email: {
    type: String,
    // required: "Email is Required",
    lowercase: true,
    // unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  orders:[{type:Schema.Types.ObjectId, ref:'Orders'}],
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin:{
    type: Date,
    default: Date.now, 
  }
});
userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if(err){
      return next(err)
    }

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err){return next(err)}

      user.password = hash;
      next()
    })
  })
})

userSchema.methods.comparePassword = function(guessPassword){
  return bcrypt.compareSync(guessPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)

var mongoose = require('mongoose')

var userSchema = mongoose.Schema(
    {
        nome:{type:String,required:true},
        email:{type:String,required:true},
        senha:{type:String,required:true}
    }
)

var User = mongoose.model("user", userSchema)
module.exports = User;
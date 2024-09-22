var mongoose = require('mongoose')

var userSchema = mongoose.Schema(
    {
        username:{type:String,required:true},
        senha:{type:String,required:true}
    }
)

var User = mongoose.model("user", userSchema)
module.exports = User;
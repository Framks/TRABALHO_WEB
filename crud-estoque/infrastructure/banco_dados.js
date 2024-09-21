var mongoose = require("mongoose")
// para rodar localmente
//var mongoDB_URI = "mongodb://admin:password@127.0.0.1:27017/estoque?authSource=admin"

// para rodar no docker composer
var mongoDB_URI = "mongodb://admin:password@mongodb:27017/estoque?authSource=admin"

mongoose.connect(mongoDB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
var db= mongoose.connection


db.on("connected",() => console.log("Mongo connected!"))
db.on("disconnected",() => console.log("Mongo disconnected!"))
db.on("error",(error) => console.log(error))
var mongoose = require('mongoose')

var produtoSchema = mongoose.Schema(
    {
        nome:{type:String, require:true},
        valorDeCompra:{type:Number, min:0},
        valorDeVenda:{type:Number, min:0},
        quantidade:{type:Number},
        data:{type:Date, default:Date.now}
    }
)

const Produto = mongoose.model('produto', produtoSchema)

module.exports = Produto
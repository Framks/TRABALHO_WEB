var mongoose = require('mongoose')

var itemSchema = mongoose.Schema(
    {
        nome:{type:String, require:true},
        valor_venda:{type:Number, min:0},
        valor_compra:{type:String},
        quantidade:{type:Number},
        data:{type:Date, default:Date.now}
    }
)

const Item = mongoose.model('item', itemSchema)

module.exports = Item
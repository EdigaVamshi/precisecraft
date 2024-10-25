const mongoose=require('mongoose')

const buildSchema = new mongoose.Schema(
    {
        name: String,
        rating: String,
        description: String,
        price: Number,
        img: String,
        category: String
    }
)

const buildModel = mongoose.model("Build", buildSchema)
module.exports=buildModel
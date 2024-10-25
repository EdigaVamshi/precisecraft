require('dotenv').config();
const mongoose=require('mongoose')

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongo connected')
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
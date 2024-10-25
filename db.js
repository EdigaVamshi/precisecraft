const mongoose=require('mongoose')

const connectDB = async () => {
    try{
        const con = await mongoose.connect('mongodb+srv://Admin:iamadmin@cluster0.idparla.mongodb.net/pctest?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Mongo connected')
    } catch(err){
        console.log(err);
    }
}

module.exports = connectDB;
const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cartItems: {
        type: Map,
        of: Number,
        default: {}
    }
});

const User = mongoose.model('User', userSchema);
module.exports=User;
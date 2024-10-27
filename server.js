// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db.js');
const buildModel = require('./models/Build.js');
// const customModel = require('./models/Custom.js');
const cors = require('cors');
const multer = require('multer');
const { storage } = require('./cloudinaryConfig');
const upload = multer({ storage });
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const PcBuild=require('./models/PcBuild.js');
const User=require('./models/User.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();

// for clearing db
// const delbuild= async (req,res) => {
//     try {
//         await User.deleteMany({});
//         console.log('All builds have been cleared');
//     } catch (err) {
//         res.status(500).send('Failed to clear builds');
//     }
// }

// delbuild();

const secretKey=process.env.JWT_SECRET;
const verifyToken= (req, res, next) => {
    const token=req.headers['authorization'];
    if(!token){
        return res.status(403).json({error: 'No token provided'});
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).json({error: 'Un-authorized'});
        }
        req.userId=decoded.userId;
        next();
    });
};

app.post('/signup', async (req, res) => {
    try{
        const {email, password}=req.body;
        const hashedPw=await bcrypt.hash(password,12);
        const newUser=new User({email,password: hashedPw});
        await newUser.save();
        res.json(newUser);
    } catch (error){
        res.status(500).json({error: 'Failed to submit'});
    }
});

app.post('/login', async (req, res) => {
    try{
        const {email, password}=req.body;
        const validUser= await User.findOne({email});
        if(validUser){
            const pw = validUser.password;
            const validPw=await bcrypt.compare(password, pw);
            if(validPw){
                const token=jwt.sign({userId: validUser._id}, secretKey, {expiresIn: '1h'});
                res.json({token});
            }else{
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }else{
            res.status(401).json({ error: 'User not found' });
        }
    } catch(error){
        res.status(500).json({ error: 'Login failed' });
    }
})

app.get('/test4', async (req,res) => {
    try{
        const users=await User.find();
        res.json(users);
    } catch(error){
        res.status(500).json({error: 'No data'});
    }
})

app.get('/test', async (req, res) => {
    try {
        const build = await buildModel.find();
        res.json(build);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch builds' });
    }
});

// app.get('/test2', async (req, res) => {
//     try{
//         const custom = await customModel.find();
//         res.json(custom);
//     } catch(error){
//         res.status(500).json({error: 'Failed to fetch custom data'});
//     }
// })

app.post('/admin', upload.single('img'), async (req, res) => {
    try {
        const { name, description, price, rating, category } = req.body;
        const img=req.file.path;
        const newBuild=new buildModel({name,rating,description,price,img,category});
        await newBuild.save();
        res.json(newBuild);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create build' });
    }
});

// Route to get cart items for a specific user
app.get('/cart', async (req, res) => {
    const { userId } = req.query; // assume userId is passed as a query param
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user.cartItems || {});
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart items' });
    }
});

// Route to update cart items for a specific user
app.put('/cart', async (req, res) => {
    const { userId, cartItems } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
        if (user) {
            res.json(user.cartItems);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating cart items' });
    }
});

app.post('/api/builds', async (req,res) => {
    try{
        const {components} = req.body;
        const newBuild=new PcBuild({components});
        await newBuild.save();
        res.json(newBuild);
    } catch(error) {
        res.status(400).json({error: 'Error saving the build'});
    }
})

app.get('/test3', async (req,res) => {
    const builds=await PcBuild.find();
    res.json(builds);
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

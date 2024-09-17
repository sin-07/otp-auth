const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (connect) {
            console.log('Connected to MongoDB');
        }else{
            console.log('Failed to connect to MongoDB catcherror');
        }
        
    } catch (error) {
        console.error({error});
    }
}

module.exports = connectDB;
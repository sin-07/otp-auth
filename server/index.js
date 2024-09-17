const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = 5000;
const connectDB = require('./connection');
const routes = require('./routes');


connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api',routes)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
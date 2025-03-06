const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route');
const app = express()

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;
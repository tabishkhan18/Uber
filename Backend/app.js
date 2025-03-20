const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route');
const mapsRoutes = require('./routes/maps.route');
const rideRoutes = require('./routes/ride.route');

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
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports = app;
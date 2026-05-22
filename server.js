const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookingRoutes = require('./bookingRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5501",
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Jagreeti Salon Backend Running')
});


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected successfully!"))
.catch((err) => console.error("Database connection error:", err));


const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`server is  runnning on port ${PORT}`);
});

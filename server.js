const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const bookingRoutes = require('./bookingRoutes');

dotenv.config()

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Jagreeti Salon Backend Running')
})



const PORT = process.env.PORT ||5000;
app.listen(PORT, () => {
    console.log(`server is  runnning on port ${PORT}`);
});
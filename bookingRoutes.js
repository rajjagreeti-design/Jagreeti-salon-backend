const express = require('express');
const router = express.Router();

const Booking = require('./booking');
router.get('/', (req, res) => {
    res.send('Main booking list');
});

const nodemailer = require('nodemailer');
router.post('/book', async (req, res) => {
  try {
    const { fullname, phone, date, location, service, totalPrice } = req.body;
    const newBooking = new Booking({
      fullname,
      phone,
      date,
      location,
      service,
      totalPrice,
    });
    const savedData = await newBooking.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SALON_EMAIL,
      subject: 'New Salon Appointment Booking',
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>New Appointment Booking</h2>

          <p><strong>Customer Name:</strong> ${fullname}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Preferred Date:</strong> ${date}</p>
          <p><strong>Location Type:</strong> ${location}</p>
          <p><strong>Selected Service:</strong> ${service}</p>
          <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        </div>
      `,
    }

    await transporter.sendMail({
      from: '...',
      to: booking.email,
      subject: 'Appointment Confirmed',
      exit: '...'
    });
    

    res.status(200).json({
      success: true,
      message: 'Appointment booked successfully!'
    });
  } catch (error) {
    console.error("Database error details:" , error);

    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message
    });
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
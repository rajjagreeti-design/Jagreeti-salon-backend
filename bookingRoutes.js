const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('./booking');

router.get('/', (req, res) => {
    res.send('Main booking list');
});

const nodemailer = require('nodemailer');
// 📁 bookingRoutes.js (Starting at line 11)

// This correctly maps the POST request to your booking logic
router.post('/', async (req, res) => {
    try {
        // 1. Get the data sent by the form
        // const { fullName, phoneNumber, preferredDate, serviceTypeLocation, primaryService } = req.body;

        // 2. Create and save the new booking into MongoDB
        const newBooking = new Booking({
            fullName,
            phoneNumber,
            preferredDate,
            serviceTypeLocation,
            primaryService
        });
        const savedData = await newBooking.save();

        // 3. Configure the email transport using your environment variables
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        // 4. Set up the email contents
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.SALON_EMAIL, // Sends to your business email
            subject: 'New Salon Appointment Booking',
            html: `
                <div style="font-family: Arial; padding: 20px;">
                    <h2>New Appointment Booking</h2>
                    <p><strong>Customer Name:</strong> ${fullName}</p>
                    <p><strong>Phone:</strong> ${phoneNumber}</p>
                    <p><strong>Preferred Date:</strong> ${preferredDate}</p>
                    <p><strong>Location Type:</strong> ${serviceTypeLocation}</p>
                    <p><strong>Selected Service:</strong> ${primaryService}</p>
                </div>
            `
        };

        // 5. Send the email notification
        await transporter.sendMail(mailOptions);

        // 6. Respond back to the frontend browser with success
        res.status(200).json({
            success: true,
            message: 'Appointment booked successfully!'
        });

    } catch (error) {
        console.error("Database or Mail error details:", error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message
        });
    }
});

// Keep this at the bottom of the file
module.exports = router;
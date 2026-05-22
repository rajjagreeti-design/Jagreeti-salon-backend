const express = require('express');
const router = express.Router();

router.get('/details' , (req, res) => {
    res.send('Booking details route');
});

module.exports = router;
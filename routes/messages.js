const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/send_message', async (req, res) => {
    const { sender_user_id, receiver_user_id, message } = req.body;

    const fieldLabels = {
        sender_user_id: 'Sender User ID',
        receiver_user_id: 'Receiver User ID',
        message: 'Message'
    };

    const requiredFields = { sender_user_id, receiver_user_id, message };
    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => fieldLabels[key]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error_code: 100,
            error_title: 'Missing Fields',
            error_message: `The following fields are required: ${missingFields.join(', ')}.`
        });
    }

    try {
        const epoch = Math.floor(Date.now() / 1000);

        await pool.query('INSERT INTO messages (sender_user_id, receiver_user_id, message, epoch) VALUES (?, ?, ?, ?)', [sender_user_id, receiver_user_id, message, epoch]);

        res.status(200).json({
            success_code: 200,
            success_title: 'Message Sent',
            success_message: 'Message was sent successfully!'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error_code: 500,
            error_title: 'Server Error',
            error_message: 'Something went wrong during registration.'
        });
    }
});

module.exports = router;
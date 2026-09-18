const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/list_all_users', async (req, res) => {
    const { requester_user_id } = req.query;

    if (!requester_user_id) {
        return res.status(400).json({
            error_code: 100,
            error_title: 'Missing Fields',
            error_message: 'The following fields are required: User ID.'
        });
    }

    try {
        const [rows] = await pool.query('SELECT user_id, email, first_name, last_name FROM users WHERE (user_id != ?)', [requester_user_id]);

        res.status(200).json({
            message: rows
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
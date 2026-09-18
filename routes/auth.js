const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    const fieldLabels = {
        email: 'Email',
        password: 'Password',
        first_name: 'First Name',
        last_name: 'Last Name'
    };

    const requiredFields = { email, password, first_name, last_name };
    const missingFields = Object.entries(requiredFields).filter(([key, value]) => !value).map(([key]) => fieldLabels[key]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error_code: 101,
            error_title: 'Missing Fields',
            error_message: `The following fields are required: ${missingFields.join(', ')}.`
        });
    }

    try {
        const [existing] = await pool .query('SELECT user_id FROM users WHERE email = ?', [email]);
        
        if (existing.length > 0) {
            return res.status(409).json({
                error_code: 102,
                error_title: 'Email Already Registered',
                error_message: 'An account with this email is already registered.'
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const [result] = await pool.query('INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)', [email, password_hash, first_name, last_name]);

        res.status(201).json({
            user_id: result.insertId,
            email,
            first_name,
            last_name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error_code: 103,
            error_title: 'Server Error',
            error_message: 'Something went wrong during registration.'
        });
    }
});

module.exports = router;
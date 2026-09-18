require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());

app.use('/', authRoutes);
app.use('/', messageRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
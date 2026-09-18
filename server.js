require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json());

app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
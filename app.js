require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        console.log('✅ Connected to MongoDB locally');
        app.listen(5555, () => console.log('🚀 Server running on port 5555'));
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));

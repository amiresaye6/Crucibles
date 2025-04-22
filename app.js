const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(5555, () => {
    console.log('Server is running on port 5555');
}
);

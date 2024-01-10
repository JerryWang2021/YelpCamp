const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // load environment variable from .env file
const PORT = process.env.PORT || 3000;
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//Middewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log('listening on port 3000');
});
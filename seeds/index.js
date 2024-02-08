const mongoose = require('mongoose');
require('dotenv').config(); // load environment variable 
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const imageUrl = 'https://source.unsplash.com/collection/483251';
        const camp = new Campground({
            author: '65c407046a049eee98bb8422',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: imageUrl,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            price: price

        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");


mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(() => console.log("Mongo: Connection opened"))
    .catch(err => console.log(err));



const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        let randomCity = sample(cities);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)} `,
            location: `${randomCity.city}, ${randomCity.state} `
        });
        await camp.save();
    }
};

seedDB()
    .then(() => mongoose.connection.close());


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
        const price = Math.floor(Math.random() * 25) + 10;

        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)} `,
            location: `${randomCity.city}, ${randomCity.state} `,
            image: "http://source.unsplash.com/collection/484351",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo modi laborum iusto provident commodi cum obcaecati fugiat similique reiciendis facere quis ratione quidem saepe, nobis odit molestias autem quod libero?",
            price
        });
        await camp.save();
    }
};

seedDB()
    .then(() => mongoose.connection.close());


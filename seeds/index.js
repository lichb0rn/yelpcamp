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
            author: "628e5d63626ad64d365dec22",
            title: `${sample(descriptors)} ${sample(places)} `,
            location: `${randomCity.city}, ${randomCity.state} `,
            images: [
                {
                    url: "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653933304/YelpCamp/nisntgwriyp78irm68jj.jpg",
                    filename: "YelpCamp/nisntgwriyp78irm68jj",
                },
                {
                    url: "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653933305/YelpCamp/mfizfprue9tgddabp3vv.jpg",
                    filename: "YelpCamp/mfizfprue9tgddabp3vv",
                },
                {
                    url: "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653975866/YelpCamp/csqfnhm9nmbqgy3jlmez.jpg",
                    filename: "YelpCamp/csqfnhm9nmbqgy3jlmez",
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo modi laborum iusto provident commodi cum obcaecati fugiat similique reiciendis facere quis ratione quidem saepe, nobis odit molestias autem quod libero?",
            price
        });
        await camp.save();
    }
};

seedDB()
    .then(() => mongoose.connection.close());



/*
[ { 
    "url" : "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653933304/YelpCamp/nisntgwriyp78irm68jj.jpg", 
    "filename" : "YelpCamp/nisntgwriyp78irm68jj", 
    "_id" : ObjectId("629504faf8ce2c424c720cdc") 
}, 
{ 
    "url" : "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653933305/YelpCamp/mfizfprue9tgddabp3vv.jpg", 
    "filename" : "YelpCamp/mfizfprue9tgddabp3vv", 
    "_id" : ObjectId("629504faf8ce2c424c720cdd") 
},
{ 
    "url" : "https://res.cloudinary.com/dwvlzajv4/image/upload/v1653975866/YelpCamp/csqfnhm9nmbqgy3jlmez.jpg", 
    "filename" : "YelpCamp/csqfnhm9nmbqgy3jlmez", 
    "_id" : ObjectId("6295ab3a17c5099b43065bea") 
} 
]
*/
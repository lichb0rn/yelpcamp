const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(() => console.log("Mongo: Connection opened"))
    .catch(err => console.log(err));

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.listen(3000, () => console.log("Started on port 3000..."));
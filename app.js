if (process.env.NODEE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const mongoose = require("mongoose");
const campgroundsRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/yelp-camp")
    .then(() => console.log("Mongo: Connection opened"))
    .catch(err => console.log(err));

const engine = require("ejs-mate");
const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// Session
const sessionConfig = {
    secret: "password",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

//Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // Save the url a user is came from in session
    // So we in the after /login we can redirect to that url
    if (!["/login", "/register", "/"].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    req.session.save((err) => {
        if (err) next(err);
        next();
    });
});


// Router
app.get("/", (req, res) => {
    res.render("home");
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong...";
    res.status(statusCode).render("error", { err });
});

app.listen(3000, () => console.log("Started on port 3000..."));
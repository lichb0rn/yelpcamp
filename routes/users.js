const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", (req, res) => {
    res.render("auth/register")
});


router.post("/register", catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registered = await User.register(user, password);
        req.login(registered, err => {
            if (err) next(err);
            req.flash("success", "Welcome to Yelp Camp");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
}));

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login",
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }),
    (req, res) => {
        console.log("Session in login")
        console.log(req.session)
        let redirectUrl = req.session.returnTo || "/campgrounds";
        delete req.session.returnTo;
        req.flash("success", "Welcome back");
        res.redirect(redirectUrl);
    });

router.get("/logout", (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if (err) next(err);
            req.flash("success", "Goodbye!");
            res.redirect("/campgrounds");
        });
    } else {
        req.flash("error", "You need login first");
        res.redirect("/login");
    }
});

module.exports = router;
const User = require("../models/user");


module.exports.renderRegister = (req, res) => {
    res.render("auth/register")
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLogin = (req, res) => {
    res.render("auth/login");
};

module.exports.login = (req, res) => {
    let redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    req.flash("success", "Welcome back");
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
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
};
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in");
        // Save the url a user is came from in session
        // So we in the after /login we can redirect to that url
        if (!["/login", "/register", "/"].includes(req.originalUrl)) {
            req.session.returnTo = req.originalUrl;
        }
        console.log("Session in middleware")
        console.log(req.session)
        return res.redirect("/login");
    }
    next();
};

module.exports = isLoggedIn;
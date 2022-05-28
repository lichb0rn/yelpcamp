const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");

const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

//Routes 
router.route("/register")
    .get(controller.renderRegister)
    .post(catchAsync(controller.register));

router.route("/login")
    .get(controller.renderLogin)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login"
        }),
        controller.login
    );

router.get(
    "/logout",
    controller.logout
);

module.exports = router;
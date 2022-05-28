const express = require("express");
const router = express.Router({ mergeParams: true });

const controller = require("../controllers/reviews");

const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const { reviewSchema } = require("../schemas");
const Review = require("../models/review");
const Campground = require("../models/campground");
const flash = require("connect-flash/lib/flash");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");


router.post(
    "/",
    isLoggedIn,
    validateReview,
    catchAsync(controller.createReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    catchAsync(controller.deleteReview)
);

module.exports = router;
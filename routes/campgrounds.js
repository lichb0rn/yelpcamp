const express = require("express");
const router = express.Router();

// Controller
const controller = require("../controllers/campgrounds");

// Model
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Routes
router.route("/")
    .get(catchAsync(controller.index))
    .post(
        isLoggedIn,
        upload.array("image"),
        validateCampground,
        catchAsync(controller.createCampground)
    );

router.get(
    "/new",
    isLoggedIn,
    controller.renderNewForm
);

router.route("/:id")
    .get(catchAsync(controller.showCampground))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(controller.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(controller.deleteCampground));

router.get(
    "/:id/edit",
    isLoggedIn,
    isAuthor,
    catchAsync(controller.renderEditForm)
);

module.exports = router;
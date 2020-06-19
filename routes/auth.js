var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require('express-validator');

router.post(
    "/signup", 
    [
    check("name", "name should be 3 characters").isLength({ min: 3 }),   
    check("email", "Email is required").isEmail(),
    check("password", "password must be atleast 3 characters").isLength({ min: 3 })
    ],
    signup
);

router.post(
    "/signin", 
    [   
    check("email", "Email is required").isEmail(),
    check("password", "password is required").isLength({ min: 3 })
    ],
    signin
);

router.get("/signout", signout);

module.exports = router;

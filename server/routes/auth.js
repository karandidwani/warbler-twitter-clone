const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const {signup, signin} = require('../handlers/auth');


router.post("/signup",  signup);
router.post("/signin",  signin);

module.exports = router;
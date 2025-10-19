const express = require('express');
const {HandleGenrateNewShorterURL} = require('../CONTROLLERS/url');
const router = express.Router();

router.post ("/",HandleGenrateNewShorterURL);

module.exports = router;
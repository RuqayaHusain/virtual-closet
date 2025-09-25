const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ClothingItem = require('../models/clotingItem.js');

module.exports = router
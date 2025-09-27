const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ClosetItem = require('../models/closetItem.js');

module.exports = router
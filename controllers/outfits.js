const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ClosetItem = require('../models/closetItem.js');
const Outfit = require('../models/outfit.js');

router.get('/', async (req, res) => {
    try {
        const AllOutfits = await Outfit.find({ owner: req.session.user._id });
        res.render('outfits/index.ejs', {
            AllOutfits,
            numberOfOutfits: AllOutfits.length,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router
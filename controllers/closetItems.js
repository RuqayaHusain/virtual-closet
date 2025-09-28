const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ClosetItem = require('../models/closetItem.js');

// display all of the clothing Items owned by the logged-in user
router.get('/', async (req, res) => {
    try {
        
        const AllClosetItems = await ClosetItem.find({ owner: req.session.user._id });
        res.render('closetItems/index.ejs', {
            AllClosetItems,
            numberOfItems: AllClosetItems.length,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('closetItems/new.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        await ClosetItem.create(req.body);
        res.redirect('/closetItems');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const selectedItem = await ClosetItem.findById(itemId).populate('owner');
        res.render('closetItems/show.ejs', {
            selectedItem,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const selectedItem = await ClosetItem.findById(itemId).populate('owner');
        res.render('closetItems/edit.ejs', {
            selectedItem,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const selectedItem = await ClosetItem.findById(itemId).populate('owner');

        if (selectedItem.owner._id.equals(req.session.user._id)) {
            await selectedItem.updateOne(req.body);
            res.redirect(`/closetItems/${itemId}`);
        } else {
            console.log('permission denied!');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const selectedItem = await ClosetItem.findById(itemId).populate('owner');

        if (selectedItem.owner._id.equals(req.session.user._id)) {
            await selectedItem.deleteOne();
            res.redirect('/closetItems');
        } else {
            console.log('Permission denied');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();

const ClosetItem = require('../models/closetItem.js');
const upload = require('../config/multer.js');
const cloudinary = require('../config/cloudinary.js');

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

router.post('/', upload.single('imageURL'), async (req, res) => {
    try {
        req.body.owner = req.session.user._id;
        if (req.file) {
            req.body.imageURL = {
                url: req.file.path,
                cloudinary_id: req.file.filename,
            };
        }
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

router.put('/:itemId', upload.single('imageURL'), async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const selectedItem = await ClosetItem.findById(itemId).populate('owner');

        if (selectedItem.owner._id.equals(req.session.user._id)) {
            selectedItem.name = req.body.name;
            selectedItem.description = req.body.description;
            selectedItem.category = req.body.category;
            selectedItem.color = req.body.color;

            if (req.file) {
                if (selectedItem.imageURL?.cloudinary_id) {
                    await cloudinary.uploader.destroy(selectedItem.imageURL.cloudinary_id);
                }
                selectedItem.imageURL = {
                    url: req.file.path,
                    cloudinary_id: req.file.filename,
                };
            }

            await selectedItem.save();
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
            if (selectedItem.imageURL?.cloudinary_id) {
                await cloudinary.uploader.destroy(selectedItem.imageURL.cloudinary_id)
            }
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
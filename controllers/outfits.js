const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ClosetItem = require('../models/closetItem.js');
const Outfit = require('../models/outfit.js');

router.get('/', async (req, res) => {
    try {
        const allOutfits = await Outfit.find({ owner: req.session.user._id });
        res.render('outfits/index.ejs', {
            allOutfits,
            numberOfOutfits: allOutfits.length,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        const allClosetItems = await ClosetItem.find({ owner: req.session.user._id });

        res.render('outfits/new.ejs', {
            allClosetItems,
            selectedItems: [], // placeholder for all of the selected items
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try {

       if (!req.body.closetItems) {
        return res.redirect('/outfits/new'); // returns user to the new.ejs page, and doesn't allow them to create a record
        }

        await Outfit.create({
            name: req.body.name,
            owner: req.session.user._id,
            closetItems: Array.isArray(req.body.closetItems) ? req.body.closetItems : [req.body.closetItems], // makes sure that the selected items are stored in an array
        });

        res.redirect('/outfits');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:outfitId', async (req, res) => {
    try {
        const outfitId = req.params.outfitId;
        const selectedOutfit = await Outfit.findById(outfitId).populate('owner').populate('closetItems');

        res.render('outfits/show.ejs', {
            selectedOutfit,
            listOfSelectedItems: selectedOutfit.closetItems,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:outfitId/edit', async (req, res) => {
    try {
        const outfitId = req.params.outfitId;
        const selectedOutfit = await Outfit.findById(outfitId).populate('owner').populate('closetItems');
        const allClosetItems = await ClosetItem.find({ owner: req.session.user._id });

        res.render('outfits/edit.ejs', {
            selectedOutfit,
            allClosetItems,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:outfitId', async (req, res) => {
    try {
        const outfitId = req.params.outfitId;
        const selectedOutfit = await Outfit.findById(outfitId);

        if (selectedOutfit.owner.equals(req.session.user._id)) {

            if (!req.body.closetItems) {
                // doesn't allow user to update the record unless one clothing item is selected
                return res.redirect(`/outfits/${outfitId}/edit`);
            }

            const editedClosetItems = req.body.closetItems;
            const selectedItems = Array.isArray(editedClosetItems) ? editedClosetItems : [editedClosetItems];

            req.body.closetItems = selectedItems;
            await selectedOutfit.updateOne(req.body);

            res.redirect(`/outfits/${outfitId}`);
            } else {
                console.log('Permission denied!');
            }
        

        await Outfit.fin
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})
module.exports = router
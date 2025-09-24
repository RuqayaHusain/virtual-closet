const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    clothingItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClothingItem',
        },
    ],
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
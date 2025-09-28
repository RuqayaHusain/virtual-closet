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
    closetItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ClosetItem',
        },
    ],
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
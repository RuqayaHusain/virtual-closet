const mongoose = require('mongoose');

const closetItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Bags', 'Activewear', 'Formalwear', 'Other'],
        required: true,
    },
    color: {
        type: String,
        enum: ['Black', 'White', 'Gray', 'Beige', 'Brown', 'Navy', 'Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Multicolor'],
        required: true,
    },
    imageURL: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const ClosetItem = mongoose.model('ClosetItem', closetItemSchema);

module.exports = ClosetItem;
const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
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

const ClotingItem = mongoose.model('ClothingItem', clothingItemSchema);

module.exports = ClotingItem;
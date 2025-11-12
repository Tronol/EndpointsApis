const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);

